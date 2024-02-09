import React, { useState, useEffect } from "react";
import "../../css/loc.css";
import pickup from "../../image/pickup.svg";
import station from "../../image/station.svg";
import { Tabs, Col, Drawer, Row, Pagination, Result, Button, message } from "antd"; // Import Tabs from Ant Design
import DatVeForm from "../datVe2/DatVeForm";
import { connect } from "react-redux";
import withRouter from "../../helpers/withRouter";
import {
  listSearchOneWay,
  listSearchReturn,
  loadDataField,
} from "../../redux/actions/actionSearch";
import Boloc from "./boloc";
import { format, parseISO } from "date-fns";
import viLocale from "date-fns/locale/vi";
import SearchService from "../../services/SearchService";

const { TabPane } = Tabs; 
function SeatSelection2(props) {
  const [selectedChuyenTab1, setSelectedChuyenTab1] = useState(null);
  const [selectedChuyenTab2, setSelectedChuyenTab2] = useState(null);
  const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);
  const [currentTrip, setCurrentTrip] = useState(null);
  const [selectedTab, setSelectedTab] = useState("ngayDi");
  const [newListChuyen, setNewListChuyen] = useState([]);
  const [newListChuyen2, setNewListChuyen2] = useState([]);

  const queryParams = new URLSearchParams(window.location.search);
  const ngayDi = queryParams.get("ngayDi");
  const ngayVe = queryParams.get("ngayVe");
  const diemDi = queryParams.get("startLocation2");
  const diemDen = queryParams.get("endLocation2");
  const onClose = () => {
    setIsSeatModalOpen(false);
    setSelectedChuyenTab1(null);
    setSelectedChuyenTab2(null);
  };

  const areBothChuyensSelected = () => {
    return selectedChuyenTab1 !== null && selectedChuyenTab2 !== null;
  };

  const handleSeatModal = (data) => {
    setCurrentTrip();
    setIsSeatModalOpen(true);

    if (selectedTab === "ngayDi") {
      setSelectedChuyenTab1(data);
    } else if (selectedTab === "ngayVe") {
      setSelectedChuyenTab2(data);
    }
  };

  const { listChuyenReturn1, listChuyenReturn2, listTuyen } = props;
  const [currentPageTab1, setCurrentPageTab1] = useState(1);
const [currentPageTab2, setCurrentPageTab2] = useState(1);

  const [pageSizeTab1, setPageSizeTab1] = useState(3);

  const [pageSizeTab2, setPageSizeTab2] = useState(3);

  const getCurrentPageDataNgayDi = async () => {
    const startIndex = (currentPageTab1 - 1) * pageSizeTab1;
    const endIndex = startIndex + pageSizeTab1;
    const newList = await Promise.all(
      listChuyenReturn1.map(async (i) => {
        const tuyen = listTuyen.find((t) => i.tuyenXe === t.maTuyenXe);
        const soGheTrong = await loadGhe(i, ngayDi);

        return {
          ...i,
          tuyenXe: tuyen,
          soGheTrong: soGheTrong,
        };
      })
    );
    console.log(newList);
    return newList.slice(startIndex, endIndex);
  };

  const getCurrentPageDataNgayVe = async () => {
    const startIndex = (currentPageTab2 - 1) * pageSizeTab2;
    const endIndex = startIndex + pageSizeTab2;
    const newList = await Promise.all(
      listChuyenReturn2.map(async (i) => {
        const tuyen = listTuyen.find((t) => i.tuyenXe === t.maTuyenXe);
        const soGheTrong = await loadGhe(i, ngayVe);
        return {
          ...i,
          tuyenXe: tuyen,
          soGheTrong: soGheTrong,
        };
      })
    );
    return newList.slice(startIndex, endIndex);
  };

  function formatCurrency(value) {
    return value
      ? value.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      : "---";
  }

  const formattedNgayDi = ngayDi
    ? format(parseISO(ngayDi), "dd-MM", { locale: viLocale })
    : "";
  const dayOfWeek = ngayDi
    ? format(parseISO(ngayDi), "EEEE", { locale: viLocale })
    : "";

  const formattedNgayVe = ngayVe
    ? format(parseISO(ngayVe), "dd-MM", { locale: viLocale })
    : "";
  const dayOfWeek2 = ngayVe
    ? format(parseISO(ngayVe), "EEEE", { locale: viLocale })
    : "";

  useEffect(() => {
    if (areBothChuyensSelected()) {
      setIsSeatModalOpen(true);
    } else {
      const targetTab = selectedTab === "ngayDi" ? "ngayVe" : "ngayDi";
      setSelectedTab(targetTab);
    }
  }, [selectedChuyenTab1, selectedChuyenTab2]);

  const loadGhe = async (chuyen, ngay) => {
    console.log(chuyen);
    const data = { id: chuyen.maChuyen, ngayDi: ngay };
    const service = new SearchService();
    const res = await service.loadGhe(data);
    const resXe = await service.loadSoGhe(chuyen.xe);

    const ghe = resXe.data;
    const daDat = res.data;

    const soGheTrong = ghe - daDat.length;
    return soGheTrong;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCurrentPageDataNgayDi();
      setNewListChuyen(data);
    };

    const fetchData2 = async () => {
      const data2 = await getCurrentPageDataNgayVe();
      setNewListChuyen2(data2);
    };

    fetchData();
    fetchData2();
  }, [ngayDi, ngayVe, listChuyenReturn1, listChuyenReturn2, listTuyen,currentPageTab1,currentPageTab2]);
