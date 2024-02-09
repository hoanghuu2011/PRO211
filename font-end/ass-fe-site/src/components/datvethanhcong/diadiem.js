import React, { useEffect, useState } from 'react';
import './dvtc.css';
import { useParams } from 'react-router-dom';
import OrderhistoryService from '../../services/OrderhistoryService';
import SearchService from '../../services/SearchService';

const Diadiem = (props) => {
  const { id } = useParams();
  const { listData } = props;
  const [data2, setData2] = useState(null);
  const [tuyenXeInfodon, setTuyenXeInfonoidon] = useState('');
  const [tuyenXeInfotgDi, setTuyenXeInfotgDi] = useState('');
  const [tuyenXeInfotgDen, setTuyenXeInfotgDen] = useState('');
  const [tuyenXeInfoNoiTra, setTuyenXeInfoNoiTra] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const service = new OrderhistoryService();
        const res = await service.ByMaThanhToan(id);
        res && res.data && setData2(res.data);

        const service1 = new SearchService();
        const tuyenRes = await service1.loadDataTuyen();
        const listTuyen = tuyenRes.data;
        const tuyenXe = res.data.chuyenXe && res.data.chuyenXe.tuyenXe;
        const tuyenXeInfodon = layThongTinnoidon(tuyenXe, listTuyen);
        const tuyenXeInfotgDi = layThongTintgDon(tuyenXe, listTuyen);
        const tuyenXeInfotgDen = layThongTintgTra(tuyenXe, listTuyen);
       
        setTuyenXeInfonoidon(tuyenXeInfodon);
        setTuyenXeInfotgDi(tuyenXeInfotgDi);
        setTuyenXeInfotgDen(tuyenXeInfotgDen);
      
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const layThongTinnoidon = (maTuyenXe, listTuyen) => {
    const tuyenXe = listTuyen.find((t) => t.maTuyenXe === maTuyenXe);

    if (tuyenXe) {
      return `${tuyenXe.noiDon}`;
    }

    return '';
  };

  const layThongTintgDon = (maTuyenXe, listTuyen) => {
    const tuyenXe = listTuyen.find((t) => t.maTuyenXe === maTuyenXe);

    if (tuyenXe) {
      return `${tuyenXe.tgDi}`;
    }

    return '';
  };

  const layThongTintgTra = (maTuyenXe, listTuyen) => {
    const tuyenXe = listTuyen.find((t) => t.maTuyenXe === maTuyenXe);

    if (tuyenXe) {
      return `${tuyenXe.tgDen}`;
    }

    return '';
  };

 

  return (
    <>
      <div className="điemtra-dv" style={{ width: '700px', marginLeft: '4.6cm' }}>
        <div className="page-title-dv" style={{ textAlign: 'justify', marginLeft: '-0.2cm' }}>
          Điểm đón
        </div>
        <div className="" style={{ width: '140px', marginLeft: '-0.2cm', marginTop: '10px', textAlign: 'justify' }}>
          {tuyenXeInfodon}
        </div>
        <div className="" style={{ textAlign: 'justify', marginLeft: '-0.3cm', fontSize: '11px', marginBottom: '10px', marginTop: '10px' }}></div>
        <a
          href="https://www.google.com/maps/search/?api=1&amp;query=16.0565364,108.1725454"
          target="_blank"
          className="StyledComponents__Link-sc-1fcpe3g-12 eomUrd"
          style={{ marginLeft: '-17cm', textAlign: 'justify' }}
        >
          Xem bản đồ
        </a>
        <div className="" style={{ marginTop: '14px', marginLeft: '-0.3cm' }}>
          <p style={{ width: '200px', textAlign: 'justify' }}>Đón lúc: <strong>{tuyenXeInfotgDi} </strong></p>
        </div>
      </div>

      <div className="điemtra-dv" style={{ width: '700px', marginLeft: '4.6cm' }}>
        <div className="page-title-dv" style={{ textAlign: 'justify', marginLeft: '-0.2cm' }}>
          Điểm trả
        </div>
        <div className="" style={{ width: '140px', marginLeft: '-0.2cm', marginTop: '10px', textAlign: 'justify' }}>
        {data2 && data2.noiTra}
        </div>
        <div
          className=""
          style={{ width: '280px', marginLeft: '-1cm', fontSize: '11px', marginBottom: '10px', marginTop: '10px' }}
        ></div>
        <a
          href="https://www.google.com/maps/search/?api=1&amp;query=14.6028953,108.2911189"
          target="_blank"
          className="StyledComponents__Link-sc-1fcpe3g-12 eomUrd"
          style={{ marginLeft: '-17cm' }}
        >
          Xem bản đồ
        </a>
        <div className="StyledComponents__Content-sc-1fcpe3g-10 bQzlse" style={{ marginTop: '14px', marginLeft: '-0.3cm' }}>
          <p style={{ width: '200px', textAlign: 'justify' }}>Trả lúc: <strong>{tuyenXeInfotgDen}</strong></p>
        </div>
      </div>
    </>
  );
};

export default Diadiem;
