import React, { useState } from 'react';
import '../css/datlaimatkhau.css';
import { useDispatch } from 'react-redux';
import history from '../image/dangnhap/History.svg';
import pass from '../image/dangnhap/Password.svg';
import pro from '../image/dangnhap/Profile.svg';
import futa from '../image/dangnhap/futaPay.svg';
import address from '../image/dangnhap/Address.svg';
import log from '../image/dangnhap/Logout.svg';
import { NavLink } from 'react-router-dom';
import { logout } from "../redux/actions/actionAccount";
import withRouter from '../helpers/withRouter';
function Menudangnap(props) {
    const { navigate } = props.router;
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout(navigate));
    };
    return (
        <div className="sidebar-dat-lai-mat-khau" style={{ marginTop: '1cm' }}>
            <ul>
                <li>
                    <NavLink exact to="">
                        <img src={futa} alt="MAILINHPay" /> MAILINHPay
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/thongttk">
                        <img src={pro} alt="Thông tin tài khoản" /> Thông tin tài khoản
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/Lsmuave">
                        <img src={history} alt="Lịch sử mua vé" /> Lịch sử mua vé
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="#">
                        <img src={address} alt="Đại chỉ mua vé" /> Địa chỉ mua vé
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/doimk">
                        <img src={pass} alt="Đặt lại mật khẩu" /> Đặt lại mật khẩu
                    </NavLink>
                </li>
                <li>
                    <a onClick={handleLogout}>
                        <img src={log} alt="Đăng xuất" /> Đăng xuất
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default withRouter(Menudangnap);
