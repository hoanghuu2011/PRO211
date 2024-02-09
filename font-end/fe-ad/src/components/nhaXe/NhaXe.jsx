import React, { Component } from "react";
import HeaderContent from "../common/HeaderContent";

import withRouter from "../../helpers/withRouter";
import { Button, Modal } from "antd";

import { connect } from "react-redux";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import FormNhaXe from "./FormNhaXe";
import ListNhaXe from "./ListNhaXe";
import {
  insterNhaXe,
  getListNhaXe,
  clearList,
  updateNhaXe,
  deleteNhaXe,
} from "../../redux/actions/actionNhaXe";

class NhaXe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      nhaXe: { id: "", tenNhaXe: "", diaChiNhaXe: "", sdt: "" },
    };
  }
  componentDidMount = () => {
    this.props.getListNhaXe();
  };

  onCreate = (value) => {
    this.props.insterNhaXe(value);
  };
  onEdit = (value) => {
    const { navigate } = this.props.router;
    this.props.updateNhaXe(value.id, value, navigate);
    this.setState({...this.state, open: false})
  };
  editManu = (data) => {
    this.setState({ open: true, nhaXe: data });
  };
  onCancel = () => {
    this.setState({
      open: false,
      nhaXe: { id: "", tenNhaXe: "", diaChiNhaXe: "", sdt: "" },
    });
  };
  handleDeleteManu = (data) => {
    this.props.deleteNhaXe(data.id);
    this.setState({
      ...this.state,
      nhaXe: { id: "", tenNhaXe: "", diaChiNhaXe: "", sdt: "" },
    });
  };

  openDeleteModal = (data) => {
    this.setState({ ...this.state, nhaXe: data });

    const message = "Bạn muốn xóa nơi trả " + data.tenNhaXe;

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
    const { open } = this.state;
    const { nhaXes } = this.props;
    return (
      <>
        <HeaderContent title="List ManuFacturer" navigate={navigate} />

        <Button
          type="primary"
          onClick={() => {
            this.setState({ ...this.state, open: true });
          }}
        >
          Thêm mới
        </Button>

        <FormNhaXe
          nhaXe={this.state.nhaXe}
          open={open}
          onCreate={this.onCreate}
          onEdit={this.onEdit}
          onCancel={this.onCancel}
        />
        <ListNhaXe
          dataSource={nhaXes}
          openDeleteModal={this.openDeleteModal}
          editManu={this.editManu}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  nhaXes: state.NhaXeReducer.nhaXes,
});

const mapDispatchToProps = {
  insterNhaXe,
  getListNhaXe,
  clearList,
  updateNhaXe,
  deleteNhaXe,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NhaXe));
