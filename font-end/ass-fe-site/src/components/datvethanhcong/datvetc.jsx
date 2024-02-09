import React, { useEffect, useState } from 'react';
import './dvtc.css';
import { format } from 'date-fns';
import Diamdiem from './diadiem.js';
import Huongdan from './huongdandvtc.js';
import Titledvtc from './titledvtc.js';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import withRouter from '../../helpers/withRouter.js';
import OrderhistoryService from '../../services/OrderhistoryService.jsx';
import SearchService from '../../services/SearchService.jsx';
import { toast } from "react-toastify";
import { Modal, Button, message, Checkbox, Radio } from 'antd';

import { LoadingOutlined } from '@ant-design/icons';

function Datvethanhcong(props) {
  const { id } = useParams();
  const { listData } = props;
  const [data2, setData2] = useState(null);
  const [tuyenXeInfo, setTuyenXeInfo] = useState('');
  const [huyVeStatus, setHuyVeStatus] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [spinning, setSpinning] = useState(false);
  
  const { navigate } = props.router;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi service để lấy thông tin đơn hàng dựa trên id
        const service = new OrderhistoryService();
        const res = await service.ByMaThanhToan(id);

        // Nếu có dữ liệu, cập nhật state setData2 với dữ liệu mới

        res && res.data && setData2(res.data);
        // Lấy danh sách tuyến xe từ service1
        const service1 = new SearchService();
        const tuyenRes = await service1.loadDataTuyen();
        const listTuyen = tuyenRes.data;
        const tuyenXe = res.data.chuyenXe && res.data.chuyenXe.tuyenXe;
        const tuyenXeInfo = layThongTinTuyenXe(tuyenXe, listTuyen);

        setTuyenXeInfo(tuyenXeInfo);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const layThongTinTuyenXe = (maTuyenXe, listTuyen) => {

    // Tìm kiếm tuyến xe trong danh sách dựa vào mã tuyến xe
    const tuyenXe = listTuyen.find((t) => t.maTuyenXe === maTuyenXe);
    // trả về chuỗi thông tin địa điểm và thời gian đi
    if (tuyenXe) {
      return `${tuyenXe.diemDi} - ${tuyenXe.diemDen} (${tuyenXe.tgDi})`;
    }

    return '';
  };

  const handleHuyVe = async () => {
    try {
      const service = new OrderhistoryService();
      setSpinning(true); 
  
      await service.HuyVe(id);
      setHuyVeStatus(true);
  
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
  
      navigate("/");
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
    } finally {
      setSpinning(false); 
    }
  };
  
  const showConfirm = () => {
    setModalVisible(true);  
  };

  const handleModalOk = () => {
    if (isChecked) {
      handleHuyVe();
      setModalVisible(false);
    } else {
      message.warning('Bạn phải đồng ý với điều khoản chính sách hủy vé.');
    }
  };
  
  const handleModalCancel = () => {
    setModalVisible(false);
  };
  
 
  const isOkButtonDisabled = () => {
  
    return !isChecked;
  };
  return (
    <div className='pagedatvethanhcong'>
      <Titledvtc />
      <Huongdan />
      <Diamdiem />
      <div className="thongtinchuyendi" style={{ marginRight: '5cm', marginTop: '-21cm', width: '317px' }}>
        <article className="card ticket-info">
          <div className="card-header">
            <h5 className="card-title">Thông tin chuyến đi</h5>
          </div>
          <div className="card-body">
            <div className="info-row-dvtc">
              <div>MÃ ĐƠN HÀNG</div>
              <div>{id}</div>
            </div>
            <div className="info-row-dvtc">
              <div>HỌ TÊN</div>
              <div>{data2 && data2.info.hoTen}</div>
            </div>
            <div className="info-row-dvtc">
              <div>SỐ ĐIỆN THOẠI</div>
              <div>{data2 && data2.info.soDT}</div>
            </div>
            <div className="info-row-dvtc">
              <div>EMAIL</div>
              <div>{data2 && data2.info.email}</div>
            </div>
            <div className="info-row-dvtc">
              <div>NHÀ XE</div>
              <div>{data2 && data2.chuyenXe.xedto.nhaXe.tenNhaXe}</div>
            </div>
            <div className="info-row-dvtc">
              <div>TUYẾN ĐƯỜNG</div>
              <div>{tuyenXeInfo}</div>
            </div>
            <div className="info-row-dvtc">
              <div>LOẠI XE</div>
              <div>{data2 && data2.chuyenXe.xedto.loaiXe.tenLoai}</div>
            </div>
            <div className="info-row-dvtc">
              <div>Ngày Đi</div>
              <div>
              {data2 && data2.ngayDi && (
                format(new Date(data2.ngayDi), 'dd-MM-YYY')
              )}
            </div>
            </div>
            <div className="info-row-dvtc">
              <div>GHẾ Ngày Đi</div>
              <div>
                {data2 &&
                  data2.choNgoi &&
                  data2.choNgoi.map((ghe, index) => (
                    <span key={index}>
                      {ghe}
                      {index < data2.choNgoi.length - 1 && ', '}
                    </span>
                  ))}
              </div>
            </div>
            {data2 && data2.ngayVe && (
              <div className="info-row-dvtc">
                <div>Ngày Về</div>
                <div>
                {data2 && data2.ngayVe && (
                  format(new Date(data2.ngayVe), 'dd-MM-YYY')
                )}
              </div>
              </div>
            )}
            
            {data2 && data2.choNgoi2 && data2.choNgoi2.length > 0 && (
              <div className="info-row-dvtc">
                <div>GHẾ Ngày Về</div>
                <div>
                  {data2.choNgoi2.map((ghe, index) => (
                    <span key={index}>
                      {ghe}
                      {index < data2.choNgoi2.length - 1 && ', '}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </article>

        <article className="card transaction-info">
          <div className="card-header">
            <h5 className="card-title">Thông tin giao dịch</h5>
          </div>
          <div className="card-body">
            <section className="info-row-dvtc">
              <div>Phương thức thanh toán</div>
              <div>Online</div>
            </section>
            <section className="info-row-dvtc">
              <div>Ngày đặt</div>
              <div>{data2 && format(new Date(data2.thanhToan.payDate), 'dd/MM/yyyy')}</div>
            </section>
            <section className="info-row-dvtc">
              <div>Trạng thái</div>
              <div>{data2 && data2.thanhToan.status ? 'Thành công' : 'Thất bại'}</div>
            </section>
            <section className="info-row-dvtc">
              <div>Tổng tiền</div>

              <div style={{ textAlign: 'right', color: 'red' }}>   {data2 && new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data2.tongTien)}</div>


            </section>
            <section className="info-row-dvtc">
            <div>Hủy Vé</div>
            <Button type="danger" style={{marginTop:'20px'}} onClick={showConfirm} loading={spinning}
            icon={spinning ? <LoadingOutlined /> : null}>
            Hủy vé
          </Button>
          
          </section>
          
          </div>
        </article>
      </div>
      <Modal
      title="Chính sách hủy vé"
      visible={modalVisible}
      onOk={handleModalOk}
      onCancel={handleModalCancel}
      okButtonProps={{ disabled: isOkButtonDisabled() }} 
    >
      <div>
        <p>Quý khách vui lòng lưu ý chính sách hủy vé của chúng tôi:</p>
        <p>- Thời gian hủy vé: Từ 30 phút trở lại từ lúc đặt vé</p>
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

  );
};


export default (withRouter(Datvethanhcong));

