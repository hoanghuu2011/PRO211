import React, { useEffect, useState } from "react";
import { Row, Steps, Col, Divider, Button } from "antd";
import ChonCho from "./ChonCho";
import ChonDiemTra from "./ChonDiemTra";
import ThongTinForm from "./ThongTinForm";
import pickup from "../../image/pickup.svg";
import station from "../../image/station.svg";
import { SeatSelectionProvider } from "./SeatSelectionContext";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/vi";
import withRouter from "../../helpers/withRouter";

import {
  listSearchOneWay,
  listSearchReturn,
  loadDataField,
} from "../../redux/actions/actionSearch";
import PayService from "../../services/PayService";

import SearchService from "../../services/SearchService";

const DatVeForm = (props) => {
  const [steps, setSteps] = useState(0);
  const [choNgoi, setChoNgoi] = useState([]);
  const [choNgoi2, setChoNgoi2] = useState([]);
  const [soGhe1, setSoGhe1] = useState(0);
  const [soGhe2, setSoGhe2] = useState(0);
  const [disCho1, setDisCho1] = useState([]);
  const [disCho2, setDisCho2] = useState([]);
  const [noiTra, setNoiTra] = useState("");
  const [custom, setCustom] = useState(props.custom || "");
  const [chuyenTab1, setChuyenTab1] = useState(props.chuyenTab1);
  const [chuyenTab2, setChuyenTab2] = useState(props.chuyenTab2);
  console.log(chuyenTab1, props.chuyenTab1);
  console.log(chuyenTab2, props.chuyenTab2);
  const user = localStorage.getItem("username");
  const { navigate } = props.router;
  const [tongTien, setTongTien] = useState(0);

  const { ngayDi, ngayVe } = props;

  const onNext = (values) => {
    switch (steps) {
      case 0:
        setChoNgoi(values.ngayDi);
        setChoNgoi2(values.ngayVe);
        break;
      case 1:
        setNoiTra(values);
        console.log(values);
        break;
      default:
        break;
    }
    setSteps(steps + 1);
  };

  const updateCustom = (newCustom) => {
    setCustom(newCustom);
  };

  const onPrev = () => {
    setSteps(steps - 1);
  };

  const onClose = () => {
    props.onClose();
  };

  const handlePayment = async () => {
    const tongTien =
      chuyenTab1.tuyenXe.gia * choNgoi.length +
      chuyenTab2.tuyenXe.gia * choNgoi2.length;
    setTongTien(tongTien);

    const currentDate = moment();
    const formattedDate = currentDate.format("YYYY-MM-DD");

    if (custom.anhDaLuu) {
      const newCus = {
        hoTen: custom.hoTen,
        email: custom.email,
        soDT: custom.soDT,
      };
      setCustom(newCus);
    }

    const sl = choNgoi && choNgoi2 && choNgoi.length + choNgoi2.length;

    const newData = {
      chuyenXe: chuyenTab1,
      chuyenXeVe: chuyenTab2, // Thêm chuyenXeVe vào dữ liệu
      noiTra: noiTra,
      info: { ...custom, ngayDatVe: formattedDate },
      tongTien: tongTien,
      choNgoi: choNgoi,
      choNgoi2: choNgoi2,
      soLuong: sl,
      ngayDi: ngayDi,
      ngayVe: ngayVe,
    };

    console.log("Dữ liệu đi:", newData);

    const service = new PayService();
    const res = await service.creatpay(newData);

    try {
      if (res && res.data) {
        window.location.href = res.data;
      } else {
        console.error("URL thanh toán không khả dụng!");
      }
    } catch (error) {
      console.error("Lỗi khi gọi loadDataPay:", error);
    }
  };

  useEffect(() => {
    const loadGhe = async () => {
      const data = { id: chuyenTab1.maChuyen, ngayDi: ngayDi };
      const data2 = { id: chuyenTab2.maChuyen, ngayDi: ngayVe };
      const service = new SearchService();
      const res = await service.loadGhe(data);
      const res2 = await service.loadGhe2(data2);
      const resXe = await service.loadSoGhe(chuyenTab1.xe);
      const resXe2 = await service.loadSoGhe(chuyenTab2.xe);
      res && res.data && setDisCho1(res.data);
      res2 && res2.data && setDisCho2(res2.data);
      resXe && resXe.data && setSoGhe1(resXe.data);
      resXe2 && resXe2.data && setSoGhe2(resXe2.data);
    };

    loadGhe();
  }, [ngayDi, ngayVe, chuyenTab1.maChuyen, chuyenTab2.maChuyen]);
  return (
    <SeatSelectionProvider>
   
      <div className="info-container-loc" key={props.chuyenTab1.maChuyen}>
        <span className="departure-time">{props.chuyenTab1.tuyenXe.tgDi}</span>
        <img src={pickup} alt="pickup" />
        <span className="separator">
          {" "}
          . . . . . . . . . . . . . . . . . . . .{" "}
        </span>
        <span className="travel-duration" style={{ marginLeft: "-0.08cm" }}>
          <span style={{ marginLeft: "0.8cm" }}>20 giờ </span>
          <br />
          <span className="small-text">(Asian/Ho Chi Minh)</span>
        </span>
        <span className="separator">
          . . . . . . . . . . . . . . . . . . . . . . . . . .{" "}
        </span>
        <img src={station} alt="station" />
        <span className="arrival-time">{props.chuyenTab1.tuyenXe.tgDen}</span>
      </div>
    
     
      <div className="info-container-loc" key={props.chuyenTab2.maChuyen}>
        <span className="departure-time">{props.chuyenTab2.tuyenXe.tgDi}</span>
        <img src={pickup} alt="pickup" />
        <span className="separator">
          {" "}
          . . . . . . . . . . . . . . . . . . . .{" "}
        </span>
        <span className="travel-duration" style={{ marginLeft: "-0.08cm" }}>
          <span style={{ marginLeft: "0.8cm" }}>20 giờ </span>
          <br />
          <span className="small-text">(Asian/Ho Chi Minh)</span>
        </span>
        <span className="separator">
          . . . . . . . . . . . . . . . . . . . . . . . . . .{" "}
        </span>
        <img src={station} alt="station" />
        <span className="arrival-time">{props.chuyenTab2.tuyenXe.tgDen}</span>
      </div>
    
      <Row>
        <Col md={24}>
          <Steps
            current={steps}
            items={[
              {
                title: "Chỗ mong muốn",
              },
              {
                title: "Điểm đón trả",
              },
              {
                title: "Nhập thông tin",
              },
            ]}
          />
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          {steps === 0 && (
            <ChonCho
              onClose={onClose}
              onNext={onNext}
              soGhe1={soGhe1}
              soGhe2={soGhe2}
              disCho1={disCho1}
              disCho2={disCho2}
            />
          )}
          {steps === 1 && (
            <ChonDiemTra
              chuyen={props.chuyenTab1 || props.chuyenTab2}
              onNext={onNext}
              onPrev={onPrev}
            />
          )}
          {steps === 2 && (
            <ThongTinForm custom={custom} updateCustom={updateCustom} />
          )}
        </Col>
      </Row>

      <Row style={{ float: "right" }}>
        {steps === 2 && (
          <Button type="primary" onClick={handlePayment}>
            Thanh toán
          </Button>
        )}
        {steps === 2 && (
          <Button
            type="primary"
            style={{ margin: "0 8px" }}
            onClick={() => onPrev()}
          >
            Trở lại
          </Button>
        )}
        {steps === 2 && (
          <Button type="primary" style={{ margin: "0 8px" }} onClick={onClose}>
            Hủy
          </Button>
        )}
      </Row>
    </SeatSelectionProvider>
  );
};

const mapStateToProps = (state) => ({
  listChuyen: state.SearchReducer.listChuyen,
  ngayDi: state.SearchReducer.ngayDi,
  ngayVe: state.SearchReducer.ngayVe,
  custom: state.CustomReducer.custom,
  listChuyenReturn1: state.SearchReducer.listChuyenReturn1,
  listChuyenReturn2: state.SearchReducer.listChuyenReturn2,
  fieldData: state.SearchReducer.fieldData,
  listData: state.Oderhistory.listData,
  loadData: state.PayReducer.loadData,
});

const mapDispatchToProps = {
  listSearchOneWay,
  listSearchReturn,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DatVeForm));
