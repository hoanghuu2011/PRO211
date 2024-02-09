// FormManufacturer.js

import React, { Component } from "react";
import { Form, Input, Modal } from "antd";
import { createRef } from "react";

import { toast } from "react-toastify";

class FormNhaXe extends Component {
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
    if (this.props.nhaXe !== prevProps.nhaXe) {
      // Cập nhật form với các giá trị ban đầu mới
      this.form.current.setFieldsValue({
        id: this.props.nhaXe.id,
        tenNhaXe: this.props.nhaXe.tenNhaXe,
        diaChiNhaXe: this.props.nhaXe.diaChiNhaXe,
        sdt: this.props.nhaXe.sdt,
      });
    }
  }

  render() {
    const { open, onCancel } = this.props;
    const { nhaXe } = this.props;
    console.log(nhaXe);
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
          key={nhaXe.id}
        >
          <Form.Item name="id" label="id" initialValue={nhaXe.id}>
            <Input readOnly />
          </Form.Item>
          <Form.Item
            name="tenNhaXe"
            label="Tên nhà xe"
            initialValue={nhaXe.tenNhaXe}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="diaChiNhaXe"
            label="Địa chỉ"
            initialValue={nhaXe.diaChiNhaXe}
          >
            <Input />
          </Form.Item>
          <Form.Item
          name="sdt"
          label="Số điện thoại"
          initialValue={nhaXe.sdt}
          rules={[
            {
              pattern: /^[0-9]{10,11}$/, 
              message: "Số điện thoại phải là số và có độ dài từ 10-11 ký tự!",
            },
          ]}
        >
          <Input maxLength={11} />
        </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default FormNhaXe;
