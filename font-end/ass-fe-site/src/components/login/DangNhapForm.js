// DangNhapForm.js
import React from "react";
import { Button, Form, Input } from "antd";
import { BsTelephoneFill } from "react-icons/bs";
import { PiPasswordFill } from "react-icons/pi";
import { toast } from "react-toastify";
import "react-notifications/lib/notifications.css";
import DangKyForm from "./DangKyForm";
import { NavLink } from "react-router-dom";


const DangNhapForm = (props) => {
  const onFinish = (values) => {
    props.onFinish(values);
  };

  const onFinishFailed = (errorInfo) => {
    toast.error(errorInfo);
  };

  const keyTabs = props.keyTabs;

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="tenTaiKhoan"
        rules={[
          {
            required: true,
            message: "Nhập số điện thoại",
          },
        ]}
      >
        <Input
          placeholder="Nhập số điện thoại"
          prefix={<BsTelephoneFill />}
          className="input-form"
        />
      </Form.Item>

      <Form.Item
        name="matKhau"
        rules={[
          {
            required: true,
            message: "Nhập mật khẩu",
          },
        ]}
      >
        <Input.Password
          placeholder="Nhập mật khẩu"
          prefix={<PiPasswordFill />}
          className="input-form"
        />
      </Form.Item>

      {keyTabs === 2 && (
        <DangKyForm
          onFinish={(values) => console.log("Đăng ký", values)}
          onFinishFailed={(errorInfo) => toast.error(errorInfo)}
        />
      )}
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button htmlType="submit" className="btn-login">
            {keyTabs === 1 ? "Đăng nhập" : "Đăng ký"}
          </Button>
        </Form.Item>
        <NavLink exact to="/quenmk" style={{marginLeft:'-3.8cm'}}>
          Quên mật khẩu
        </NavLink>
      </Form.Item>

     
    </Form>
  );
};

export default DangNhapForm;
