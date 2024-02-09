import React, { useState, useEffect } from "react";
import "../../css/loc.css";
import pickup from "../../image/pickup.svg";
import station from "../../image/station.svg";
import deleteicon from "../../image/trangchu/delete.svg";
import { Col, Drawer, Row, Pagination, Result, Button, message } from "antd";
import DatVeForm from "../datVe/DatVeForm";
import { connect } from "react-redux";
import withRouter from "../../helpers/withRouter";
import {
  listSearchOneWay,
  listSearchReturn,
  loadDataField,
} from "../../redux/actions/actionSearch";
import Boloc from "./boloc";
import SearchService from "../../services/SearchService";

function SeatSelection(props) {
  const queryParams = new URLSearchParams(window.location.search);
  const diemDi = queryParams.get("startLocation");
  const diemDen = queryParams.get("endLocation");
  const diemDi1 = queryParams.get("diemDi");
  const diemDen1 = queryParams.get("diemDen");
  const [selectedChuyen, setSelectedChuyen] = useState();
  const [newListChuyen, setNewListChuyen] = useState([]);
  const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);
  const [currentTrip, setCurrentTrip] = useState(null);


  const onClose = () => {
    setIsSeatModalOpen(false);
 
  };

  const handleSeatModal = (data) => {
    setCurrentTrip();
    setIsSeatModalOpen(true);
    setSelectedChuyen(data);
  };

  const { listChuyen, listTuyen, ngayDi } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const totalPages = Math.ceil(listChuyen.length / pageSize);

  function formatCurrency(value) {
    return value
      ? value.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      : "---";
  }
console.log("đaaaaaaa", listChuyen);
  const getCurrentPageData = async () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const newList = await Promise.all(
      listChuyen.map(async (i) => {
        const tuyen = listTuyen.find((t) => i.tuyenXe === t.maTuyenXe);
        const soGheTrong = await loadGhe(i, ngayDi);

        return {
          ...i,
          tuyenXe: tuyen,
          soGheTrong: soGheTrong,
        };
      })
    );
    
    return newList.slice(startIndex, endIndex);
  };

  const loadGhe = async (chuyen, ngay) => {
    console.log(chuyen);
    const data = { id: chuyen.maChuyen, ngayDi: ngay };
    const service = new SearchService();
    const res = await service.loadGhe(data);
    const resXe = await service.loadSoGhe(chuyen.xe);

    console.log(res, resXe);

    const ghe = resXe.data;
    const daDat = res.data;

    const soGheTrong = ghe - daDat.length;
    return soGheTrong;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCurrentPageData();
      setNewListChuyen(data);
    };

    fetchData();
  }, [currentPage, listChuyen, listTuyen, ngayDi,]);

  return (
    <div className="grid-listtuyen-container-loc">
      <Boloc />
      <div className="hiddentext">
        <span>
          {diemDi
            ? `${diemDi} - ${diemDen} (${listChuyen.length})`
            : `${diemDi1} - ${diemDen1} (${listChuyen.length})`}
        </span>
      </div>
      {listChuyen.length === 0 ? (
        <Result
          status="404"
          title="Rất tiếc, MaiLinhTour không tìm thấy kết quả cho bạn"
          subTitle="không có chuyến đi nào được tìm thấy."
          extra={<Button type="primary">Quay lại trang chủ</Button>}
          className="listtuyen-404"
        />
      ) : (
        newListChuyen.map((item, index) => (
          <Row className="custom-container-loc" key={item.maChuyen}>
            <Col>
              <div className="chuyenxe-loc">
                <Col span={24} className="info-container-loc">
                  <span className="departure-time">{item.tuyenXe.tgDi}</span>
                  <div className="location-details">
                    <img src={pickup} alt="pickup" />
                    <span className="separator">
                      {" "}
                      . . . . . . . . . . . . . . . . . . . . . . .
                    </span>
                    <span
                      className="travel-duration"
                      style={{ marginLeft: "-0.08cm" }}
                    >
                      <span style={{ marginLeft: "-0.3cm" }}>
                        {item.tuyenXe.tgDi}
                      </span>
                      <br />
                      <span className="small-text">(Asian/Ho Chi Minh)</span>
                    </span>
                    <span className="separator">
                      {" "}
                      . . . . . . . . . . . . . . . . . . . . . . .
                    </span>
                    <img src={station} alt="station" />
                  </div>
                  <span className="arrival-time">{item.tuyenXe.tgDen}</span>
                </Col>
                <div className="location-info">
                  <div className="location">
                    <span className="location-name">{item.tuyenXe.diemDi}</span>
                    <br />
                    <span className="location-info-text text-gray"></span>
                  </div>
                  <div className="location text-right">
                    <span className="location-name">
                      {item.tuyenXe.diemDen}
                    </span>
                    <br />
                    <span className="location-info-text text-gray"></span>
                  </div>
                 
                </div>
                <hr className="divider my-3" />
                <Col span={24} className="availability-info">
                  <div className="availability-details">
                    <span className="ticket-price text-orange">
                      {formatCurrency(item.tuyenXe.gia)}
                    </span>
                    <div className="availability-dot"></div>
                    <span className="seat-type" style={{width:'100px', textAlign:"justify"}}>{item.xedto.loaiXe.loaiGhe}</span>
                    <div className="availability-dot"></div>
                    <span className="seat-type" style={{textAlign:"justify",width:'100px', marginRight:'10px', marginLeft:'10px'}}>{item.xedto.loaiXe.tenLoai}</span>
                    <div className="availability-dot"></div>
                    <span
                      className="available-seats text-orange"
                      style={{ width: "200px", height:'30px' , textAlign:'justify', marginRight:'10px', marginLeft:'10px'}}
                    >
                      {item.soGheTrong > 0
                        ? `${item.soGheTrong} chỗ trống`
                        : "Hết ghế trống"}
                    </span>
                  
                    <span
                    className="btn-gialisttuyen"
                    style={{ color: "blue" , marginRight:"-4cm", textAlign:'justify'}}
                    onClick={() => {
                      if (item.soGheTrong > 0) {
                        handleSeatModal(item);
                      } else {
                        message.error("Vui lòng chọn chuyến khác chuyến này đã hết ghế.");
                      }
                    }}
                  >
                    chọn ghế
                  </span>
                
                 
              
                    <button type="button" className="custom-button">
                      <span onClick={() => {
                        if (item.soGheTrong > 0) {
                          handleSeatModal(item);
                        } else {
                          message.error("Vui lòng chọn chuyến khác chuyến này đã hết ghế.");
                        }
                      }}>
                        Chọn chuyến
                      </span>
                    </button>
                  </div>
                </Col>
              </div>
              {index === 0 && (
                <div className="pagesizeloc">
                  <Pagination
                    current={currentPage}
                    total={listChuyen.length}
                    pageSize={pageSize}
                    onChange={(page) => setCurrentPage(page)}
                  />
                </div>
              )}
            </Col>

            <Col span={24}>
              <Drawer
                title="Đặt vé xe"
                placement="right"
                closable={false}
                onClose={onClose}
                open={isSeatModalOpen}
                key={currentTrip}
                size="large"
              >
                <DatVeForm chuyen={selectedChuyen} onClose={onClose} />
              </Drawer>
            </Col>
          </Row>
        ))
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  listChuyen: state.SearchReducer.listChuyen,
  ngayDi: state.SearchReducer.ngayDi,
  listChuyenReturn1: state.SearchReducer.listChuyenReturn1,
  listChuyenReturn2: state.SearchReducer.listChuyenReturn2,
  listTuyen: state.SearchReducer.listTuyen,
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
)(withRouter(SeatSelection));
