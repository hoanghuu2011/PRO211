import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import HeaderContent from "../common/HeaderContent";
import { Button, Col, Divider, Row, Space, Steps, notification } from "antd";
import FormProduct from "./FormProduct";
import UploadImage from "./UploadImage";
import { SaveOutlined } from "@ant-design/icons";
import LoaiXeServer from "../../services/LoaiXeService";
import ManufuactureService from "../../services/ManufacturerService";

import { toast } from "react-toastify";
import { connect } from "react-redux";
import { insterCar, updateCar, clearCars } from "../../redux/actions/actionCar";
import NhaXeService from "../../services/NhaXeService";

class AddOrEditProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Car: {},
   
      loaiXe: [],
      nhaXe: [],
    };
  }

  componentDidMount = () => {
    this.loadData();
  };

  clearform = () => {
    const { navigate } = this.props.router;
    this.props.clearCars();
    navigate("/xe/them");
  };

  goNext = async (values) => {
    const { navigate } = this.props.router;
    const { insterCar, updateCar, Car } = this.props;
    const { loaiXe, nhaXe } = this.state;

    const lx = loaiXe.find((item) => item.id === values.loaiXe);
 
    const nx = nhaXe.find((item) => item.id === values.nhaXe);

    let newCar = { ...values, loaiXe: lx,  nhaXe: nx };

    if (Car && Car.bienSoXe) {
      await updateCar(newCar.bienSoXe, newCar, navigate);
    } else {
      await insterCar(newCar, navigate);
      console.log(newCar);
    }
  };

  loadData = async () => {
    try {
      const loaiXeServer = new LoaiXeServer();
      const nhaXeService = new NhaXeService();

      const loaiXeRes = await loaiXeServer.getLoaiXe();
      const nhaXeRes = await nhaXeService.getNhaXe();
     
      this.setState({
        ...this.state,
       
        loaiXe: loaiXeRes.data,
        nhaXe: nhaXeRes.data,
      });
    } catch (error) {
      console.log(error);
      toast.error("Error: " + error);
    }
  };

  render() {
    const { navigate } = this.props.router;
    const { loaiXe, nhaXe } = this.state;
    const { Car } = this.props;
    return (
      <>
        <HeaderContent
          title={Car && Car.bienSoXe ? "Cập nhật  xe" : "Thêm xe mới"}
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
            <FormProduct
              Car={Car}
              goNext={this.goNext}
              loaiXe={loaiXe}
              nhaXe={nhaXe}
            ></FormProduct>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  Car: state.CarReducer.Car,
});

const mapDispatchToProps = {
  insterCar,
  updateCar,
  clearCars,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddOrEditProduct));
