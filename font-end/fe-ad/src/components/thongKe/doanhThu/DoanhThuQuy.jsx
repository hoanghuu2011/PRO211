import React, { useState, useEffect } from "react";
import { Pie } from "@ant-design/plots";
import { Card, Col, Row } from "antd";

const DoanhThuQuy = (props) => {
  const { quy } = props;
  const data = [
    {
      type: "Quý 1",
      value: quy[0],
    },
    {
      type: "Quý 2",
      value: quy[1],
    },
    {
      type: "Quý 3",
      value: quy[2],
    },
    {
      type: "Quý 4",
      value: quy[3],
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 24,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return (
    <>
      <Card>
        <Row>
          <Col md={24}>
            <h1>Thống kê doanh thu theo quý</h1>
          </Col>

          <Col md={24}>
            <Pie {...config} />
          </Col>
        </Row>
      </Card>
    </>
  );
};
export default DoanhThuQuy;
