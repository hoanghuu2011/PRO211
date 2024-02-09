import React, { Component } from "react";
import HeaderContent from "../common/HeaderContent";

import withRouter from "../../helpers/withRouter";
import { Button, Modal } from "antd";

import { connect } from "react-redux";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import FormNoiTra from "./FormNoiTra";
import ListNoiTra from "./ListNoiTra";
import {
  insterNoiTra,
  getListNoiTra,
  clearList,
  updateNoiTra,
  deleteNoiTra,
} from "../../redux/actions/actionNoiTra";

class NoiTra extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      noiTra: {
        id: "",
        noiTra: "",
      },
    };
  }
  componentDidMount = () => {
    this.props.getListNoiTra();
  };

  onCreate = (value) => {
    this.props.insterNoiTra(value);
    this.setState({ ...this.state, open: false });
  };
  onEdit = (value) => {
    const { navigate } = this.props.router;
    this.props.updateNoiTra(value.id, value, navigate);
    this.setState({ ...this.state, open: false });
  };
  editManu = (data) => {
    this.setState({ open: true, noiTra: data });
  };
  onCancel = () => {
    this.setState({
      open: false,
      noiTra: {
        id: "",
        noiTra: "",
      },
    });
  };
  handleDeleteManu = (data) => {
    this.props.deleteNoiTra(data.id);
    this.setState({
      ...this.state,
      noiTra: { id: "", noiTra: "" },
    });
  };

  openDeleteModal = (data) => {
    this.setState({ ...this.state, noiTra: data });

    const message = "Bạn muốn xóa nơi trả " + data.noiTra;

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
    const { noiTras } = this.props;
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

        <FormNoiTra
          noiTra={this.state.noiTra}
          open={open}
          onCreate={this.onCreate}
          onEdit={this.onEdit}
          onCancel={this.onCancel}
        />
        <ListNoiTra
          dataSource={noiTras}
          openDeleteModal={this.openDeleteModal}
          editManu={this.editManu}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  noiTras: state.NoiTraReducer.noiTras,
});

const mapDispatchToProps = {
  insterNoiTra,
  getListNoiTra,
  clearList,
  updateNoiTra,
  deleteNoiTra,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NoiTra));
