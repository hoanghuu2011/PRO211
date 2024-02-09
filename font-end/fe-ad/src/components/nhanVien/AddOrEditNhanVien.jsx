import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import HeaderContent from "../common/HeaderContent";
import { Button, Col, Divider, Row, Space, Steps, notification } from "antd";
import FormNhanVien from "./FormNhanVien";
import { SaveOutlined } from "@ant-design/icons";

import { toast } from "react-toastify";
import { connect } from "react-redux";
import {
  insterNhanVien,
  updateNhanVien,
  clearNhanVien,
} from "../../redux/actions/actionNhanVien";
import NhaXeService from "../../services/NhaXeService";

class AddOrEditNhanVien extends Component {
  state = {
    nhaXe: [],
  };
  clearform = () => {
    const { navigate } = this.props.router;
    this.props.clearNhanVien();
    navigate("/nhanvien/them");
  };
  componentDidMount = () => {
    this.loadData();
  };

  loadData = async () => {
    try {
      const nhaXeService = new NhaXeService();

      const nhaXeRes = await nhaXeService.getNhaXe();

      this.setState({
        ...this.state,

        nhaXe: nhaXeRes.data,
      });
    } catch (error) {
      console.log(error);
      toast.error("Error: " + error);
    }
  };

  goNext = async (values) => {
    const { navigate } = this.props.router;
    const { insterNhanVien, updateNhanVien, nhanVien } = this.props;
    const { nhaXe } = this.state;

    const nx = nhaXe.find((item) => item.id === values.nhaXe);
    let newNhanVien = { ...values, nhaXe: nx };

    if (nhanVien && nhanVien.soCCCD) {
      await updateNhanVien(nhanVien.soCCCD, newNhanVien, navigate);
      console.log(newNhanVien);
    } else {
      await insterNhanVien(newNhanVien, navigate);
    }
  };

  render() {
    const { navigate } = this.props.router;
    const { nhanVien } = this.props;
    return (
      <>
        <HeaderContent
          title={
            nhanVien && nhanVien.soCCCD
              ? "Cập nhật nhân viên"
              : "Thêm mới nhân viên"
          }
          navigate={navigate}
        />

        <Button
          type="primary"
          onClick={() => {
            this.clearform();
          }}
        >
          Mới
        </Button>

        <Row>
          <Col md={24}>
            <Divider></Divider>
            <FormNhanVien
              nhanVien={nhanVien}
              nhaXe={this.state.nhaXe}
              goNext={this.goNext}
            ></FormNhanVien>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  nhanVien: state.NhanVienReducer.nhanVien,
});

const mapDispatchToProps = {
  insterNhanVien,
  updateNhanVien,
  clearNhanVien,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddOrEditNhanVien));