console.log("dữ liệu chuyến đi 1" , currentPageTab1 )
  return (
    <div className="grid-listtuyen-container-loc">
      <Boloc />

      <Tabs
        activeKey={selectedTab}
        onChange={(tab) => setSelectedTab(tab)}
        className="TabKhuhoi"
        defaultActiveKey="ngayDi"
      >
        <TabPane
          tab={`Chuyến Đi - ${dayOfWeek}, ${formattedNgayDi}`}
          key="ngayDi"
        >
          <div className="hiddentext4">
            <span>
              {diemDi} - {diemDen} ({listChuyenReturn1.length})
            </span>
          </div>

          {listChuyenReturn1.length === 0 && (
            <Result
              status="404"
              title="Rất tiếc, MaiLinhTour không tìm thấy kết quả cho bạn"
              subTitle="Không có chuyến đi nào được tìm thấy."
              extra={<Button type="primary">Quay lại trang chủ</Button>}
              className="listtuyen-404-2"
            />
          )}

          {newListChuyen.map((item, index) => (
            <Row className="custom-container-loc1" key={item.maChuyen}>
              <div>
                <div className="chuyenxe-loc" style={{ marginTop: "-0.5cm" }}>
                  <div className="info-container-loc">
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
                        . . . . . . . . . . . . . . . . . . . . . . . . .
                      </span>
                      <img src={station} alt="station" />
                    </div>
                    <span className="arrival-time">{item.tuyenXe.tgDen}</span>
                  </div>
                  <div className="location-info">
                    <div className="location">
                      <span className="location-name">
                        {item.tuyenXe.diemDi}
                      </span>
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
                  <div className="availability-info">
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
                        <span  onClick={() => {
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
                  </div>
                </div>
              </div>
            </Row>
          ))}
          {listChuyenReturn1.length > 0 ? (
            <div className="pagesizeloc2">
              <Pagination
                current={currentPageTab1}
                total={listChuyenReturn1.length}
                pageSize={pageSizeTab1}
                onChange={(page) =>

                setCurrentPageTab1(page)}
              />
            </div>
          ) : null}
        </TabPane>

        <TabPane
          tab={`Chuyến Về - ${dayOfWeek2}, ${formattedNgayVe}`}
          key="ngayVe"
        >
          <div className="hiddentext4">
            <span>
            {diemDen} - {diemDi} ({listChuyenReturn2.length})
            </span>
          </div>

          {listChuyenReturn2.length === 0 && (
            <Result
              status="404"
              title="Rất tiếc, MaiLinhTour không tìm thấy kết quả cho bạn"
              subTitle="Không có chuyến đi nào được tìm thấy."
              extra={<Button type="primary">Quay lại trang chủ</Button>}
              className="listtuyen-404-2"
            />
          )}
          {newListChuyen2.map((item, index) => (
            <Row className="custom-container-loc1" key={item.maChuyen}>
              <div>
                <div className="chuyenxe-loc" style={{ marginTop: "-0.5cm" }}>
                  <div className="info-container-loc">
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
                        . . . . . . . . . . . . . . . . . . . . . . . . .
                      </span>
                      <img src={station} alt="station" />
                    </div>
                    <span className="arrival-time">{item.tuyenXe.tgDen}</span>
                  </div>
                  <div className="location-info">
                    <div className="location">
                      <span className="location-name">
                      {item.tuyenXe.diemDi}


                      </span>
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
                  <div className="availability-info">
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
                        <span     onClick={() => {
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
                  </div>
                </div>
              </div>
            </Row>
          ))}
          {listChuyenReturn2.length > 0 ? (
            <div className="pagesizeloc2">
              <Pagination
                current={currentPageTab2}
                total={listChuyenReturn2.length}
                pageSize={pageSizeTab2}
                onChange={(page) => setCurrentPageTab2(page)}
              />
            </div>
          ) : null}
        </TabPane>
      </Tabs>

      {areBothChuyensSelected() && (
        <Drawer
          title="Đặt vé xe"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={isSeatModalOpen}
          key={currentTrip}
          size="large"
        >
          <DatVeForm
            chuyenTab1={selectedChuyenTab1}
            chuyenTab2={selectedChuyenTab2}
            onClose={onClose}
          />
        </Drawer>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  listChuyenReturn1: state.SearchReducer.listChuyenReturn1,
  listChuyenReturn2: state.SearchReducer.listChuyenReturn2,
  ngayDi: state.SearchReducer.ngayDi,
  ngayVe: state.SearchReducer.ngayVe,
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
)(withRouter(SeatSelection2));
