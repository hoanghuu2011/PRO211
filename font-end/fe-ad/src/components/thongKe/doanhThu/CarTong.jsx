import React from "react";
import { Card, Col, Row, Space, Statistic } from "antd";
const CarTong = (props) => {
  const { tong } = props;
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Card bordered={false}>
          <Statistic
            title="Tổng doanh thu"
            value={tong}
            precision={2}
            suffix="VND"
          />
        </Card>
      </Col>
    </Row>
  );
};
export default CarTong;
