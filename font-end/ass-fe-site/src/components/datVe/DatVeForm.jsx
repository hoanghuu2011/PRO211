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
  const [noiTra, setNoiTra] = useState("");
  const [custom, setCustom] = useState(props.custom || "");
  const [disCho, setDisCho] = useState([]);
  const [soGhe, setSoGhe] = useState(0);

  const { chuyen, ngayDi } = props;

  const user = localStorage.getItem("username");
  const { navigate } = props.router;
  const [tongTien, setTongTien] = useState(0);
  const onNext = (values) => {
    switch (steps) {
      case 0:
        setChoNgoi(values);
        console.log(values);
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
    const { chuyen } = props;
    const tongTien = chuyen.tuyenXe.gia * choNgoi.length;
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

    const sl = choNgoi && choNgoi.length;

    // Tạo đối tượng chứa thông tin đặt vé
    const newData = {
      chuyenXe: chuyen,
      noiTra: noiTra,
      info: { ...custom, ngayDatVe: formattedDate },
      tongTien: tongTien,
      choNgoi: choNgoi,
      soLuong: sl,
      ngayDi: ngayDi,
    };
    console.log("Dữ liệu đi:", newData);
    // Gọi API thanh toán
    const service = new PayService();
    const res = await service.creatpay(newData);

    try {
      if (res && res.data) {
          // Nếu có dữ liệu trả về từ API thanh toán, chuyển đến trang thanh toán
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
       // Tạo đối tượng data chứa thông tin cần gửi lên server để load danh sách ghế
      const data = { id: chuyen.maChuyen, ngayDi: ngayDi };
      console.log(data);
      const service = new SearchService();
      const res = await service.loadGhe(data);
      const resXe = await service.loadSoGhe(chuyen.xe);
      res && res.data && setDisCho(res.data);
      resXe && resXe.data && setSoGhe(resXe.data);
    };

    loadGhe();
  }, [ngayDi, chuyen.maChuyen]);

  return (
    <SeatSelectionProvider>
      <div className="info-container-loc" key={chuyen.maChuyen}>
        <div className="location-details">
          <span className="departure-time">{chuyen.tuyenXe.tgDi}</span>
          <img src={pickup} alt="pickup" />
          <span className="separator">
            {" "}
            . . . . . . . . . . . . . . . . . . . . . . . . . . . .{" "}
          </span>
          <span className="travel-duration" style={{ marginLeft: "-0.08cm" }}>
            <span style={{ marginLeft: "0.8cm" }}>20 giờ </span>
            <br />
            <span className="small-text">(Asian/Ho Chi Minh)</span>
          </span>
          <span className="separator">
            . . . . . . . . . . . . . . . . . . . . . . . . . . .{" "}
          </span>
          <img src={station} alt="station" />
          <span className="arrival-time">{chuyen.tuyenXe.tgDen}</span>
        </div>
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
              disList={disCho}
              soGhe={soGhe}
            />
          )}
          {steps === 1 && (
            <ChonDiemTra chuyen={chuyen} onNext={onNext} onPrev={onPrev} />
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
