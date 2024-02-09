// UploadImageWall.js

import React, { Component } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

class UploadImageWall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewOpen: false,
      previewImage: "",
      previewTitle: "",
      fileList: props.fileList || [],
    };
  }

  handleCancel = () => this.setState({ previewOpen: false });

  handlePreview = async (file) => {
    if (!file.thumbUrl && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.thumbUrl || file.preview,
      previewOpen: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
    this.props.onChange(fileList); // Pass the fileList to the Form component
  };

  render() {
    const { previewOpen, previewImage, previewTitle, fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div
          style={{
            marginTop: 8,
          }}
        >
          Upload
        </div>
      </div>
    );
    return (
      <>
        <Upload
          maxCount={1}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          beforeUpload={() => false}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={previewImage}
          />
        </Modal>
      </>
    );
  }
}

export default UploadImageWall;
