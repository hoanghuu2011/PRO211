import React from "react";
import {
  Modal,
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  Divider,
  Checkbox,
  Image,
} from "antd";

import TextArea from "antd/es/input/TextArea";
import ImagesService from "../../services/ImagesService";

const ProductDetail = ({ visible, Car, onClose }) => {
  return (
    <Modal
      open={visible}
      title="Product Detail"
      footer={null}
      onCancel={onClose}
      width={700}
      centered
    >
      {Car !== null && (
        <Form layout="vertical" className="form" size="middle">
          <Row>
            <Col md={12}>
              <Form.Item>
                <Image
                  src={ImagesService.getImageUrl(Car.image.fileName)}
                ></Image>
              </Form.Item>
              <Form.Item
                label="Id"
                name="id"
                initialValue={Car.bienSoXe ? Car.bienSoXe : null}
              >
                <Input readOnly></Input>
              </Form.Item>
             
            </Col>
          </Row>
          <Row>

          </Row>
        </Form>
      )}
    </Modal>
  );
};

export default ProductDetail;
