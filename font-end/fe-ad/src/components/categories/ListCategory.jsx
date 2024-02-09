import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import HeaderContent from "../common/HeaderContent";
import Column from "antd/es/table/Column";
import { Button, Modal, Skeleton, Space, Table, Tag } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { BiEdit, BiSolidTrash } from "react-icons/bi";
import { connect } from "react-redux";
import {
  getListLoaiXe,
  clearList,
  deleteLoaiXe,
} from "../../redux/actions/actionLoaixe";

class ListCategory extends Component {
  componentDidMount = () => {
    this.props.getListLoaiXe();
  };

  componentWillUnmount = () => {
    this.props.clearList();
  };

  editLoaiXe = (data) => {
    const { navigate } = this.props.router;
    navigate("/loaixe/capnhat/" + data.id);
  };

  openDeleteModal = (data) => {
    // Cập nhật trạng thái với dữ liệu LoaiXe đã chọn
    this.setState({ LoaiXe: data });

    const message = "Bạn có muốn xóa LoaiXe " + data.id;

    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: message,
      onOk: () => this.handleDeleteLoaiXe(data.id),
      okText: "Xóa",
      cancelText: "Hủy",
    });
  };
  handleDeleteLoaiXe = (data) => {
    this.props.deleteLoaiXe(data.id);
    console.log("run");
  };

  render() {
    const { navigate } = this.props.router;
    const { LoaiXes, isLoading } = this.props;
    console.log(LoaiXes);

    if (isLoading) {
      return (
        <>
          <HeaderContent title="List LoaiXe" navigate={navigate} />
          <Skeleton active />
        </>
      );
    }
    return (
      <div>
        <HeaderContent title="List LoaiXe" navigate={navigate} />

        <Table dataSource={LoaiXes} rowKey="id">
          <Column
            title="LoaiXe ID"
            key="id"
            dataIndex="id"
            align="center"
            width={40}
          ></Column>

          <Column
            title="Tên Loại Xe"
            key="tenLoai"
            dataIndex="tenLoai"
            align="center"
          ></Column>

          <Column
            title="Số Ghế"
            key="soGhe"
            dataIndex="soGhe"
            align="center"
          ></Column>
          <Column
            title="Loại Ghế"
            key="loaiGhe"
            dataIndex="loaiGhe"
            align="center"
          ></Column>

          <Column
            title="Action"
            key="action"
            align="center"
            width={200}
            render={(_, record) => (
              <Space size="middle">
                <Button
                  key={record.key}
                  type="primary"
                  size="small"
                  onClick={() => this.editLoaiXe(record)}
                >
                  <BiEdit /> Edit
                </Button>
                <Button
                  key={record.key}
                  type="primary"
                  danger
                  size="small"
                  onClick={() => this.openDeleteModal(record)}
                >
                  <BiSolidTrash /> Delete
                </Button>
              </Space>
            )}
          ></Column>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  LoaiXes: state.LoaiXeReducer.LoaiXes,
  isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
  getListLoaiXe,
  clearList,
  deleteLoaiXe,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListCategory)
);
