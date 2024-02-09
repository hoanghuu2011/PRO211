import React, { Component } from "react";
import HeaderContent from "../common/HeaderContent";
import { Button } from "antd";
import ChuyenList from "./ChuyenList";
import withRouter from "../../helpers/withRouter";
import { connect } from "react-redux";
import {
  ChuyenEditData,
  getListChuyen,
  deleteChuyen,
} from "../../redux/actions/actionChuyen";

class ListChuyen extends Component {
  onEdit = (data) => {
    this.props.ChuyenEditData(data, this.props.router.navigate);
  };
  onConfirm = (data) => {
    const { navigate } = this.props.router;
    this.props.deleteChuyen(data.maChuyen);
    navigate("/chuyen/danhsach");
  };
  componentDidMount = () => {
    this.props.getListChuyen();
  };
  render() {
    const { chuyens } = this.props;

    const { navigate } = this.props.router;
    return (
      <>
        <HeaderContent title="Danh sách chuyến xe" navigate={navigate} />

        <Button
          type="primary"
          onClick={() => {
            navigate("/chuyen/them");
          }}
        >
          Thêm mới
        </Button>

        <ChuyenList
          chuyens={chuyens}
          onEdit={this.onEdit}
          onConfirm={this.onConfirm}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  chuyen: state.ChuyenReducer.chuyen,
  chuyens: state.ChuyenReducer.chuyens,
});

const mapDispatchToProps = {
  ChuyenEditData,
  getListChuyen,
  deleteChuyen,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListChuyen));
