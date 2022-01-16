const COS = require("cos-nodejs-sdk-v5");
const file = require("@licq/file");
const path = require("path");

/**
 * 腾讯云对象存储cos上传
 * @name Cos
 * @param {Object} Config 对象存储参数 参考：<https://cloud.tencent.com/document/product/436/8629#.E9.85.8D.E7.BD.AE.E9.A1.B9>
 * @param {String} Config.SecretId 必填
 * @param {String} Config.SecretKey 必填
 * @param {String} Config.Bucket 必填
 * @param {String} Config.Region 必填
 * @param {String} Config.ACL 可选 默认：'public-read'
 * @param {String} Config._Domain 可选 上传后的域名 默认：https://{Bucket}.cos.{Region}.myqcloud.com
 * @since v1.0.0
 * @returns instanceof COS
 * @example
 * const Cos = require('@licq/cos');
 * const cos = new Cos(Config);
 * const res = await cos.uploadFiles(__dirname, 'ost/cos/demo');
 * // => https://test-web-1251388888.cos.ap-guangzhou.myqcloud.com/ost/cos/demo/demo1.jpeg
 * // => https://test-web-1251388888.cos.ap-guangzhou.myqcloud.com/ost/cos/demo/demo2.jpeg
 */
class Cos {
  constructor(config = this.defaultConfig) {
    const mustConfigItems = ["SecretId", "SecretKey", "Bucket", "Region"];
    if (mustConfigItems.some((k) => !config[k])) {
      throw new Error(`config need ${mustConfigItems}`);
    }
    Object.assign(this.defaultConfig, config);
    this.cos = new COS(this.defaultConfig);
  }

  defaultConfig = {
    // 控制文件上传并发数
    FileParallelLimit: 60,
    // 控制单个文件下分片上传并发数，在同园区上传可以设置较大的并发数
    ChunkParallelLimit: 60,
    // 控制分片大小，单位 B，在同园区上传可以设置较大的分片大小
    ChunkSize: 1024 * 1024 * 5,
    FollowRedirect: false,
    ACL: "public-read",
    SecretId: "", //must
    SecretKey: "", //must
    Bucket: "", //must
    Region: "", //must
    _Domain: "",// 自定义参数，和官方的Domain区分开
  };

  //获取对外的url前缀
  //形式：https://{Bucket}.cos.{Region}.myqcloud.com
  getHost = (cosPath) => {
    let { _Domain, Bucket, Region } = this.defaultConfig;
    if (!_Domain) {
      _Domain = `https://${Bucket}.cos.${Region}.myqcloud.com/`;
    }
    return _Domain + cosPath;
  };

  uploadFiles(localPath, cosPath) {
    if (!localPath || !cosPath) {
      throw new Error(`need localPath 、cosPath`);
    }

    const defaultConfig = this.defaultConfig;
    const getHost = this.getHost;

    return new Promise((resolve, reject) => {
      file.listFiles(localPath).then((list) => {
        const files = list
          .filter((file) => !file.isDir)
          .map(function (file) {
            const filename = path
              .relative(localPath, file.path)
              .replace(/\\/g, "/");

            return {
              Bucket: defaultConfig.Bucket,
              Region: defaultConfig.Region,
              Key: path.join(cosPath, filename),
              FilePath: file.path,
              ACL: defaultConfig.ACL,
            };
          });

        const filesCount = files.length;
        console.log(`\n本次上传共${filesCount}个文件\n`);

        this.cos.uploadFiles(
          {
            files,
            SliceSize: 1024 * 1024,
            onProgress: function (info) {
              // const percent = Math.floor(info.percent * 10000) / 100;
              // const speed = Math.floor((info.speed / 1024 / 1024) * 100) / 100;
              // console.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;')
            },
            onFileFinish: function (err, data, options) {
              console.log(
                getHost(options.Key) + " 上传" + (err ? "失败" : "成功")
              );
            },
          },
          function (err, data) {
            if (err) {
              console.log("\n-----上传失败------\n");
              console.log(err);
              reject();
            } else {
              console.log("\n-----上传成功------\n");
              resolve();
            }
          }
        );
      });
    });
  }
}

module.exports = Cos;
