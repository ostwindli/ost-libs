'use strict';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

const COS = require("cos-nodejs-sdk-v5");

const file = require("@licq/file");

const _ = require("lodash");

const path = require("path");
/**
 * 腾讯云对象存储cos上传
 * @name Cos
 * @param {Object} Config 对象存储参数 参考：<https://cloud.tencent.com/document/product/436/8629#.E9.85.8D.E7.BD.AE.E9.A1.B9>
 * @param {String} Config.SecretId 必填
 * @param {String} Config.SecretKey 必填
 * 
 * @param {Object} Config.CosObjectConfig 参见 https://cloud.tencent.com/document/product/436/64980#.E7.AE.80.E5.8D.95.E4.B8.8A.E4.BC.A0.E5.AF.B9.E8.B1.A1 中的参数说明
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
 * await cos.uploadFiles(__dirname, 'ost/cos/demo');
 */


class Cos {
  constructor(params) {
    _defineProperty(this, "defaultParams", {
      SecretId: "",
      //must
      SecretKey: "",
      //must
      // 控制文件上传并发数
      FileParallelLimit: 60,
      // 控制单个文件下分片上传并发数，在同园区上传可以设置较大的并发数
      ChunkParallelLimit: 60,
      // 控制分片大小，单位 B，在同园区上传可以设置较大的分片大小
      ChunkSize: 1024 * 1024 * 5,
      CosObjectConfig: {
        Bucket: "",
        //must
        Region: "",
        //must
        ACL: "public-read"
      },
      // 本工具自定义参数
      ExtConfig: {
        Domain: "" // 对外的url前缀 默认：`https://${Bucket}.cos.${Region}.myqcloud.com/`

      }
    });

    _defineProperty(this, "getHost", cosPath => {
      let {
        ExtConfig: {
          Domain
        },
        CosObjectConfig: {
          Bucket,
          Region
        }
      } = this.defaultParams;
      return (Domain || `https://${Bucket}.cos.${Region}.myqcloud.com/`) + cosPath;
    });

    this.checkParams(params);

    _.merge(this.defaultParams, params); //  console.log(`this.defaultParams: ${JSON.stringify(this.defaultParams)}`);


    this.cos = new COS(this.defaultParams);
  } // cos官方配置项：https://cloud.tencent.com/document/product/436/8629#.E9.85.8D.E7.BD.AE.E9.A1.B9


  checkParams(params) {
    try {
      if (!params) throw `need params!`;
      if (!params.SecretId) throw `need params SecretId!`;
      if (!params.SecretKey) throw `need params SecretKey!`;
      if (!params.CosObjectConfig.Bucket) throw `need params CosObjectConfig.Bucket!`;
      if (!params.CosObjectConfig.Region) throw `need params CosObjectConfig.Region!`;
    } catch (error) {
      console.log(`\n-----> ${error}\n`); //process.exit(-1)
    }
  }

  uploadFiles(localPath, cosPath) {
    if (!localPath || !cosPath) {
      throw new Error(`need localPath 、cosPath`);
    }

    const defaultParams = this.defaultParams;
    const getHost = this.getHost;
    return new Promise((resolve, reject) => {
      file.listFiles(localPath).then(list => {
        const files = list.filter(file => !file.isDir).map(function (file) {
          const filename = path.relative(localPath, file.path).replace(/\\/g, "/");

          const CosObjectConfig = _objectSpread2(_objectSpread2({}, defaultParams.CosObjectConfig), {}, {
            Key: path.join(cosPath, filename),
            FilePath: file.path
          });

          return CosObjectConfig;
        }); // const filesCount = files.length;
        // console.log(`\n本次上传共${filesCount}个文件\n`);

        this.cos.uploadFiles({
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
          }
        }, //data.files {options, error, data}
        function (err, data) {
          if (err) {
            console.log("\n-----上传失败------\n");
            console.log(err);
            reject();
          } else {
            console.log("\n-----上传结束------\n");
            let errNum = 0;

            for (let file of data.files) {
              if (file.error) errNum += 1;
            }

            console.log(`\n本次上传共${data.files.length}个文件\n`);
            console.log(`成功：${data.files.length - errNum}`);
            console.log(`失败：${errNum}`);
            console.log("\n-------------------\n");
            resolve();
          }
        });
      });
    });
  }

}

module.exports = Cos;
