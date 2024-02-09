import React,{ useEffect, useState } from 'react';
import { connect } from 'react-redux';
import withRouter from '../../helpers/withRouter';
import { useParams } from 'react-router-dom';
import OrderhistoryService from '../../services/OrderhistoryService';

function Titledvtc (props)  {
  const { id } = useParams();
  const { listData } = props;
  const [data2, setData2] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
     
      try {
        const service = new OrderhistoryService();
        const res = await service.ByMaThanhToan(id);
        res && res.data && setData2(res.data);
    
      } catch (error) {
        console.log(error);
      }
    };
 
    fetchData();
  }, [id]);

  
console.log(data2);
  return (
   <article className="datvethanhcong">
   <div className="card-body" style={{ marginLeft: '4cm' }}>
     <div className="page-title-dv" style={{marginBottom:'10px', marginLeft:'-0.7cm'}}>{data2 && data2.thanhToan.status  ? 'Đặt chỗ Thành công' : 'Đặt chỗ Thất bại'}</div>
     <div className="content">
       <div className="notification-dvtc" style={{ width: '637px', marginLeft:'-1.6cm' }}>
         <span style={{width:'650px', textAlign:'justify', marginLeft:'20px'}}>
          
           Thông tin chuyến đi đã được gửi đến <strong >{data2 && data2.info.email}</strong>, bạn hãy kiểm tra nhé!
         </span>
       </div>
       <div className="subtitle" style={{ color: '#484848', marginTop: '10px', fontWeight: 700, lineHeight: '24px', width:'100px', marginLeft:'-0.3cm'}}>
         Thông tin vé
       </div>
       <div className="subtitle" style={{ marginTop: '10px',width:'100px', marginLeft:'-0.5cm'}}>
         Biển số xe
       </div>
       <div style={{ position: 'relative', marginTop: '5px', width:'120px',  marginLeft:'-0.1cm' }}>
         <button type="button" className="subtitle-bien">
         {data2 && data2.chuyenXe.xedto.bienSoXe}
         </button>
       </div>

       <div className="subtitle" style={{ marginTop: '10px',width:'100px' , marginLeft:'-0.3cm'}}>
         Số điện thoại
       </div>
       <div className="list-contact" style={{ position: 'static' }}>
         <div>
         {data2 && data2.chuyenXe && data2.chuyenXe.nhanViens && data2.chuyenXe.nhanViens.length > 0 && (
          <div>
            <div className="list-contact" style={{ position: 'static' }}>
              {data2.chuyenXe.nhanViens.map((nhanVien, index) => (
                <div key={index}>
                  <div className="phone-number" style={{ marginBottom: '-20px', width: '70px', marginLeft: '-0.35cm', fontWeight: 'bold' }}>
                    Tài xế {index + 1}:
                  </div>
                  <div className="phone-number" style={{ marginLeft: '5cm', width: '300px', textAlign:'justify' }}>
                    <a href={`tel:${nhanVien.sdt}`}>
                      <img src="https://229a2c9fe669f7b.cmccloud.com.vn/svgIcon/phone.svg" width="16px" height="16px" alt="phone icon" style={{ marginRight:'5px'}} />
                   
                      {nhanVien.sdt}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
    
         </div>
         <div>
           <div className="phone-number" style={{width:'60px',marginLeft:'-0.2cm', marginBottom: '-20px',  fontWeight:'bold'}}>Hotline:</div>
           <div className="phone-number" style={{ marginLeft: '5.1cm', width: '300px', textAlign:'justify' }}>
             <a href="tel:0949839839">
               <img src="https://229a2c9fe669f7b.cmccloud.com.vn/svgIcon/phone.svg" width="16px" height="16px" alt="phone icon" style={{ marginRight:'5px'}}/>
               0949 839 839
             </a>
           </div>
         </div>
         <br />
         <div className="subtitle" style={{ width: '637px', fontSize: '14px', fontWeight:'500',lineHeight:'21px',textAlign: 'justify'}}>
         <b>Lưu ý:</b> Mọi thông tin về chuyến đi (bao gồm biển số xe, số điện thoại tài xế,...) sẽ được Vexere thông báo đến quý khách qua
         email ngay sau khi nhà xe cập nhật thông tin. Thông thường nhà xe sẽ cập nhật thông tin này trễ nhất 15-30 phút trước giờ khởi hành tùy thuộc vào kế hoạch của nhà xe.
         </div>
        
          <div className="subtitle" style={{  width: '637px', fontSize: '14px', fontWeight:'500',lineHeight:'21px',textAlign: 'justify' }}>Nếu gặp vấn đề khi ra xe, quý khách vui lòng liên hệ theo số Hotline nhà xe.</div>
       </div>
     </div>
   </div>
 </article>
  );
};


const mapStateToProps = (state) => ({
  custom: state.CustomReducer.custom,
});

export default connect(mapStateToProps)(withRouter(Titledvtc));
