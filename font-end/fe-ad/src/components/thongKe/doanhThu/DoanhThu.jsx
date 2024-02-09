import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/plots";
import { Card, Col, Divider, Row } from "antd";
import ThongKeService from "../../../services/ThongKeService";

const DoanhThu = (props) => {
  const { data } = props;

  const config = {
    data,
    xField: "type",
    yField: "sales",
    label: {
      position: "middle",

      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Số tiền",
      },
      sales: {
        alias: "Doanh thu",
      },
    },
  };
  return (
    <>
      <Card>
        <Row>
          <Col md={24}>
            <h1>Thống kê doanh thu theo năm</h1>
          </Col>

          <Col md={24}>
            <Column {...config} />
          </Col>
        </Row>
      </Card>
    </>
  );
};
export default DoanhThu;
