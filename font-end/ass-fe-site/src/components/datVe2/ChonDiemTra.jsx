import { Button, Col, Divider, Radio, Row, Space } from "antd";
import React, { useState } from "react";
import { useSeatSelection } from "./SeatSelectionContext";
import { listSearchOneWay,listSearchReturn,loadDataField } from "../../redux/actions/actionSearch";
import { connect } from "react-redux";
import withRouter from "../../helpers/withRouter";
const ChonDiemTra = (props) => {
  const [value, setValue] = useState(1);
  const { selectedSeats } = useSeatSelection();
  const {chuyen} = props;
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const onNext = ()=>{
    props.onNext(value);
  }
  return (
    <>
      <Row  key={chuyen.maChuyen}>
        <Col style={{ marginTop: "3%" }} md={11}>
          <h4>Điểm đón</h4>
          <Divider></Divider>
          <Radio checked="true">
            <div>{chuyen.tuyenXe.noiDon}</div>
          </Radio>
        </Col>
        <Col md={1}>
          <Divider type="vertical" />
        </Col>
        <Col style={{ marginTop: "3%" }} md={12}>
          <h4>Điểm trả</h4>
          <Divider />
          <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            {chuyen.tuyenXe.noiTras.map((noiTraItem) => (
              <Radio key={noiTraItem.id} value={noiTraItem.noiTra}>
                {noiTraItem.noiTra}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
        </Col>
      </Row>
      <Row style={{ float: "right" }}>
  
      <Button type="primary" onClick={() => onNext()}>
        Tiếp tục
      </Button>

      <Button type="primary" style={{ margin: "0 8px" }} onClick={()=>props.onPrev()}>
        Quay lại
      </Button>

  </Row>

    </>
  );
};
const mapStateToProps = (state) => ({
  listChuyen:state.SearchReducer.listChuyen,
  listChuyenReturn1:state.SearchReducer.listChuyenReturn1,
  listChuyenReturn2:state.SearchReducer.listChuyenReturn2,
  fieldData: state.SearchReducer.fieldData,
  
});

const mapDispatchToProps = {
  listSearchOneWay,
  listSearchReturn,
  loadDataField,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChonDiemTra));


