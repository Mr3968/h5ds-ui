import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import './upload-images.less';
import { util } from 'h5ds-ui/dist/utils';
import { MBToast } from 'h5ds-mbui';
import Upload from 'rc-upload';

function UploadImage(
  {
    contents = [],
    headers,
    action,
    type,
    multiple,
    accept,
    directory,
    flag = 9,
    onError,
    onSuccess,
    beforeUpload,
    data,
    customRequest,
  },
  ref
) {
  // 文件类型 accept
  //  contents 初始想渲染的图片
  //  headers  请求头的设置
  //  action  上传地址
  //  type 上传的方式  默认为post
  //  multiple  是否支持多文件上传
  //  directory 是否支持上传文件夹
  //  flag 限制上传图片的个数
  //  onError 上传错误的回调
  //  onSuccess 上传成功的回调
  //  beforeUpload 上传前的回调参数为上传的文件，若返回 false 则停止上传。
  //  支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，resolve 时开始上传
  //  （ resolve 传入 File 或 Blob 对象则上传 resolve 传入对象）。注意：IE9 不支持该方法
  //  data 上传时需要携带的参数
  //  customRequest 覆盖默认的上传行为 可以自定义自己的上传实现

  const [files, setFiles] = useState([]);
  useImperativeHandle(ref, () => ({
    files: files,
  }));
  useEffect(() => {
    contents.forEach((item) => {
      let obj = {
        id: util.randomID(),
        url: item,
      };
      files.push(obj);
    });
    setFiles([...files]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSuccess = (res, file) => {
    if (onSuccess) {
      onSuccess(res, file);
    }
    let obj = {
      id: util.randomID(),
      url: res.data.url,
    };
    files.push(obj);
    setFiles([...files]);
  };
  // 上传错误
  const handleError = (err, res, file) => {
    if (onError) {
      onError(err, res, file);
    } else {
      const hide = MBToast.error(err);
      setTimeout(() => {
        hide();
      }, 2000);
    }
  };
  // 删除图片
  const removeImg = (i) => {
    files.splice(i, 1);
    setFiles([...files]);
  };
  const list = files.map((item, index) => {
    return (
      <div className="upload-img-box-item" style={{ backgroundImage: `url(${item.url})` }} key={item.id}>
        <div>
          <img
            onClick={() => {
              removeImg(index, item.id);
            }}
            src="https://cdn.h5ds.com/uploads/s/20200819/c8a5ba99652cded4309ca4c3d39a1507c9bd54cf.png"
            alt=""
          />
        </div>
      </div>
    );
  });
  return (
    <div className="upload-container">
      <div className="upload-img-box">
        {list}
        {files.length < flag && (
          <div className="upload-box">
            <Upload
              customRequest={customRequest}
              beforeUpload={beforeUpload}
              data={data}
              className="upload-file"
              accept={accept}
              directory={directory}
              multiple={multiple}
              onSuccess={handleSuccess}
              onError={handleError}
              headers={headers}
              action={action}
              method={type}
            />
            <button className="upload-button">
              <img src="https://cdn.h5ds.com/uploads/s/20200828/d38e4363ee6d69a0e960050b3b38da451befbabb.svg" />
              <p>上传图片</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default forwardRef(UploadImage);
