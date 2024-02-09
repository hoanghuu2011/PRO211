import { Col, DatePicker, Row, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import muiten from "../../image/switch_location.svg";
import '../../css/routes.scss';

const MotChieu = (props) => {
  const queryParams = new URLSearchParams(window.location.search);
  const diemDiFromUrl = queryParams.get("diemDi");
  const diemDenFromUrl = queryParams.get("diemDen");

  const [defaultNgayDi, setDefaultNgayDi] = useState(moment());
  const [diemDiValue, setDiemDiValue] = useState(diemDiFromUrl);
  const [diemDenValue, setDiemDenValue] = useState(diemDenFromUrl);



  const disabledDate = (current) => {
    return current.isBefore(moment().startOf("day"));
  };

  const onChange = (value) => {
    setDefaultNgayDi(value);
    props.setNgayDi(value.format("YYYY-MM-DD"));
  };

  const onLocationChange = (value, type) => {
    if (type === "start") {
      setDiemDiValue(value);
      props.setStart(value);
    } else {
      setDiemDenValue(value);
      props.setEnd(value);
    }
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const data = props.data;
  useEffect(() => {
    if (diemDiValue) {
      setDiemDiValue(diemDiValue);
      props.setStart(diemDiValue);
    }
  
    if (diemDenValue) {
      setDiemDenValue(diemDenValue);
      props.setEnd(diemDenValue);
    }
    if(defaultNgayDi) {
      setDefaultNgayDi(defaultNgayDi);
      props.setNgayDi(defaultNgayDi.format("YYYY-MM-DD"));
    }

  }, []);
  
  return (
    <Row>
      <Col md={7}>
        <span>Điểm đi</span>
        <Select
          placeholder="Chọn điểm đi"
          defaultValue={diemDiValue}
          onChange={(value) => onLocationChange(value, "start")}
          filterOption={filterOption}
          options={data}
        />
      </Col>
      <Col md={2} className="location-image">
        <img src={muiten} alt="" className="image" style={{marginRight:'-0.4cm'}}/>
      </Col>
      <Col md={7}>
        <span>Điểm đến</span>
        <Select
          showSearch
          placeholder="Chọn điểm đến"
          defaultValue={diemDenValue}
          optionFilterProp="children"
          onChange={(value) => onLocationChange(value, "end")}
          filterOption={filterOption}
          options={data}
          style={{marginLeft:'-0.6cm'}}
        />
      </Col>
      <Col md={1}></Col>
      <Col md={7}>
        <span>Ngày đi</span>
        <Space direction="vertical">
          <DatePicker
            format="DD/MM/YYYY" 
            onChange={onChange}
            showTimeSelect
            timeFormat="HH:mm:ss"
            id="datepicker"
            disabledDate={disabledDate}
            picker="date"
            placeholder="Chọn thời gian đi"
            defaultValue={defaultNgayDi}
            style={{marginLeft:'-0.5cm'}}
          />
        </Space>
      </Col>
    </Row>
  );
};

export default MotChieu;
