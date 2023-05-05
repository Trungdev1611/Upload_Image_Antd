import { Modal, Upload } from 'antd';
import Cookies from 'js-cookie';
import React from 'react'
import { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const UploadAntd = ({ onRemoveFile, acceptType, getDataFromUpload, limitUpload = 2, listType,defaultFileList, name="file", disabled=false}) => {
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const handlePreview = async file => {
        console.log('filePreview', file);
        setPreviewImage(file.response?.data || file.thumbUrl);
        setPreviewOpen(true);
        // setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
      };
      const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );
      function handleChangeUpload(value) {
        console.log('valueUhandleChangeUploadpload', value);
        setFileList(value.fileList);
        getDataFromUpload(value)
      }
      function handleClose() {
        setPreviewOpen(false);
        setPreviewImage('');
      }
  return (
    <div className="upload_image">
    <Upload
      name={name}
      listType={listType}
      // className="avatar-uploader"
      // showUploadList={false}
      action="https://api.ezsale.vn/media/uploadAll"
      headers={{
        token: Cookies.get('SESSION_ID'),
      }}
      // beforeUpload={beforeUpload}
      onChange={handleChangeUpload}
      disabled={disabled}
      accept={acceptType}
      onPreview={handlePreview}
      onRemove={onRemoveFile}
      fileList={fileList}
      defaultFileList={defaultFileList}
    >
      {fileList.length >= limitUpload ? null : uploadButton}
    </Upload>
    <Modal
      visible={previewOpen}
      title={null}
      footer={null}
      onCancel={handleClose}
    >
      <img
        alt="previewInModal"
        style={{ width: '100%' }}
        src={previewImage}
      />
    </Modal>
    </div>
  )
}

export default UploadAntd
