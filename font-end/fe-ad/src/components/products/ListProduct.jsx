import React, { Component } from "react";
import HeaderContent from "../common/HeaderContent";
import { Button } from "antd";
import ProductList from "./ProductList";
import withRouter from "../../helpers/withRouter";
import { connect } from "react-redux";
import {
  CarEditData,
  getListCars,
  deleteCar,
} from "../../redux/actions/actionCar";

class ListProduct extends Component {
  onEdit = (data) => {
    this.props.CarEditData(data, this.props.router.navigate);
  };
  onConfirm = (data) => {
    this.props.deleteCar(data.bienSoXe);
  };
  componentDidMount = () => {
    this.props.getListCars();
  };
  render() {
    const { Cars } = this.props;

    const { navigate } = this.props.router;
    return (
      <>
        <HeaderContent title="Danh sách xe" navigate={navigate} />

        <Button
          type="primary"
          onClick={() => {
            navigate("/xe/them");
          }}
        >
          Thêm mới
        </Button>

        <ProductList
          Cars={Cars}
          onEdit={this.onEdit}
          onConfirm={this.onConfirm}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  Car: state.CarReducer.Car,
  Cars: state.CarReducer.Cars,
});

const mapDispatchToProps = {
  CarEditData,
  getListCars,
  deleteCar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListProduct));
