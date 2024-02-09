import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col, Row } from "antd";
import CarTong from "../doanhThu/CarTong";
import VeTheoNam from "./VeTheoNam";
import VeQuy from "./VeQuy";
import ThongKeService from "../../../services/ThongKeService";

export const SoVe = (props) => {
  const [data, setData] = useState([]);
  const [quy, setQuy] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const service = new ThongKeService();
      const res = await service.getSoVe();
      const resQuy = await service.getSoVeQuy();
      if (res && res.data) {
        const list = res.data.map((i) => ({
          type: `Tháng ${i[0]}`,
          sales: i[1],
        }));
        setData(list);
      }

      resQuy && resQuy.data && setQuy(resQuy.data);
    };

    loadData();
  }, []);
  return (
    <>
      <Row>
        <Col md={24}>
          <VeTheoNam data={data} />
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          <VeQuy quy={quy} />
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SoVe);
