import React, { Component } from "react";
import HeaderContent from "../common/HeaderContent";
import ListTuyen from "./ListTuyenXe";
import withRouter from "../../helpers/withRouter";
import { Button, Modal } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import {
  TuyenEditData,
  getListTuyen,
  clearList,
  deleteTuyen,
} from "../../redux/actions/actionTuyenXe";
import { ExclamationCircleOutlined } from "@ant-design/icons";

class TuyenXe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      tuyenXe: {
        maTuyenXe: "",
        gia: 0,
        tgDen: "",
        tgDi: "",
        noiTra: "",
        noiDon: "",
        diemDen: "",
        diemDi: "",
      
      },
    };
  }
  componentDidMount = () => {
    this.props.getListTuyen();
  };

  onEdit = (value) => {
    const { navigate } = this.props.router;
    this.props.updateTuyen(value.maTuyenXe, value, navigate);
  };
  editManu = (data) => {
    const { navigate } = this.props.router;
    this.props.TuyenEditData(data, navigate);
  };

  onCancel = () => {
    this.setState({
      open: false,
      tuyenXe: {
        maTuyenXe: "",
        gia: "",
        tgDen: "",
        tgDi: "",
        noiTra: "",
        noiDon: "",
        diemDen: "",
        diemDi: "",
     
      },
    });
  };
  handleDeleteManu = (data) => {
    this.props.deleteTuyen(data.maTuyenXe);
    this.setState({
      ...this.state,
      tuyenXe: {
        maTuyenXe: "",
        gia: "",
        tgDen: "",
        tgDi: "",
        noiTra: "",
        noiDon: "",
        diemDen: "",
        diemDi: "",
      },
    });
  };

  openDeleteModal = (data) => {
    this.setState({ ...this.state, tuyenXe: data });

    const message = "Do you want to delete the Tuyen " + data.maTuyenXe;

    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: message,
      onOk: () => this.handleDeleteManu(data),
      okText: "Delete",
      cancelText: "Cancel",
    });
  };

  render() {
    const { navigate } = this.props.router;
    const { tuyenXes } = this.props;
    return (
      <>
        <HeaderContent title="List Tuyen" navigate={navigate} />

        <Button
          type="primary"
          onClick={() => {
            navigate("/tuyen/them");
          }}
        >
          Thêm tuyến
        </Button>

        <ListTuyen
          dataSource={tuyenXes}
          openDeleteModal={this.openDeleteModal}
          editManu={this.editManu}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  tuyenXe: state.TuyenXeReducer.tuyenXe,
  tuyenXes: state.TuyenXeReducer.tuyenXes,
});

const mapDispatchToProps = {
  getListTuyen,
  clearList,

  deleteTuyen,
  TuyenEditData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TuyenXe));
