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

import CarService from "../../services/CarService";
import TuyenXeService from "../../services/TuyenXeService";
dayjs.extend(customParseFormat);
const dateFormat = "dd-MM-YYYY";
class FormChuyen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      xe: [],
      tuyen: [],
    };
  }
  form = React.createRef();

  goNext = () => {
    this.form.current
      .validateFields()
      .then((values) => {
        this.props.goNext(values);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
        // Xử lý khi validation không thành công nếu cần
      });
  };

  handleChange = (value) => {
    this.props.loadListNhanVien(value);
  };

  componentDidUpdate(prevProps) {
    // Kiểm tra nếu dữ liệu product đã được cập nhật
    if (this.props.Car !== prevProps.Car) {
      this.goNext();
    }
  }

  loadData = async () => {
    try {
      const xeService = new CarService();
      const tuyenService = new TuyenXeService();

      const xeRes = await xeService.getCar();
      const tuyenRes = await tuyenService.getTuyen();

      this.setState({
        xe: xeRes.data,
        tuyen: tuyenRes.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount = () => {
    this.loadData();
  };
  render() {
    const { chuyen } = this.props;
    const { xe, tuyen } = this.state;

    const listXe = xe.map((item) => {
      const loai = {
        label: `${item.bienSoXe} - ${item.nhaXe.tenNhaXe}`,
        value: item.bienSoXe,
      };
      return loai;
    });
    const listTuyen = tuyen.map((item) => {
      const data = {
        label: `${item.diemDi} - ${item.diemDen} (${item.tgDi})`,
        value: item.maTuyenXe,
      };
      return data;
    });

    const xeId = chuyen && chuyen.xe ? chuyen.xe.bienSoXe : "";
    const tuyenId = chuyen && chuyen.tuyenXe ? chuyen.tuyenXe.maTuyenXe : "";
    console.log(xeId);
    console.log(tuyenId);
    return (
      <>
        <Form layout="vertical" className="form" size="middle" ref={this.form}>
          <Row>
            <Col md={12}>
              <Form.Item
                label="Mã Chuyến xe"
                name="maChuyen"
                initialValue={chuyen.maChuyen}
              >
                <Input disabled={true}></Input>
              </Form.Item>

              <Form.Item label="Xe" name="xe">
                <Select
                  options={listXe}
                  defaultValue={xeId}
                  onChange={this.handleChange}
                ></Select>
              </Form.Item>
              <Form.Item label="Tuyến xe chạy" name="tuyenXe">
                <Select options={listTuyen} defaultValue={tuyenId}></Select>
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
                Tiếp tục
              </Button>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

export default FormChuyen;
