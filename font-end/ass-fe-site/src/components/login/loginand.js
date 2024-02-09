import React, { useState } from "react";
import withRouter from "../../helpers/withRouter.js";
import text from "../../image/logo/Text-mailinh.png";
import DangNhapForm from "./DangNhapForm.js";
import { createAccount, login } from "../../redux/actions/actionAccount.js";
import { Tabs } from "antd";
import { connect } from "react-redux";
import '../../css/login.scss';
import DangKyForm from "./DangKyForm";
const LoginPage = (props) => {
  const { navigate } = props.router;
  const onComfig = (acc) => {
    props.createAccount(acc, navigate);
  };
  const onSubmit = (acc) => {
    props.login(acc, navigate);
  };
  const [activeTab, setActiveTab] = useState("1");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  const items = [
    {
      key: "1",
      label: "Đăng nhập",
      children: <DangNhapForm keyTabs={1} onFinish={onSubmit} />,
    },
    {
      key: "2",
      label: "Đăng ký",
      children: < DangKyForm keyTabs={2} onFinish={onComfig} />,
    },
  ];
  return (

    <div className="container h-custom">
      <div className="login row">
        <div className="col-md-9 col-lg-6 col-xl-5">
          <div>
            <img
              alt=""
              src={text}
              style={{ paddingTop: "25px", paddingLeft: "40px" }}
            />
          </div>
          <img
            src="https://storage.googleapis.com/futa-busline-cms-dev/TVC_00aa29ba5b/TVC_00aa29ba5b.svg"
            className="img-fluid"
            alt="Sample image"
          />
        </div>
        <div className="col-md-8 col-lg-6 col-xl-5 offset-xl-1">
          <div className="text-center">
            <h6
              style={{
                marginTop:'20px',
                marginBottom:'15px',
                color: 'black',
                fontSize: '24px',
                fontWeight:'500',
                lineHeight:'32px'
              }}
            >

              {activeTab === "1" ? "Đăng nhập tài khoản" : "Tạo tài khoản"}
            </h6>
            <Tabs defaultActiveKey={activeTab} onChange={handleTabChange}>
              {items.map((item) => (
                <Tabs.TabPane key={item.key} tab={item.label}>
                  {item.children}
                </Tabs.TabPane>
              ))}
            </Tabs>
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
  createAccount,
  login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginPage));
