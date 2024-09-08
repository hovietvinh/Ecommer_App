import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload,Image } from 'antd';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      return false;  // Không cho phép upload nếu không phải JPG/PNG
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
      return false;  // Không cho phép nếu ảnh quá 2MB
    }
    return true;  // Chỉ khi mọi điều kiện đúng mới cho phép upload
  };
  

const UploadImg = ({ onImageSelect }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [file, setFile] = useState(null);  // Store the file locally

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);  // Hiện trạng thái loading
      return;
    }
    if (info.file.status === 'done' || info.file.originFileObj) {
      // Thay đổi để đảm bảo file được xử lý chính xác
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);  // Hiển thị URL của ảnh
        setFile(info.file.originFileObj);  // Lưu trữ file vào state
        onImageSelect(info.file.originFileObj);  // Gửi ảnh lên component cha
      });
    } else {
      setLoading(false);  // Ngừng quay nếu không xử lý được ảnh
    }
  };
  

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img
            src={imageUrl}
            alt="avatar"
            style={{ width: '100%', height:"100%" }}
        />
        
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default UploadImg;
