import React, { Component } from "react";
import HeaderContent from "../common/HeaderContent";
import withRouter from "../../helpers/withRouter";
import OrderList from "./OrderList";
import { connect } from "react-redux";
import {
  getListOrder,
  getListOrderDetail,
} from "../../redux/actions/actionOrder";

export class ListOrder extends Component {
  componentDidMount = () => {
    this.props.getListOrder();
  };
  onGoDetail = (data) => {
    this.props.router.navigate(`/datve/vechitiet/${data.maVe}`);
  };
  render() {
    const { navigate } = this.props.router;
    const { order } = this.props;
    const reversedOrder = order.slice().reverse();
    return (
      <>
      <HeaderContent title="Danh sách đặt vé" navigate={navigate} />

      <OrderList od={reversedOrder} onGoDetail={this.onGoDetail} />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  order: state.OrderReducer.order,
});

const mapDispatchToProps = {
  getListOrder,
  getListOrderDetail,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListOrder));
