import React,{ useEffect,useState } from 'react';
import '../css/lichtrinh.css';
import muiten from '../image/switch_location.svg';
import arrow from "../image/trangchu/ic_double_arrow.svg";
import withRouter from '../helpers/withRouter';
import { connect } from 'react-redux';
import moment from "moment";
import { listSearchByTuyen, loadDataTuyen,listSearchOneWay } from "../redux/actions/actionSearch";

function Lichtrinhpage(props) {
  const [defaultNgayDi, setDefaultNgayDi] = useState(moment().format("YYYY-MM-DD"));

  const {listTuyen} = props;
  const uniqueListTuyen = [];
  const diemDenSet = new Set();

  const { navigate } = props.router;
  const { listChuyen } = props;
  const onClick = (data) => {
    props.listSearchOneWay(data.diemDi, data.diemDen,defaultNgayDi);
  
    const query = `?diemDi=${data.diemDi}&diemDen=${data.diemDen}&ngayDi=${defaultNgayDi}`;
    navigate(`/timchuyen/${query}`);
  };

  listTuyen.forEach(item => {
    const key = `${item.diemDi}_${item.diemDen}`;
    
    if (!diemDenSet.has(key)) {
      diemDenSet.add(key);
      uniqueListTuyen.push(item);
    }
  });
  function formatCurrency(value) {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }

  useEffect(() => {
    props.loadDataTuyen();
  }, []);

  console.log(" load data linhtrinh", uniqueListTuyen);
  return (
    <div className="schedule-container-lt">
      <div className="info-header-search-lt">
        <div className="search-input-container-lt" style={{marginRight:'-0.05cm',marginLeft:'-0.5cm'}}>
          <input

            className="search-input"
            placeholder="Nhập điểm đi"
            style={{ width: '560px' }}
          />

        </div>
        <img className="location-image" src={muiten} alt="" />
        <div className="search-input-container-lt"style={{marginLeft:'-0.3cm'}}>
          <input

            className="search-input"
            placeholder="Nhập điểm đến"
            style={{ width: '560px' }}
          />
        </div>
      </div>

      <br />
      <div className="info-header">
        <div className="info-label" style={{marginLeft:'-1cm'}}>Tuyến xe</div>
        <div className="info-label"  style={{marginLeft:'3.5cm'}}>Loại xe</div>
        <div className="info-label" >Quãng đường</div>
        <div className="info-label" style={{marginRight:'-0.5cm'}}>Thời gian hành trình</div>
        <div className="info-label-gv" >Giá vé</div>
        <div className="info-label" ></div>
      </div>
      {uniqueListTuyen.reverse().map((item) =>
        ( 
          <div className="info-container" key={listTuyen}>
          <div className="info-row">
            <div className="info-value-kh" > <span style={{color:'#ff6f00' , fontWeight:'600', fontSize:'16px', width:'250px', wordWrap: 'break-word'}}>{item.diemDi}</span> <img src={arrow}  style={{marginRight:'5px', marginLeft:'5px'}}/>{item.diemDen}</div>
            <div className="info-value" style={{textAlign:'justify'}}>Giường</div>
            <div className="info-value"style={{textAlign:'justify'}}>639km</div>
            <div className="info-value"style={{textAlign:'justify'}}>11 giờ 30 phút</div>
            <div className="info-value" style={{color:'red'}}>{item.gia !== null && item.gia !== undefined ? formatCurrency(item.gia) : '---'}</div>
            <div className="info-value">
              <button className="search-button" onClick={()=>onClick(item)}>Tìm chuyến xe</button>
            </div>
          </div>
        </div>
      )
     )}
      

    </div>
  );
}



const mapStateToProps = (state) => ({
  listTuyen:state.SearchReducer.listTuyen,


});

const mapDispatchToProps = {
  loadDataTuyen,
  listSearchByTuyen,
  listSearchOneWay
};

export default connect(
  mapStateToProps,
  mapDispatchToProps

)(withRouter(Lichtrinhpage));
