import React, { useState } from "react";
import "./index.css";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Checkbox, Form, Input, Modal, Upload } from "antd";
const token = "abc";

const App = () => {
  const [loading, setLoading] = useState(false); //loading trong quá trình tải file
  const [fileList, setFileList] = useState([]); //list file ảnh dược tải lên
  const [previewOpen, setPreviewOpen] = useState(false); //show ảnh phóng to trong modal - state openModal
  const [previewImage, setPreviewImage] = useState(""); //link ảnh phóng to

  function handleChangeUpload(value) {
    //khi click double tải ảnh lên sẽ trả ra thông tin file được tải lên
    //ngay lúc này file cũng được upload lên server với payload là object có field là name của Upload Component
    //nếu upload thành công sẽ trả ra 1 đường link url, lúc đó ta sẽ tùy biến với link url đó

    console.log("valueUhandleChangeUploadpload", value);
    setFileList(value.fileList);
  }

  const handlePreview = async (file) => {
    //click xem ảnh phóng to, parameter file này chứa thông tin ảnh đã upload, ta lấy url set cho ảnh phóng to
    console.log("filePreview", file);
    setPreviewImage(file.response?.data || file.thumbUrl);

    //show Modal
    setPreviewOpen(true);
    // setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  function removeFile(file) {
    //khi click icon xóa ảnh vừa tải, fileList tự dộng update,
    //lúc này ta có thể muốn xóa linkUrl đã thu thập trước đó
  }
  const uploadButton = (
    //button upload
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  function handleClose() {
    //close Modal view ảnh phóng to
    setPreviewOpen(false);
    //set Url ảnh phóng to vuawfwf xem bằng ""
    setPreviewImage("");
  }
  function beforeUpload() {
    //function này có thể dùng để validate ảnh tải lên, size ảnh, kích cỡ.....
  }
  const defaultFileList = [
    {
      uid: "1",
      name: "xxx.png",
      status: "done",
      response: "Server Error 500",
      // custom error message to show
      url: "http://www.baidu.com/xxx.png"
    },
    {
      uid: "2",
      name: "yyy.png",
      status: "done",
      url: "http://www.baidu.com/yyy.png"
    },
    {
      uid: "3",
      name: "zzz.png",
      status: "error",
      response: "Server Error 500",
      // custom error message to show
      url: "http://www.baidu.com/zzz.png"
    }
  ];
  return (
    <>
      <Upload
        name="file" //trường upload file lên server
        listType="picture-card" //type upload ảnh
        // className="avatar-uploader"    //class styled
        // showUploadList={false}     //có show list upload hay không
        action="https://api.ezsale.vn/media/uploadAll" //url để upload ảnh
        headers={{
          //setheader khi upload ảnh
          token: token
        }}
        beforeUpload={beforeUpload} //validate before upload => return false, list_ignore không được upload
        onChange={handleChangeUpload} //onChange upload
        disabled={false} //disable upload ảnh hay không
        accept=".png, .jpg, .jpeg" //file chấp nhận được tải lên
        onPreview={handlePreview} //function thực thi khi muốn xem preview
        onRemove={removeFile}
        fileList={fileList} //có thể dùng để setDefault list upload, cấu trúc tương tự như defaultFileList bên trên
      >
        {/* giới hạn số lượng ảnh upload */}
        {fileList.length >= 2 ? null : uploadButton}
      </Upload>

      {/* show ảnh phóng to */}
      <Modal
        visible={previewOpen}
        title={null}
        footer={null}
        onCancel={handleClose}
      >
        <img
          alt="previewInModal"
          style={{ width: "100%" }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default App;
