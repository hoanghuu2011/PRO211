import React from 'react';
import '../css/footer.css';

import Tdcpl from '../image//footer/Tdcpl (1).png';
import Adver from '../image//footer/_Mailinh_Advertising 1.png';
import facebook from '../image//footer/facebook.svg';
import salenoti from '../image//footer/logoSaleNoti.png';
import MLGH from '../image//footer/mailinhgiaohang.png';
import youtube from '../image//footer/youtube.svg';


function Footer() {
  return (
    <div>
    <div className="footer" >
    <div className="top-footer">
      <div className="left-footer">
        <div className="logo-footer">
          <div className="left-text-footer">
            <p className="h1-footer">
              TRUNG TÂM TỔNG ĐÀI & CSKH
            </p>
            <p className="h2"style={{marginLeft:'-2.6cm', marginTop:'-0.3cm'}}>
              1900 6067
            </p>
          </div>
          <div className="right-logo-footer">
            <img src={salenoti} alt="" width="160px" height="60px"style={{marginRight:'-2cm'}} />
          </div>
        </div>
        <div className="ten-footer"style={{marginTop:'-0.1cm',marginRight:'-1.3cm'}}>
          <span>CÔNG TY CỔ PHẦN XE KHÁCH Mai Linh Tour - FUTA BUS LINES</span>
        </div>
        <div className="dia-chi-footer">
          <span className="h1">
            Địa chỉ:
          </span>
          <span className="h2">
            137 Nguyễn Thị Thập, phường Hòa Minh, quận Liên Chiểu, TP Đà Nẵng
          </span>
        </div>
        <div className="email-footer">
          <span className="h1">Email:</span>
          <a className="h2" href="">caodang@fpt.edu.vn</a>
        </div>
        <div className="phone-footer">
          <div className="dien-thoai-footer">
            <span className="h1"style={{marginLeft:'4.5cm'}}>Điện thoại:</span>
            <a className="h2" href="">(024) 7300 1955</a>
          </div>
          <div className="fax-footer">
            <span className="h1">Fax:</span>
            <a className="h2" href="">02838386854</a>
          </div>
        </div>
        <div className="app-footer">
          <div className="text">
            KẾT NỐI CHÚNG TÔI
          </div>
          <div className="img" >
            <img src={facebook} alt="" style={{marginRight:'10px'}}/>
            <img src={youtube} alt="" />
          </div>
        </div>
      </div>

      <div className="right-footer">
        <div className="left-text">
          <div className="top-text">
            MAILINH Bus Lines
          </div>
          <div className="h1">
            <div className="boder"></div>
            <a href="#">Về chúng tôi</a>
          </div>
          <div className="h1">
            <div className="boder"></div>
            <a href="#">Lịch trình</a>
          </div>
          <div className="h1">
            <div className="boder"></div>
            <a href="#">Tuyển dụng</a>
          </div>
          <div className="h1">
            <div className="boder"></div>
            <a href="#">Tin tức & Sự kiện</a>
          </div>
          <div className="h1">
            <div className="boder"></div>
            <a href="#">Mạng lưới văn phòng</a>
          </div>
        </div>
        <div className="right-text">
          <div className="top-text">
            Hỗ trợ
          </div>
          <div className="h1">
            <div className="boder"></div>
            <a href="">Tra cứu thông tin đặt vé</a>
          </div>
          <div className="h1">
            <div className="boder"></div>
            <a href="#">Điều khoản sử dụng</a>
          </div>
          <div className="h1">
            <div className="boder"></div>
            <a href="#">Câu hỏi thường gặp</a>
          </div>
          <div className="h1">
            <div className="boder"></div>
            <a href="#">Hướng dẫn đặt vé trên Web</a>
          </div>
          <div className="h1">
            <div className="boder"></div>
            <a href="#">Hướng dẫn nạp tiền trên App</a>
          </div>
        </div>
      </div>
    </div>
    <div className="bottom-footer">
      <img src={Adver} alt="" width="264px" height="44px" style={{marginRight:'0.5cm'}}/>
      <img className="img-gh" src={MLGH} alt="" width="264px" height="44px"/>
      <img src={Tdcpl} alt="" width="264px" height="44px" />
    </div>
  </div>
  <div className="bottom-footer-2">
    <span>© 2023|Bản quyền thuộc về Công ty Cổ Phần Xe khách MAILINH - MAILINH Bus Lines 2023</span>
  </div>
  </div>
  );
}

export default Footer;
