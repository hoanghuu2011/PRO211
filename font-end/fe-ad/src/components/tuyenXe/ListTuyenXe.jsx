import React, { Component } from "react";

import Column from "antd/es/table/Column";
import { Button, Skeleton, Space, Table, Tooltip } from "antd";

import { BiEdit, BiSolidTrash } from "react-icons/bi";

class ListManufacturer extends Component {
  render() {
    const { dataSource, isLoading } = this.props;
    const reversedDataSource = dataSource.slice().reverse();
    if (isLoading) {
      return (
        <>
          <Skeleton active />
        </>
      );
    }
    return (
      <div>
        <Table dataSource={reversedDataSource} rowKey="maTuyenXe">
          <Column
            title="Mã tuyến xe"
            key="maTuyenXe"
            dataIndex="maTuyenXe"
            align="center"
          ></Column>
          <Column
            title="Giá vé"
            key="gia"
            dataIndex="gia"
            align="center"
          ></Column>
          <Column
            title="Điểm đi"
            key="diemDi"
            dataIndex="diemDi"
            align="center"
          ></Column>
          <Column
            title="Điểm đến"
            key="diemDen"
            dataIndex="diemDen"
            align="center"
          ></Column>
          <Column
            title="Nơi đón"
            key="noiDon"
            dataIndex="noiDon"
            align="center"
          ></Column>
          <Column
            title="Thời gian đi"
            key="tgDi"
            dataIndex="tgDi"
            align="center"
          ></Column>
          <Column
            title="Thời gian đến"
            key="tgDen"
            dataIndex="tgDen"
            align="center"
          ></Column>
          <Column
            title="Action"
            key="action"
            align="center"
            width={250}
            render={(_, record) => (
              <Space size="middle">
                <Tooltip placement="top" title="Sửa" color="blue">
                  <Button
                    key={record.key}
                    type="primary"
                    size="small"
                    onClick={() => this.props.editManu(record)}
                  >
                    <BiEdit />
                  </Button>
                </Tooltip>
                <Tooltip placement="top" title="Xóa" color="red">
                  <Button
                    key={record.key}
                    type="primary"
                    danger
                    size="small"
                    onClick={() => this.props.openDeleteModal(record)}
                  >
                    <BiSolidTrash />
                  </Button>
                </Tooltip>
              </Space>
            )}
          ></Column>
        </Table>
      </div>
    );
  }
}

export default ListManufacturer;
