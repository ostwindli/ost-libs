const fs = require("fs");
const COS = require("cos-nodejs-sdk-v5");
const fileUtils = require("@licq/file");
const _ = require("lodash");
const path = require("path");

/**
 * 腾讯云对象存储cos上传
 * @name Cos
 * @param {Object} Config 对象存储参数 参考：<https://cloud.tencent.com/document/product/436/8629#.E9.85.8D.E7.BD.AE.E9.A1.B9>
 * @param {String} Config.SecretId 必填
 * @param {String} Config.SecretKey 必填
 *
 * @param {Object} Config.CosObjectConfig 参见 <https://cloud.tencent.com/document/product/436/64980#.E7.AE.80.E5.8D.95.E4.B8.8A.E4.BC.A0.E5.AF.B9.E8.B1.A1> 中的参数说明
 * @param {String} Config.CosObjectConfig.Bucket 必填
 * @param {String} Config.CosObjectConfig.Region 必填
 * @param {String} Config.CosObjectConfig.ACL 可选 默认：'public-read'
 *
 * @param {Object} Config.ExtConfig 可选 本工具自定义参数
 * @param {String} Config.ExtConfig.Domain 可选 上传后的域名 默认：https://{Bucket}.cos.{Region}.myqcloud.com
 * @since v2.0.0
 * @returns instanceof COS
 * @example
 * const Cos = require('@licq/cos');
 * const cos = new Cos({
 *    SecretId: "SECRET_ID",
 *    SecretKey: "SECRET_KEY",
 *    CosObjectConfig: {
 *       Bucket: "test-12345678",
 *       Region: "ap-guangzhou",
 *       ACL: 'default'
 *    },
 *    ExtConfig: {
 *       Domain: 'https://demos.gtimg.cn/',
 *    }
 * });
 * 
 * await cos.uploadFiles(__dirname, 'ost/cos/demo');
 * 
 */
class Cos {
  constructor(params) {
    this.checkParams(params);

    _.merge(this.defaultParams, params);
    //  console.log(`this.defaultParams: ${JSON.stringify(this.defaultParams)}`);
    this.cos = new COS(this.defaultParams);
  }

  // cos官方配置项：https://cloud.tencent.com/document/product/436/8629#.E9.85.8D.E7.BD.AE.E9.A1.B9
  defaultParams = {
    SecretId: "", //must
    SecretKey: "", //must
    // 控制文件上传并发数
    FileParallelLimit: 60,
    // 控制单个文件下分片上传并发数，在同园区上传可以设置较大的并发数
    ChunkParallelLimit: 60,
    // 控制分片大小，单位 B，在同园区上传可以设置较大的分片大小
    ChunkSize: 1024 * 1024 * 5,

    CosObjectConfig: {
      Bucket: "", //must
      Region: "", //must
      ACL: "public-read",
    },
    // 本工具自定义参数
    ExtConfig: {
      Domain: "", // 对外的url前缀 默认：`https://${Bucket}.cos.${Region}.myqcloud.com/`
    },
  };

  //获取对外的url前缀
  //默认：https://{Bucket}.cos.{Region}.myqcloud.com
  getHost = (cosPath) => {
    let {
      ExtConfig: { Domain },
      CosObjectConfig: { Bucket, Region },
    } = this.defaultParams;
    return (
      (Domain || `https://${Bucket}.cos.${Region}.myqcloud.com/`) + cosPath
    ).replace(/(?<!:)(\/+)/g, "/"); // 替换https://xxx.xxx//xx///xx.js -> https://xxx.xxx/xx/xx.js
  };

  checkParams(params) {
    try {
      if (!params) throw `need params!`;
      if (!params.SecretId) throw `need params SecretId!`;
      if (!params.SecretKey) throw `need params SecretKey!`;
      if (!params.CosObjectConfig.Bucket)
        throw `need params CosObjectConfig.Bucket!`;
      if (!params.CosObjectConfig.Region)
        throw `need params CosObjectConfig.Region!`;
    } catch (error) {
      console.log(`\n-----> ${error}\n`);
      //process.exit(-1)
    }
  }

  // 组装cos对象数组
  async assemblyFiles(localPath, cosPath) {
    if (!fs.existsSync(localPath)) {
      throw new Error(`文件或目录不存在：${localPath}`);
    }

    if (fs.statSync(localPath).isFile()) {
      // 支持单个文件上传
      const Key = (cosPath + '/' + path.basename(localPath)).replace(/\/+/g, '/');

      let files = this.assemblyFile(Key, localPath);
      return [files];
    } else {
      let files = await fileUtils.listFiles(localPath);

      // 组装files的cos数组
      files = files
        .filter((file) => !file.isDir)
        .map((file) => {
          const Key = (cosPath + '/' + path.relative(localPath, file.path)).replace(/\/+/g, "/");
          return this.assemblyFile(Key, file.path);
        });
      return files;
    }
  }

  assemblyFile(Key, FilePath) {
    return {
      ...this.defaultParams.CosObjectConfig,
      Key,
      FilePath,
    };
  }

  /**
   * 批量上传
   * @param {String} localPath 本地文件/目录的绝对路径
   * @param {String} cosPath cos的path
   * @returns Promise
   */
  async uploadFiles(localPath, cosPath) {
    if (!localPath || !cosPath) {
      throw new Error(`缺少参数 localPath 或 cosPath`);
    }
    const getHost = this.getHost;

    const startTime = Date.now();

    const files = await this.assemblyFiles(localPath, cosPath);

    return new Promise((resolve, reject) => {
      this.cos.uploadFiles(
        {
          files,
          SliceSize: 1024 * 1024,
          onProgress: function (info) {},
          onFileFinish: function (err, data, options) {
            const file = getHost(options.Key);
            if (err) {
              console.log(`${file} 上传失败`);
              console.log(`error msg： ${err.message}\n`);
            } else {
              console.log(`${file} 上传成功`);
            }
          },
        },
        //data.files {options, error, data}
        function (err, data) {
          if (err) {
            console.log("\n-----上传失败------\n");
            console.log(err);
            reject();
          } else {
            console.log("\n-----上传结束------\n");
            const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
            let errNum = 0;
            for (let file of data.files) {
              if (file.error) errNum += 1;
            }
            console.log(`\n本次上传共${data.files.length}个文件\n`);
            console.log(`成功：${data.files.length - errNum}`);
            console.log(`失败：${errNum}`);
            console.log(`用时：${totalTime} s`);
            console.log("\n-------------------\n");
            resolve();
          }
        }
      );
    });

    // return new Promise((resolve, reject) => {

    // });
  }

  /**
   * 通过文件数据上传
   * @param {String} cosPath cos路径
   * @param {Buffer | String | Stream} fileData 文件数据
   * @since v2.1.3
   * @returns Promise<>
   */
  async uploadFileByData(cosPath, fileData) {
    return new Promise((resolve, reject) => {
      this.cos.putObject(
        {
          ...this.defaultParams.CosObjectConfig,
          Key: cosPath,
          Body: fileData,
        },
        (err, data) => {
          if (err) {
            console.error("\n@licq上传文件失败：", err);
            reject(err);
          } else {
            console.error("\n@licq上传文件成功：", data.Location);
            resolve(data);
          }
        }
      );
    });
  }
}

module.exports = Cos;
