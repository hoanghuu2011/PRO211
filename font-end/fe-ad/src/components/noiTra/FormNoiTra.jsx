// FormManufacturer.js

import React, { Component } from "react";
import { Form, Input, Modal } from "antd";
import { createRef } from "react";

import { toast } from "react-toastify";

class FormNoiTra extends Component {
  form = createRef();

  onSendData = (values) => {
    if (values.id === "") {
      this.props.onCreate(values);
    } else {
      this.props.onEdit(values);
    }
  };

  componentDidUpdate(prevProps) {
    // Kiểm tra xem prop manufacturer có thay đổi hay không
    if (this.props.noiTra !== prevProps.noiTra) {
      // Cập nhật form với các giá trị ban đầu mới
      this.form.current.setFieldsValue({
        id: this.props.noiTra.id,
        noiTra: this.props.noiTra.noiTra,
      });
    }
  }

  render() {
    const { open, onCancel } = this.props;
    const { noiTra } = this.props;
    console.log(noiTra);
    return (
      <Modal
        open={open}
        title={"Test date time"}
        okText={"Send"}
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          this.form.current
            .validateFields()
            .then((values) => {
              this.form.current.resetFields();
              this.onSendData(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
              toast.error("please don't leave it blank");
            });
        }}
      >
        <Form
          ref={this.form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
          key={noiTra.id}
        >
          <Form.Item name="id" label="id" initialValue={noiTra.id}>
            <Input readOnly />
          </Form.Item>
          <Form.Item name="noiTra" label="Nơi trả" initialValue={noiTra.noiTra}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default FormNoiTra;
