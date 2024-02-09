import React, { Component } from "react";
import { Button, Popconfirm, Space, Table, Tooltip } from "antd";
import Column from "antd/es/table/Column";
import { MdPreview } from "react-icons/md";
import { BiSolidTrash } from "react-icons/bi";
import moment from "moment"; 
export class OrderList extends Component {
  render() {
    const { od } = this.props;
    console.log(od);
    return (
      <>
        <Table dataSource={od} rowKey="maVe">
          <Column
            title="Mã vé"
            key="maVe"
            dataIndex="maVe"
            align="center"
          ></Column>

          <Column
            title="Ngày đặt vé"
            key="ngayDatVe"
            dataIndex="ngayDatVe"
            align="center"
          
          ></Column>

          <Column
            title="Người mua"
            key="info"
            dataIndex="info"
            align="center"
            render={(_, record) => (
              <label>{record && record.info ? record.info.hoTen : ""}</label>
            )}
          ></Column>

          <Column
            title="Số lượng vé"
            key="soLuong"
            dataIndex="soLuong"
            align="center"
          ></Column>

          <Column
            title="Mã khuyến mãi"
            key="khuyenMai"
            dataIndex="khuyenMai"
            align="center"
            render={(_, record) => (
              <label>
                {record && record.khuyenMai != null
                  ? record.khuyenMai.maKhuyenMai
                  : ""}
              </label>
            )}
          ></Column>

          <Column
            title="Tổng tiền"
            key="tongTien"
            dataIndex="tongTien"
            align="center"
          ></Column>

          <Column
            title="Action"
            key="action"
            align="center"
            width={200}
            render={(_, record) => (
              <Space size="middle">
                <Tooltip
                  placement="top"
                  title="View Order Detail"
                  color="green"
                >
                  <Button
                    key={record.key}
                    type="link"
                    size="small"
                    onClick={() => this.props.onGoDetail(record)} // Hiển thị chi tiết sản phẩm
                  >
                    <MdPreview color="green" size={24}></MdPreview>
                  </Button>
                </Tooltip>

             
              </Space>
            )}
          ></Column>
        </Table>
      </>
    );
  }
}

export default OrderList;
