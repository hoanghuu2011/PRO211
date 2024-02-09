import React, { useState,useEffect } from 'react';
import '../css/thongtintaikhoan.css';
import 'antd/dist/antd.css';
import Menudangnhap from '../components/menudangnhap';
import { connect } from "react-redux";
import withRouter from '../helpers/withRouter';
import { updateCustom } from "../redux/actions/actionCusstom";
import { fillAccount } from "../redux/actions/actionCusstom";
import { Col, Input, Row, Button, DatePicker } from 'antd';
import { Form } from 'antd';
import UploadImage from './UploadImage';
function Thongtintaikhoan(props) {
    const hoTen = localStorage.getItem("hoTen");
    const soDT = localStorage.getItem("soDT");
    const email = localStorage.getItem("email");
    const [hoTenValue, setHoTenValue] = useState('');
    const [profileImage, setProfileImage] = useState();
    const user = localStorage.getItem("username");
    const [file, setFlie] = useState(0);

    const onUploadFile = (values) => {
        setProfileImage(values);
        setFlie(1);
   
      };
   
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfileImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFormSubmit = (values) => {
       
        if (hoTenValue.length > 25) {
            alert('Họ tên không được vượt quá 25 ký tự.');
        } else {
            props.updateCustom(user, values, profileImage, navigate);
        }
      
    };

    const { custom } = props;
    const { navigate } = props.router;
    useEffect(() => {
        props.fillAccount(user, {}, navigate);
    }, []);
    return (
        <div className="container-dat-lai-mat-khau">
            <Menudangnhap />
            <div className="thong-tin-tai-khoan" style={{ marginTop: '30px', marginLeft: '12cm' }}>
                <div className="account-information-form">
                    <div className="top-text">Thông tin tài khoản</div>
                    <div className="bottom-text">Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
                    <div className="form-thong-tin-tai-khoan">
                        <Row gutter={16}>
                            <Col span={8}>
                            <div className="imgae-tttk" style={{ marginTop: '2cm'}}>
                            <UploadImage file={file} profileImage={custom.anhDaLuu} onUploadFile={onUploadFile}></UploadImage>
                          </div>
                            </Col>

                            <Col >
                                <Form 
                                    id="account-information"
                                    onFinish={handleFormSubmit}
                                    style={{marginLeft:'8cm', marginTop:'-12cm'}}
                                >
                                    <Form.Item label="Họ và tên :" name="hoTen" initialValue={hoTen || ""}
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập họ và tên!' },
                                            { max: 25, message: 'Họ tên không được vượt quá 25 ký tự!' }
                                        ]}
                                    >
                                        <Input style={{ width: '340px', marginLeft: '20px', height: '45px' }} />

                                    </Form.Item>
                                    <Form.Item label="Số điện thoại:" name="id" initialValue={user} >
                                        <Input placeholder="0123456789" disabled style={{ width: '340px',  height: '45px'}}/>
                                    </Form.Item>
                                    <Form.Item label="Email:" name="email" initialValue={email}>
                                        <Input placeholder="kiuoanh@gmail.com" style={{ width: '340px',  marginLeft:'45px', height: '45px'}}/>
                                    </Form.Item>
                                    
                                    <Form.Item label="Địa chỉ:" name="diaChi" initialValue={custom?.diaChi} >
                                        <Input.TextArea  placeholder="Đà Nẵng" style={{height:'80px',marginLeft:'50px', width: '340px'}} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className='btn-capnhat'>
                                            Cập nhật
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    custom:state.CustomReducer.custom,
});

const mapDispatchToProps = {
    updateCustom,
    fillAccount

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Thongtintaikhoan));
