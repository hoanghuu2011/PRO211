import React, { useState, useEffect } from 'react';
import '../css/navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '../image/Mailinhlogo.png';
import history from '../image/dangnhap/History.svg';
import address from '../image/dangnhap/Address.svg';
import pass from '../image/dangnhap/Password.svg';
import pro from '../image/dangnhap/Profile.svg';
import futa from '../image/dangnhap/futaPay.svg';
import log from '../image/dangnhap/Logout.svg';
import usericon from '../image/trangchu/usericon.svg';
import defaultAvatar from '../image/anhnobita.jpg';
import 'react-notifications/lib/notifications.css';
import { logout } from "../redux/actions/actionAccount";
import dropdown from '../image/dangnhap/dropdown-menu.svg';
import withRouter from '../helpers/withRouter';
import { connect } from "react-redux";
import UploadImage from './UploadImage';
import ImagesService from '../services/imageService';
import { Button } from 'antd';

function Navbar(props) {
 const { navigate } = props.router;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const user = localStorage.getItem("username");
  const hoTen = localStorage.getItem("hoTen");
  const anhDL = localStorage.getItem("anh");
  const { custom } = props;
  const storedImageUrl = localStorage.getItem("imageUrl");
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
  };
  const imageUrl = custom?.anhDaLuu?.tenTep
  ? ImagesService.getImageUrl(custom.anhDaLuu.tenTep)
  : null;

  useEffect(() => {
    if (imageUrl) {
      localStorage.setItem("imageUrl", imageUrl);
    }
  
    setIsDropdownOpen((custom.hoTen || user) !== null);
    setIsDropdownOpen((custom.hoTen || user) !== null);
    return () => {
      const activeNavLink = document.querySelector('#navbar li a.active');
      if (activeNavLink) {
        activeNavLink.classList.remove('active');
      }
    };
  }, [custom.hoTen, user,imageUrl]);
  return (
    <nav className="navbar-container">
      <ul id="navbar">
        <li className="logo">
          <img src={logo} alt="brand" />
        </li>

        <li>
          <NavLink to="/" activeClassName="active">
            Trang chủ
          </NavLink>
        </li>
        <li>
          <NavLink to="/lichtrinh" activeClassName="active">
            Lịch Trình
          </NavLink>
        </li>
        <li>
          <NavLink to="/tracuu" activeClassName="active">
            Tra Cứu Vé
          </NavLink>
        </li>
        <li>
          <NavLink to="/tintuc" activeClassName="active">
            Tin Tức
          </NavLink>
        </li>
        <li>
          <NavLink to="/lienhe" activeClassName="active">
            Liên Hệ
          </NavLink>
        </li>
        <li>
          <NavLink to="/vechungtoi" activeClassName="active">
            Về Chúng Tôi
          </NavLink>
        </li>
        <div className="dropdown-container"style={{marginTop:'-4cm', marginLeft:'-1cm'}}>
          {hoTen ? (
            <NavLink to="#" ClassName="text-btn-login-page" onClick={toggleDropdown} style={{color:'white'}}>
            {storedImageUrl ? (
              <img src={storedImageUrl} alt="Avatar" style={{ width: '50px', height: '45px', borderRadius: '50%', marginRight: '10px' }} />
            ) : (
              <img src={defaultAvatar} alt="Default Avatar" style={{ width: '50px', height: '45px', borderRadius: '50%', marginRight: '10px' }} />
            )}
              {hoTen}  <img src={dropdown} alt="" style={{ width: '26px', height: '26px', marginTop: '-5px' }}/>
          
            </NavLink>
          ) : (
            <Button className='btn-login-page'>
            <NavLink  to="/login"> 
            <img src={usericon}  style={{marginLeft:'-10px', marginRight:'5px'}}/>
            Đăng nhập/Đăng ký</NavLink>
             
            </Button>
          )}
          {isDropdownOpen && (
            <div className="dropdown">
              <NavLink exact to="/Mailinhpay">
                <img src={futa} alt="MAILINHPay" /> MAILINHPay
              </NavLink>
              <NavLink exact to="/thongttk">
                <img src={pro} alt="Thông tin tài khoản" /> Thông tin tài khoản
              </NavLink>
              <NavLink exact to="/Lsmuave">
                <img src={history} alt="Lịch sử mua vé" /> Lịch sử mua vé
              </NavLink>
              <NavLink exact to="#">
                <img src={address} alt="Địa chỉ mua vé" /> Địa chỉ mua vé
              </NavLink>
              <NavLink exact to="/doimk">
                <img src={pass} alt="Đặt lại mật khẩu" /> Đặt lại mật khẩu
              </NavLink>
              <a onClick={handleLogout}>
                <img src={log} alt="Đăng xuất" /> Đăng xuất
              </a>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  custom: state.CustomReducer.custom,
});

export default connect(mapStateToProps)(withRouter(Navbar));
