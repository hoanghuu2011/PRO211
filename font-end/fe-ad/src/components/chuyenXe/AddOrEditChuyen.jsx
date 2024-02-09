import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import HeaderContent from "../common/HeaderContent";
import { Button, Col, Divider, Row, Space, Steps } from "antd";
import CarService from "../../services/CarService";
import { SaveOutlined } from "@ant-design/icons";
import TuyenXeService from "../../services/TuyenXeService";
import { connect } from "react-redux";
import {
  insterChuyen,
  updateChuyen,
  clearChuyen,
} from "../../redux/actions/actionChuyen";
import FormChuyen from "./FormChuyen";
import { toast } from "react-toastify";
import TransferNhanVien from "./TransferNhanVien";
import NhanVienService from "../../services/NhanVienService";
import ChuyenXeService from "../../services/ChuyenXeService";

class AddOrEditChuyen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      chuyen: {},
      nhanViens: [],
      xe: [],
      tuyen: [],
    };
  }
  goNext = (values) => {
    this.setState({ ...this.state, chuyen: values, step: 1 });
  };
  goPrevi = () => {
    this.setState({ ...this.state, step: 0 });
  };

  componentDidMount = () => {
    this.loadData();
    const { chuyen } = this.props;
    console.log(chuyen);
    chuyen &&
      chuyen.xe &&
      chuyen.xe.bienSoXe &&
      this.loadListNhanVien(this.props.chuyen.xe.bienSoXe);
  };

  handleTargetKeysChange = (targetKeys) => {
    this.setState({ nhanViens: targetKeys });
  };
  saveProduct = () => {
    const { nhanViens, chuyen, listNhanVien } = this.state;
    const { navigate } = this.props.router;
    const nhanVienChon = listNhanVien.filter((item) =>
      nhanViens.includes(item.soCCCD)
    );

    const newChuyen = { ...chuyen, nhanViens: nhanVienChon };

    this.props.insterChuyen(newChuyen, navigate);
  };

  updateProduct = () => {
    const { nhanViens, chuyen, listNhanVien } = this.state;
    const { navigate } = this.props.router;
    const nhanVienChon = listNhanVien.filter((item) =>
      nhanViens.includes(item.soCCCD)
    );

    const newChuyen = { ...chuyen, nhanViens: nhanVienChon };
    this.props.updateChuyen(newChuyen.maChuyen, newChuyen, navigate);
  };

  loadListNhanVien = async (value) => {
    const nhanVienService = new NhanVienService();
    const nhanVienRes = await nhanVienService.getNhanVienNhaXe(value);
    console.log(nhanVienRes);
    nhanVienRes &&
      nhanVienRes.data &&
      this.setState({ ...this.state, listNhanVien: nhanVienRes.data });
  };

  loadData = async () => {
    try {
      const carServer = new CarService();
      const tuyenService = new TuyenXeService();

      const XeRes = await carServer.getCar();
      const tuyenRes = await tuyenService.getTuyen();

      this.setState({
        ...this.state,
        xe: XeRes.data,
        tuyen: tuyenRes.data,
      });
    } catch (error) {
      console.log(error);
      toast.error("Error: " + error);
    }
    this.loadNhanVien();
  };
  loadNhanVien = () => {
    const { chuyen } = this.props;
    if (chuyen && chuyen.nhanViens) {
      this.setState({ ...this.state, nhanViens: chuyen.nhanViens });
    }
  };

  render() {
    const { navigate } = this.props.router;
    const { step, listNhanVien } = this.state;
    const { chuyen } = this.props;
    return (
      <>
        <HeaderContent
          title={
            chuyen && chuyen.maChuyen ? "Cập nhật chuyến" : "Thêm chuyến mới"
          }
          navigate={navigate}
        />

        <Row>
          <Col md={24}>
            <Steps
              current={step}
              items={[
                {
                  title: "Thông tin chuyến",
                },
                { title: "Nhân viên", description: "Chọn nhân viên chuyến xe" },
              ]}
            ></Steps>
          </Col>
        </Row>

        <Row>
          <Col md={24}>
            {step === 0 && (
              <>
                <Button
                  type="primary"
                  onClick={() => {
                    this.props.clearChuyen();
                    navigate("/chuyen/them");
                  }}
                >
                  Mới
                </Button>
                <Divider></Divider>
                <FormChuyen
                  chuyen={chuyen}
                  goNext={this.goNext}
                  loadListNhanVien={this.loadListNhanVien}
                ></FormChuyen>
              </>
            )}
            {step === 1 && (
              <>
                <TransferNhanVien
                  list={listNhanVien}
                  chuyen={chuyen}
                  handleTargetKeysChange={this.handleTargetKeysChange}
                />
                <Divider></Divider>
                <Row>
                  <Col md={24}>
                    <Divider></Divider>
                    <div style={{ float: "right" }}>
                      <Space>
                        <Button type="primary" onClick={this.goPrevi}>
                          Previous
                        </Button>
                        {chuyen && chuyen.maChuyen ? (
                          <Button type="primary" onClick={this.updateProduct}>
                            <SaveOutlined /> Update
                          </Button>
                        ) : (
                          <Button type="primary" onClick={this.saveProduct}>
                            <SaveOutlined /> Save
                          </Button>
                        )}
                      </Space>
                    </div>
                  </Col>
                </Row>
              </>
            )}
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  chuyen: state.ChuyenReducer.chuyen,
});

const mapDispatchToProps = {
  insterChuyen,
  updateChuyen,
  clearChuyen,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddOrEditChuyen));
