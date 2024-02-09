import React, { useState } from "react";
import { Modal, Form, Row, Col, Input, Select } from "antd";

const AccountEdit = ({ visible, acc, onClose, onOkUpdate }) => {
  const [formData, setFormData] = useState({
    tenTaiKhoan: acc ? acc.tenTaiKhoan : "",
    vaitro: acc ? acc.vaitro : "",
  });

  const handleFormChange = (value) => {
    setFormData((prevData) => ({
      tenTaiKhoan: acc.tenTaiKhoan,
      matKhau: acc.matKhau,
      vaiTro: value,
    }));
  };

  return (
    <Modal
      open={visible}
      title="Cập nhật tài khoản"
      okText="Cập nhật"
      onCancel={onClose}
      onOk={() => onOkUpdate(formData)}
      width={300}
      centered
    >
      {acc !== null && (
        <Form layout="vertical" className="form" size="middle">
          <Row>
            <Col md={24}>
              <Form.Item
                label="Tên Tài KHoản"
                name="tenTaiKhoan"
                initialValue={acc.tenTaiKhoan}
              >
                <Input readOnly></Input>
              </Form.Item>
              <Form.Item
                label="Status"
                name="status"
                initialValue={acc.vaiTro}
                rules={[{ required: true }]}
                hasFeedback
              >
                <Select
                  placeholder="Select Status"
                  value={formData.vaiTro}
                  onChange={(value) => handleFormChange(value)}
                >
                  <Select.Option value="Admin">ADMIN</Select.Option>
                  <Select.Option value="QuanLy">Quan Ly</Select.Option>
                  <Select.Option value="ThanhVien">Thanh Vien</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Modal>
  );
};

export default AccountEdit;
