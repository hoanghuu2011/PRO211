import React, { useEffect, useState } from "react";
import { Button, Col, Radio, Tabs, message } from "antd";
import "antd/dist/antd.css";
import MotChieu from "./MotChieu";
import KhuHoi from "./KhuHoi";
import { connect } from "react-redux";
import withRouter from "../../helpers/withRouter";
import { listSearchOneWay, listSearchReturn,  loadDataField } from "../../redux/actions/actionSearch";

function TimChuyen(props) {
 
  const [startDate, setStartDate] = useState(null);
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [startLocation2, setStartLocation2] = useState(null);
  const [endLocation2, setEndLocation2] = useState(null);
  const [selectedTab, setSelectedTab] = useState("1");
  const [ngayDi, setNgayDi] = useState(null);
  const [ngayVe, setNgayVe] = useState(null); 
  const { navigate } = props.router;

  const onClick = () => {
    if (selectedTab === "1") {
      if (!startLocation || !endLocation || !ngayDi) {
       
        message.error("Vui lòng chọn đủ thông tin một chiều trước khi tìm chuyến.");
        return;
      }

      props.listSearchOneWay(startLocation, endLocation, ngayDi, navigate);
      const query = `?ngayDi=${ngayDi}&startLocation=${startLocation}&endLocation=${endLocation}`;
      navigate(`/timchuyen/${query}`);
    }
    if (selectedTab === "2") {
      if (!startLocation2 || !endLocation2 || !ngayDi || !ngayVe) {
        // Hiển thị thông báo khi chưa chọn đủ thông tin
        message.error("Vui lòng chọn đủ thông tin khứ hồi trước khi tìm chuyến.");
        return;
      }

      props.listSearchReturn(startLocation2, endLocation2, ngayDi, ngayVe, navigate);
      const query = `?ngayDi=${ngayDi}&ngayVe=${ngayVe}&startLocation2=${startLocation2}&endLocation2=${endLocation2}`;
      navigate(`/timchuyen2/${query}`);
    }
   
  };

  const { fieldData } = props;
  const listData = fieldData.map((item) => ({
    label: item,
    value: item,
  }));

  const handleChange = (e) => {
    setSelectedTab(e.target.value);
  };

  const items = [
    {
      key: "1",
      label: (
        <Radio value="1" onChange={handleChange} checked={selectedTab === "1"} style={{ fontSize: '15px' }}>
          Một chiều
        </Radio>
      ),
      
      children: <MotChieu setStart={setStartLocation} setEnd={setEndLocation} setNgayDi={setNgayDi} data={listData} />,
    },
    {
      key: "2",
      label: (
        <Radio value="2" onChange={handleChange} checked={selectedTab === "2"} style={{ marginLeft: '-20px', fontSize: '15px' }}>
          Khứ hồi
        </Radio>
      ),
      children: <KhuHoi setStart={setStartLocation2} setEnd={setEndLocation2}  setNgayDi={setNgayDi} setNgayVe={setNgayVe} data={listData} />,
    },
  ];

  useEffect(() => {
    props.loadDataField();
  }, []);

  return (
    <Col className="timchuyen-ink-bar">
      <Tabs defaultActiveKey="1" items={items} />
      <Button className="tcx-button" onClick={onClick}>
        Tìm chuyến xe
      </Button>
    </Col>
  );
}

const mapStateToProps = (state) => ({
  fieldData: state.SearchReducer.fieldData,

});

const mapDispatchToProps = {
  loadDataField,
  listSearchOneWay,
  listSearchReturn

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TimChuyen));
