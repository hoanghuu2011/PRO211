import React, { Component, useEffect, useState } from 'react';
import '../css/lienhe.css';
import { FaEnvelope } from 'react-icons/fa';
import mt from '../image/dangnhap/muitenlienhe.svg';
import { AiFillCaretRight } from 'react-icons/ai';
import { BsFillCaretRightFill } from "react-icons/bs";
import email from'../image/dangnhap/mail_send.svg'
function ContactPage() {
  const [isContactDetailsVisible, setContactDetailsVisible] = useState(true);

  const toggleContactDetails = () => {
    setContactDetailsVisible((prevState) => !prevState);
  };

  useEffect(() => {
    document.title = 'Liên Hệ';

    return () => {
      document.title = 'Tiêu đề mặc định';
    };
  }, []);

  return (

    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-6">
          <div className="mb-3">
            <h1 className="display-5" style={{marginLeft:'-8cm'}}>Liên hệ với chúng tôi</h1>
          </div>
          <button
            className="btn btn-link toggle-button"
            type="button"
            onClick={toggleContactDetails}
          >
          <BsFillCaretRightFill /> Mai Linh Tour
          </button>
          <div className={`collapse ${isContactDetailsVisible ? 'show' : ''}`} id="contactDetails">
            <div className="mb-3-lienhe">
              <h5>CÔNG TY CỔ PHẦN XE KHÁCH PHƯƠNG TRANG
           - FUTA BUS LINES</h5>
              <p className="text-muted" style={{width:'349px'}}>
                Địa chỉ: <span className='lienhe-diachi'>Số 01 Tô Hiến Thành, Phường 3, Thành phố Đà Lạt, Tỉnh Lâm Đồng, Việt Nam</span> 
              </p>
              <p className="text-muted-lienhe">
                Website: <a href="http://localhost:3000/" style={{color:'black'}} target="_blank" rel="noreferrer">https://Mailinh</a>
              </p>
              <p className="text-muted-lienhe">Điện thoại: <a href="#">02838386852</a></p>
              <p className="text-muted-lienhe">Fax: <a href="#">02838386853</a></p>
              <p className="text-muted-lienhe">Email: <a href="#">hotro@mailinh.vn</a></p>
              <p className="text-muted-lienhe">Hotline: <a href="#">19006067</a></p>
            </div>
          </div>
        </div>
        <div className="col-lg-6"style={{marginTop:'-1cm'}}>
          <div className="mb-3">
           <img src={email} alt="" /> <span className='email-lienhe'>Gửi thông tin liên hệ đến chúng tôi</span>
          </div>
          <form className="custom-form" style={{width:'691px', height:'450px'}}>
          <br />
            <div className="form-group mb-3">
              <div className="col-md-6">
                <input type="text" className="form-control" placeholder="Mailinhtour" disabled style={{backgroundColor:'white'}} />
              </div>
              <div className="col-md-6">
                <input type="text" className="form-control" id="email"placeholder="Họ và tên" />
              </div>
            </div>
            <div className="form-group mb-3">
              <div className="col-md-6">
                <input type="email" className="form-control" id="email" placeholder="Email"/>
              </div>
              <div className="col-md-6">
                <input type="number" className="form-control" id="subject" placeholder="Điện thoại"/>
              </div>
             
            </div>
            <div className="mb-3">
            <input className="form-control" id="content" style={{ width:'620px', marginLeft:'0.4cm'}} placeholder="Nhập tiêu đề" />
          </div>
            <div className="mb-3">
              <textarea className="form-control" id="content" style={{ height: '120px', width:'620px', marginLeft:'0.4cm'}} placeholder="Nhập ghi chú" />
            </div>
            <button type="submit" className="btn btn-primary">
              Gửi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
