

import React,{ useEffect,useState,Component } from 'react';
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  TimePicker,
} from "antd";
import { createRef } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import moment from "moment";
const format = "HH:mm";
class FormTuyenXe extends Component {
  
  form = createRef();
 
  goNext = (values) => {
    const { tuyenXe } = this.props;
  
   
  
    this.form.current
        .validateFields()
        .then((validatedValues) => {
            this.props.goNext(validatedValues);
        })
        .catch((errorInfo) => {
            console.log("Validation failed:", errorInfo);
        });
};

  render() {
    
    const { tuyenXe } = this.props;
    const di = tuyenXe.tgDi ? dayjs(tuyenXe.tgDi, format) : "";
    const den = tuyenXe.tgDen ? dayjs(tuyenXe.tgDen, format) : "";
   
 
    const dateFormat = "YYYY-MM-DD";


    return (
      <>
        <Form
          ref={this.form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
  
          }}
       
          key={tuyenXe.maTuyenXe}
        >
          <Row>
            <Col md={24}>
              <Form.Item
                name="maTuyenXe"
                label="Mã tuyến xe"
                initialValue={tuyenXe.maTuyenXe}
              >
                <Input readOnly />
              </Form.Item>
              <Form.Item name="gia" label="Giá vé" initialValue={tuyenXe.gia}>
                <InputNumber />
              </Form.Item>
              <Form.Item
                name="diemDi"
                label="Điểm đi"
                initialValue={tuyenXe.diemDi}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="diemDen"
                label="Điểm đến"
                initialValue={tuyenXe.diemDen}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="noiDon"
                label="Nơi đón"
                initialValue={tuyenXe.noiDon}
              >
                <Input />
              </Form.Item>

              <Form.Item name="tgDi" label="Thời gian đi">
                <TimePicker defaultValue={di} format={format} />
              </Form.Item>
              <Form.Item name="tgDen" label="Thời gian đến">
                <TimePicker defaultValue={den} format={format} />
              
              </Form.Item>
    
            </Col>
          </Row>
          <Row>
            <Divider></Divider>
            <Col md={24}>
              <Button
                type="primary"
                onClick={this.goNext}
                style={{ float: "right" }}
              >
                Next
              </Button>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

export default FormTuyenXe;
