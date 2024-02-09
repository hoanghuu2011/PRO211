import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
} from "antd";
import React, { Component } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker, Space, message } from "antd";

import ImagesService from "../../services/ImagesService";
dayjs.extend(customParseFormat);
class FormProduct extends Component {
  form = React.createRef();

  goNext = () => {
    this.form.current
      .validateFields()
      .then((values) => {
        const { bienSoXe } = values;
        const bienSoXeRegex = /^\d{2}-[A-Z]\d{1}-\d{5}$/;
        if (!bienSoXeRegex.test(bienSoXe)) {
          message.error("Biển số xe không đúng định dạng. Vui lòng kiểm tra lại." + bienSoXeRegex);
          return;
        }
  
        const newValues = {
          ...values,
          anhDaLuu: values.anhDaLuu[0].response,
        };
  
        this.props.goNext(newValues);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };
  
  componentDidUpdate(prevProps) {
    if (this.props.Car !== prevProps.Car) {
      this.goNext();
    }
  }

  hanldeImageRemove = (info) => {
    console.log("info: ", info);

    if (info.filename) {
      ImagesService.deleteImage(info.fileName);
    } else if (info.response && info.response.fileName) {
      ImagesService.deleteImage(info.response.fileName);
    }
  };

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }

    if (e.fileList.length > 1) {
      return [e.fileList[1]];
    }

    return e && e.fileList;
  };
  render() {
    const { Car, loaiXe, nhaXe } = this.props;

    const listLoai = loaiXe.map((item) => {
      const loai = {
        label: `${item.tenLoai} ${item.loaiGhe} ${item.soGhe}`,
        value: item.id,
      };
      return loai;
    });
   
    const listNhaXe = nhaXe.map((item) => {
      const nha = { label: item.tenNhaXe, value: item.id };
      return nha;
    });

    const loaiXeId = Car.loaiXe ? Car.loaiXe.id : "";

    const nhaXeId = Car.nhaXe ? Car.nhaXe.id : "";

    return (
      <>
        <Form layout="vertical" className="form" size="middle" ref={this.form}>
          <Row>
            <Col md={12}>
              <Form.Item
                label="Biển số xe"
                name="bienSoXe"
                initialValue={Car.bienSoXe}
              >
                <Input disabled={Car.bienSoXe ? true : false}></Input>
              </Form.Item>

              <Form.Item label="Loại Ghế" name="loaiXe">
                <Select options={listLoai} defaultValue={loaiXeId}></Select>
              </Form.Item>

              <Form.Item label="Nhà xe" name="nhaXe">
                <Select options={listNhaXe} defaultValue={nhaXeId}></Select>
              </Form.Item>
             

              <Form.Item
                label="Main Image"
                name="anhDaLuu"
                initialValue={
                  Car.anhDaLuu
                    ? [
                        {
                          ...Car.anhDaLuu,
                          url: ImagesService.getImageUrl(Car.anhDaLuu.tenTep),
                        },
                      ]
                    : []
                }
                rules={[{ required: true }]}
                hasFeedback
                valuePropName="fileList"
                getValueFromEvent={this.normFile}
              >
                <Upload
                  listType="picture"
                  accept=".jpg, .png, .gif"
                  maxCount={1}
                  onRemove={this.hanldeImageRemove}
                  action={ImagesService.getImageUploadUrl()}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Divider></Divider>
            <Col md={24}>
              {" "}
              <Button
                type="primary"
                onClick={this.goNext}
                style={{ float: "right" }}
              >
                Lưu
              </Button>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

export default FormProduct;
