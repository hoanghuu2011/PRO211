import React, { Component } from "react";
import HeaderContent from "../common/HeaderContent";
import { Button } from "antd";
import withRouter from "../../helpers/withRouter";
import { connect } from "react-redux";
import {
  nhanVienEditData,
  getListNhanVien,
  deleteNhanVien,
} from "../../redux/actions/actionNhanVien";
import NhanVienList from "./NhanVienList";

class ListNhanVien extends Component {
  onEdit = (data) => {
    this.props.nhanVienEditData(data, this.props.router.navigate);
  };
  onConfirm = (data) => {
    this.props.deleteNhanVien(data.soCCCD);
  };
  componentDidMount = () => {
    this.props.getListNhanVien();
  };
  render() {
    const { nhanViens } = this.props;

    const { navigate } = this.props.router;
    return (
      <>
        <HeaderContent title="Danh sách nhân viên" navigate={navigate} />

        <Button
          type="primary"
          onClick={() => {
            navigate("/nhanvien/them");
          }}
        >
          Thêm mới
        </Button>

        <NhanVienList
          list={nhanViens}
          onEdit={this.onEdit}
          onConfirm={this.onConfirm}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  nhanVien: state.NhanVienReducer.nhanVien,
  nhanViens: state.NhanVienReducer.nhanViens,
});

const mapDispatchToProps = {
  deleteNhanVien,
  nhanVienEditData,
  getListNhanVien,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListNhanVien));
