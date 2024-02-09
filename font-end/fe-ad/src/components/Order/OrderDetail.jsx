import React, { useEffect } from "react";
import HeaderContent from "../common/HeaderContent";
import ListOrderDetail from "./ListOrderDetail";
import { connect } from "react-redux";
import { useParams } from "react-router-dom"; // Chú ý sử dụng react-router-dom thay vì react-router
import { getListOrderDetail } from "../../redux/actions/actionOrder";

const OrderDetail = ({ orderDetail, getListOrderDetail, navigate }) => {
  const { id } = useParams();
  const params = new URLSearchParams(window.location.search);
  const total = params.get("total");
  console.log(total);

  useEffect(() => {
    getListOrderDetail(id);
  }, [id, getListOrderDetail]);
  console.log(orderDetail);
  return (
    <>
      <HeaderContent title="Vé chi tiết" navigate={navigate} />
      <ListOrderDetail odd={orderDetail} total={total} />
    </>
  );
};

const mapStateToProps = (state) => ({
  orderDetail: state.OrderReducer.orderDetail,
});

const mapDispatchToProps = {
  getListOrderDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
