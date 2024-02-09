import React, { Component } from "react";

import Column from "antd/es/table/Column";
import { Button, Image, Skeleton, Space, Table } from "antd";

import { BiEdit, BiSolidTrash } from "react-icons/bi";

class ListNhaXe extends Component {
  render() {
    const { dataSource, isLoading } = this.props;

    if (isLoading) {
      return (
        <>
          <Skeleton active />
        </>
      );
    }
    return (
      <div>
        <Table dataSource={dataSource} rowKey="id">
          <Column
            title="ID"
            key="id"
            dataIndex="id"
            align="center"
            width={50}
          ></Column>

          <Column
            title="Tên nhà xe"
            key="tenNhaXe"
            dataIndex="tenNhaXe"
            align="center"
          ></Column>

          <Column
            title="Địa chỉ nhà xe"
            key="diaChiNhaXe"
            dataIndex="diaChiNhaXe"
            align="center"
          ></Column>

          <Column
            title="Số điện thoại"
            key="sdt"
            dataIndex="sdt"
            align="center"
          ></Column>

          <Column
            title="Action"
            key="action"
            align="center"
            width={400}
            render={(_, record) => (
              <Space size="middle">
                <Button
                  key={record.key}
                  type="primary"
                  size="small"
                  onClick={() => this.props.editManu(record)}
                >
                  <BiEdit /> Cập nhật
                </Button>
                <Button
                  key={record.key}
                  type="primary"
                  danger
                  size="small"
                  onClick={() => this.props.openDeleteModal(record)}
                >
                  <BiSolidTrash /> Xóa
                </Button>
              </Space>
            )}
          ></Column>
        </Table>
      </div>
    );
  }
}

export default ListNhaXe;
