import React, { useState, useEffect } from "react";
import "../css/lichsumuave.css";
import { Button, Modal, Space, Table, Tooltip, Radio } from "antd";
import "antd/dist/antd.css";
import Menudangnhap from "../components/menudangnhap";
import OrderhistoryService from "../services/OrderhistoryService";
import { connect } from "react-redux";
import { orderhistory } from "../redux/actions/actionOrderhistory";
import withRouter from "../helpers/withRouter";
import Column from "antd/lib/table/Column";
import { BiSolidTrash } from "react-icons/bi";
import { toast } from "react-toastify";
import SearchService from "../services/SearchService";

function Lichsimuave(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const user = localStorage.getItem("username");
  const [isDeleting, setIsDeleting] = useState(false);
  const showModal = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);

    if (isChecked) {
      setLoading(true);
      await onConfirm(selectedRecord);
      setLoading(false);
    } else {
      toast.error('Vui lòng đồng ý chính sách hủy vé!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        backgroundColor: "#ff0000",
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onRadioChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const onConfirm = async (dataXoa) => {
    try {
      const service = new OrderhistoryService();
      await service.HuyVe(dataXoa.thanhToan);
  
      toast.success('Vé đã được hủy thành công!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  
    
      const service1 = new OrderhistoryService();
      const res = await service1.ListByAccount(user);
      const service2 = new SearchService();
      const tuyenRes = await service2.loadDataTuyen();
      const listTuyen = tuyenRes.data;

      const layThongTinTuyenXe = (chuyenXe) => {
        if (chuyenXe && chuyenXe.tuyenXe) {
          const maTuyenXe = chuyenXe.tuyenXe;
          const tuyenXe = listTuyen.find((t) => t.maTuyenXe === maTuyenXe);


          if (tuyenXe) {
            return `${tuyenXe.diemDi} - ${tuyenXe.diemDen} (${tuyenXe.tgDi})`;
          }
        }

        return "";
      };
      if (res.status === 200) {
        const newListData = res.data.map((i) => ({
          thanhToan: i.thanhToan.id,
          soLuong: i.soLuong,
          tongTien: i.tongTien,
          trangThai: i.thanhToan && i.thanhToan.status ? "Thành công" : "Không thành công",
          noiDung: layThongTinTuyenXe(i.chuyenXe),
          ngayDatVe: i.ngayDatVe,
        }));
  
        newListData.sort((a, b) => b.thanhToan - a.thanhToan);
  
        setData(newListData);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data || "";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          backgroundColor: "#ff0000",
        });
      }
    }
  };
  
  const loadData = async () => {
  
    setLoading(true);

    try {
      const service1 = new OrderhistoryService();
      const res = await service1.ListByAccount(user);

      if (res.status === 200) {
        // Xử lý dữ liệu và cập nhật state
        const newListData = res.data.map((i) => ({
          thanhToan: i.thanhToan.id,
          soLuong: i.soLuong,
          tongTien: i.tongTien,
          trangThai: i.thanhToan && i.thanhToan.status ? "Thành công" : "Không thành công",
          noiDung: layThongTinTuyenXe(i.chuyenXe),
          ngayDatVe: i.ngayDatVe,
        }));

        newListData.sort((a, b) => b.thanhToan - a.thanhToan);

        setData(newListData);
      }
    } catch (error) {
      // Xử lý lỗi nếu cần
    } finally {
      setLoading(false);
    }
  };

  const layThongTinTuyenXe = (chuyenXe) => {
    // Hàm lấy thông tin tuyến xe từ chuyến xe
    const service2 = new SearchService();
    const tuyenRes = service2.loadDataTuyen();
    const listTuyen = tuyenRes.data;

    if (chuyenXe && chuyenXe.tuyenXe) {
      const maTuyenXe = chuyenXe.tuyenXe;
      const tuyenXe = listTuyen.find((t) => t.maTuyenXe === maTuyenXe);

      if (tuyenXe) {
        return `${tuyenXe.diemDi} - ${tuyenXe.diemDen} (${tuyenXe.tgDi})`;
      }
    }

    return "";
  };

  const loadNewData = async () => {
    // Hàm load dữ liệu mới khi component được render hoặc có thay đổi
    setLoading(true);

    try {
      const service = new SearchService();
      const tuyenRes = await service.loadDataTuyen();
      const listTuyen = tuyenRes.data;

      const layThongTinTuyenXe = (chuyenXe) => {
        if (chuyenXe && chuyenXe.tuyenXe) {
          const maTuyenXe = chuyenXe.tuyenXe;
          const tuyenXe = listTuyen.find((t) => t.maTuyenXe === maTuyenXe);

          if (tuyenXe) {
            return `${tuyenXe.diemDi} - ${tuyenXe.diemDen} (${tuyenXe.tgDi})`;
          }
        }

        return "";
      };

      if (props.listData && props.listData.length > 0) {
        // Sử dụng dữ liệu từ Redux state nếu có
        const newListData = props.listData.map((i) => ({
          thanhToan: i.thanhToan.id,
          soLuong: i.soLuong,
          tongTien: i.tongTien,
          trangThai:
            i.thanhToan && i.thanhToan.status
              ? "Thành công"
              : "Không thành công",
          noiDung: layThongTinTuyenXe(i.chuyenXe),
          ngayDatVe: i.ngayDatVe,
        }));

        newListData.sort((a, b) => b.thanhToan - a.thanhToan);

        setData(newListData);
        setLoading(false);
      } else {
        // Gọi trực tiếp nếu không có dữ liệu trong Redux state
        const service1 = new OrderhistoryService();
        const res = await service1.ListByAccount(user);

        if (res.status === 200) {
          const newListData = res.data.map((i) => ({
            thanhToan: i.thanhToan.id,
            soLuong: i.soLuong,
            tongTien: i.tongTien,
            trangThai:
              i.thanhToan && i.thanhToan.status
                ? "Thành công"
                : "Không thành công",
            noiDung: layThongTinTuyenXe(i.chuyenXe),
            ngayDatVe: i.ngayDatVe,
          }));

          newListData.sort((a, b) => b.thanhToan - a.thanhToan);

          setData(newListData);
        }
      }
    } catch (error) {
      // Xử lý lỗi nếu cần
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const paginationConfig = {
    pageSize: pageSize,
    current: currentPage,
    total: data.length,
    showSizeChanger: false,
    showLessItems: true,
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };
  // Sử dụng useEffect để gọi action orderhistory khi component được render
  useEffect(() => {
    props.orderhistory(user);

    // Load dữ liệu mới dựa trên selectedDate
    loadNewData();
  }, [user]);

  return (
    <div className="border">
      <div className="" style={{ height: "600px" }}>
        <div className="mr-1 p-3 mr-0 p-0">
          <div className="grid grid-col-12 gap-0 gap-8">
            <Menudangnhap />
            <div
              className="col-span-9 mt-6"
              style={{ marginLeft: "12cm", marginTop: "1cm" }}
            >
              <div>
                <div
                  className="row"
                  style={{ height: "100px", display: "flex" }}
                >
                  <div className="col conten">
                    <h2
                      style={{
                        fontWeight: 500,
                        fontSize: "26px",
                        lineHeight: "31px",
                      }}
                    >
                      {" "}
                      Lịch sử mua vé
                    </h2>
                    <span>
                      Theo dõi và quản lý quá trình lịch sử mua vé của bạn
                    </span>
                  </div>
                </div>

                <div style={{ paddingTop: "25px" }}>
                  <Table
                    dataSource={data}
                    pagination={paginationConfig}
                    loading={loading}
                    onChange={handleTableChange}
                  >
                    <Column
                      title="Mã vé"
                      dataIndex="thanhToan"
                      key="thanhToan"
                      align="center"
                    ></Column>
                    <Column
                      title="Số lượng"
                      dataIndex="soLuong"
                      key="soLuong"
                      align="center"
                    ></Column>
                    <Column
                      title="Tổng tiền"
                      dataIndex="tongTien"
                      key="tongTien"
                      align="center"
                    ></Column>
                    <Column
                      title="Nội dung"
                      dataIndex="noiDung"
                      key="noiDung"
                      align="center"
                    ></Column>
                    <Column
                      title="Thời gian"
                      dataIndex="ngayDatVe"
                      key="ngayDatVe"
                      align="center"
                      render={(text, record) => (
                        <span>
                          {record.ngayDatVe ? formatDate(record.ngayDatVe) : ""}
                        </span>
                      )}
                    ></Column>
                    <Column
                      title="Action"
                      key="action"
                      align="center"
                      width={200}
                      render={(_, record) => (
                        <Space size="middle">
                          <Tooltip placement="top" title="Hủy vé" color="red">
                            <Button type="link" danger onClick={() => showModal(record)} style={{ marginLeft: '1.5cm' }}>
                              <BiSolidTrash size={24}></BiSolidTrash>
                            </Button>
                          </Tooltip>
                        </Space>
                      )}
                    ></Column>
                  </Table>

                  <Modal
                    title="Chính sách hủy vé"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okButtonProps={{ disabled: !isChecked }}
                  >
                    <div>
                      <p>Quý khách vui lòng lưu ý chính sách hủy vé của chúng tôi:</p>
                      <p>- Thời gian hủy vé: Từ 30 phút trở lại từ lúc đặt vé.</p>
                      <p>- Phí hủy vé: 10% giá vé.</p>
                      <p>Bạn có chắc chắn muốn hủy vé?</p>
                      <Radio
                      onClick={() => setIsChecked(!isChecked)}
                      checked={isChecked}
                      
                    >
                        Tôi đã đọc và đồng ý với điều khoản chính sách hủy vé
                      </Radio>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  listData: state.Oderhistory.listData,
});

const mapDispatchToProps = {
  orderhistory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Lichsimuave));
