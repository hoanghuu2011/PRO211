import Column from "antd/es/table/Column";
import React, { Component } from "react";
// import ProductService from "../../services/ProductService";
import { Card, Col, Divider, Image, Row, Space, Statistic, Table } from "antd";

export class ListOrderDetail extends Component {
  render() {
    const { odd } = this.props;
    console.log(odd);
    const quantity = odd && odd.choNgoi ? odd.choNgoi.length : 0;
    const data =
      odd && odd.choNgoi
        ? odd.choNgoi.map((i) => ({
            nguoiMua: odd.info.hoTen,
            sdt: odd.info.soDT,
            email: odd.email,
            choNgoi: i,
          }))
        : [];
    return (
      <>
        <Row gutter={16}>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Số lượng vé"
                value={quantity}
                valueStyle={{
                  color: "#3f8600",
                }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Tổng tiền"
                value={odd.tongTien}
                valueStyle={{
                  color: "red",
                }}
                suffix="VND"
              />
            </Card>
          </Col>
        </Row>
        <Divider></Divider>
        {odd !== null ? (
          <Table dataSource={data} rowKey="id">
            <Column
              title="Người mua"
              key="nguoiMua"
              dataIndex="nguoiMua"
              align="center"
            ></Column>

            <Column
              title="Số điện thoại"
              key="sdt"
              dataIndex="sdt"
              align="center"
            ></Column>

            <Column
              title="Ngày đi"
              key="ngayDi"
              dataIndex="ngayDi"
              align="center"
            ></Column>

            <Column
              title="Vị trí ngồi"
              key="choNgoi"
              dataIndex="choNgoi"
              align="center"
            ></Column>
          </Table>
        ) : null}
      </>
    );
  }
}

export default ListOrderDetail;
