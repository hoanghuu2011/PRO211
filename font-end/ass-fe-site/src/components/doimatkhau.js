import React, { useEffect, useState } from 'react';
import '../css/datlaimatkhau.css';
import Menudangnhap from '../components/menudangnhap';
import  withRouter  from '../helpers/withRouter';
import { connect } from 'react-redux';
import { change } from '../redux/actions/actionAccount';
import { Form, Input, Button } from 'antd';
import { toast } from 'react-toastify'; 

import 'react-toastify/dist/ReactToastify.css'; 
const PasswordResetPage =(props)=> {
  const { navigate } = props.router;
  const user = localStorage.getItem("username");

  const handleFormSubmit = async (values) => {
    if (values.newPassword.length < 6) {
      toast.error('Vui lòng nhập ít nhất 6 kí tự!', {
        position: "top-right",
        reverseOrder: false,
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
      });
     
    } else {
      props.change(user, values, navigate);
    }
  };
  useEffect(() => {
  }, []);

  return (
    <div>
      <div className="container-dat-lai-mat-khau">
        <Menudangnhap />
        <div className="dat-lai-mat-khau" style={{ marginLeft: '10cm' }}>
          <div className="password-reset-form" style={{width:'900px'}}>
            <div className="top-text">Đặt lại mật khẩu</div>
            <div className="bottom-text">
              Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
            </div>
            <div className="form-dat-lai-mat-khau">
            <div className="text-center" name="tenTaiKhoan" style={{width:'400px'}}>(+84) {user}</div>
              <Form onFinish={handleFormSubmit} style={{marginTop:'0.5cm'}}>
              <label className="old-password-lable">
              Mật khẩu cũ
            </label>
                  <Form.Item
                    name="matKhau"
                    id="matKhau"
                    className='lable-d'
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
                  >
                    <Input.Password 
                    placeholder="Nhập mật khẩu cũ" 
                    className='mkc-dlmk'
                    />
                  </Form.Item>
                  <label className="old-password-lable">Mật khẩu mới</label>
                  <Form.Item
                    name="newPassword"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
                  >
                    <Input.Password placeholder="Nhập mật khẩu mới" className="mkc-dlmk" />
                  </Form.Item>
                  <label className="old-password-lable" >
                  Xác nhận mật khẩu
                </label>
                  <Form.Item
                  name="confirmNewPassword"
                  rules={[
                    { required: true, message: 'Vui lòng xác nhận mật!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password 
                  placeholder="Xác nhận mật khẩu" 
                  className='mkc-dlmk'
                  />
                </Form.Item>
                  <Form.Item>
                  <button type="submit" className='btn-dmk'>
                  Xác nhận
                  </button>
              </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  account: state.AccountReducer.accoust,
});

const mapDispatchToProps = {
  change,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PasswordResetPage));
