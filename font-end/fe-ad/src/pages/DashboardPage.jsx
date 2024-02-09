import React, { useState } from "react";
import {
  MdAddCircleOutline,
  MdAllInbox,
  MdCategory,
  MdFormatListBulleted,
  MdLogout,
  MdManageAccounts,
  MdRequestPage,
  MdStackedBarChart,
  MdSupervisorAccount,
} from "react-icons/md";
import { AiFillCreditCard } from "react-icons/ai";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { Layout, Menu, Button, theme, Avatar, Space, Row, Col } from "antd";
import "../styles/Dashboard.scss";
import Home from "../components/home/Home";
import AddOrEdit from "../components/categories/AddOrEdit";
import ListCategory from "../components/categories/ListCategory";

import ListChuyen from "../components/chuyenXe/ListChuyen";
import AddOrEditChuyen from "../components/chuyenXe/AddOrEditChuyen";

import AddOrEditProduct from "../components/products/AddOrEditProduct";
import ListProduct from "../components/products/ListProduct";

import ListAccount from "../components/Account/ListAccount";
import ListOrder from "../components/Order/ListOrder";
import Login from "../components/auth/Login";
import OrderDetail from "../components/Order/OrderDetail";


import ListNhanVien from "../components/nhanVien/ListNhanVien";
import AddOrEditNhanVien from "../components/nhanVien/AddOrEditNhanVien";
import TuyenXe from "../components/tuyenXe/TuyenXe";
import AddOrEditTuyen from "../components/tuyenXe/AddOrEditTuyen";
import ThongKe from "../components/thongKe/doanhThu/ThongKe";
import SoVe from "../components/thongKe/ve/SoVe";
import NoiTra from "../components/noiTra/NoiTra";
import NhaXe from "../components/nhaXe/NhaXe";

const { Header, Sider, Content } = Layout;

const DashboardPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [marginLeft, setMarginleft] = useState(200);
  const [fontSize, setSizefont] = useState(16);

  const navigate = useNavigate();

  const siteLayoutStyle = { marginLeft: marginLeft };
  const iconSize = { fontSize: fontSize };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={siteLayoutStyle}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2>{collapsed ? "ML" : "Mai LInh TOUR"}</h2>
        </div>
        
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={iconSize}
          items={[
            {
              key: "2",
              icon: <MdSupervisorAccount />,
              label: "Tuyến xe",
              children: [
                {
                  key: "81",
                  icon: <MdAddCircleOutline />,
                  label: "Thêm",
                  onClick: () => navigate("/tuyen/them"),
                },
                {
                  key: "82",
                  icon: <MdFormatListBulleted />,
                  label: "Danh sách",
                  onClick: () => navigate("/tuyen"),
                },
                {
                  key: "83",
                  icon: <MdFormatListBulleted />,
                  label: "Nơi Trả",
                  onClick: () => navigate("tuyen/noitra"),
                },
              ],
            },
            {
              key: "3",
              icon: <MdCategory />,
              label: "Chuyến xe",
              children: [
                {
                  key: "31",
                  icon: <MdAddCircleOutline />,
                  label: "Thêm",
                  onClick: () => navigate("/chuyen/them"),
                },
                {
                  key: "32",
                  icon: <MdFormatListBulleted />,
                  label: "Danh sách",
                  onClick: () => navigate("/chuyen/danhsach"),
                },
              ],
            },
            {
              key: "4",
              icon: <MdCategory />,
              label: "Loại xe",
              children: [
                {
                  key: "41",
                  icon: <MdAddCircleOutline />,
                  label: "Thêm",
                  onClick: () => navigate("/loaixe/them"),
                },
                {
                  key: "52",
                  icon: <MdFormatListBulleted />,
                  label: "Danh sách",
                  onClick: () => navigate("/loaixe/danhsach"),
                },
              ],
            },
           
            {
              key: "7",
              icon: <MdAllInbox />,
              label: "Quản lý xe",
              children: [
                {
                  key: "71",
                  icon: <MdAddCircleOutline />,
                  label: "Thêm",
                  onClick: () => navigate("/xe/them"),
                },
                {
                  key: "72",
                  icon: <MdFormatListBulleted />,
                  label: "Danh sách",
                  onClick: () => navigate("/xe/danhsach"),
                },
                {
                  key: "73",
                  icon: <MdFormatListBulleted />,
                  label: "Nhà xe",
                  onClick: () => navigate("/xe/nhaxe"),
                },
              ],
            },
            {
              key: "8",
              icon: <AiFillCreditCard />,
              label: "Đặt vé",
              onClick: () => navigate("/datve"),
            },
            {
              key: "9",
              icon: <MdRequestPage />,
              label: "Nhân viên",
              children: [
                {
                  key: "91",
                  icon: <MdAddCircleOutline />,
                  label: "Thêm",
                  onClick: () => navigate("/nhanvien/them"),
                },
                {
                  key: "92",
                  icon: <MdFormatListBulleted />,
                  label: "Danh sách",
                  onClick: () => navigate("/nhanvien/danhsach"),
                },
              ],
            },
            {
              key: "10",
              icon: <MdStackedBarChart />,
              label: "Thống kê",
              children: [
                {
                  key: "101",
                  icon: <MdAddCircleOutline />,
                  label: "Doanh thu",
                  onClick: () => navigate("/thongke/doanhthu"),
                },
                {
                  key: "102",
                  icon: <MdFormatListBulleted />,
                  label: "Số lượng vé",
                  onClick: () => navigate("/thongke/ve"),
                },
              ],
            },
            {
              key: "11",
              icon: <MdManageAccounts />,
              label: "Quản lý tài khoản",
              onClick: () => navigate("/taikhoan"),
            },

    
            {
              key: "13",
              icon: <MdLogout />,
              label: "Đăng xuất",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            left: marginLeft + 16,
          }}
        >
          <Row>
            <Col md={18}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => {
                  const sts = !collapsed;
                  setCollapsed(sts);
                  setMarginleft(sts ? 80 : 200);
                  setSizefont(sts ? 20 : 16);
                }}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </Col>
            <Col md={6}>
              <Space size={16}>
                <Avatar icon={<UserOutlined />}></Avatar>admin
              </Space>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <div className="content-panel">
            <Routes>
              <Route path="/" element={<TuyenXe />} />
              <Route path="/loaixe/them" element={<AddOrEdit key="a" />} />
              <Route
                path="/loaixe/capnhat/:id"
                element={<AddOrEdit key="u" />}
              />
              <Route path="/loaixe/danhsach" element={<ListCategory />} />

              <Route path="/xe/danhsach" element={<ListProduct />} />
              <Route path="/xe/them" element={<AddOrEditProduct key="p" />} />
              <Route path="/xe/nhaxe" element={<NhaXe />} />
              <Route
                path="/xe/capnhat/:id"
                element={<AddOrEditProduct key="o" />}
              />

              <Route path="/chuyen/danhsach" element={<ListChuyen />} />
              <Route
                path="/chuyen/them"
                element={<AddOrEditChuyen key="t" />}
              />
              <Route
                path="/chuyen/capnhat/:id"
                element={<AddOrEditChuyen key="g" />}
              />

              <Route path="/taikhoan" element={<ListAccount />} />

              <Route path="/datve" element={<ListOrder />} />
              <Route path="/datve/vechitiet/:id" element={<OrderDetail />} />
              <Route path="/dangnhap" element={<Login />} />
           
              <Route path="/tuyen" element={<TuyenXe />} />
              <Route path="/tuyen/them" element={<AddOrEditTuyen />} />
              <Route path="/tuyen/noitra" element={<NoiTra />} />
              <Route path="/thongke/doanhthu" element={<ThongKe />} />
              <Route path="/thongke/ve" element={<SoVe />} />

              <Route
                path="/tuyen/capnhat/:id"
                element={<AddOrEditTuyen key="m" />}
              />
              <Route path="/nhanvien/danhsach" element={<ListNhanVien />} />
              <Route
                path="/nhanvien/them"
                element={<AddOrEditNhanVien key="nvt" />}
              />
              <Route
                path="/nhanvien/sua/:id"
                element={<AddOrEditNhanVien key="nvs" />}
              />
            </Routes>
          </div>

          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardPage;
