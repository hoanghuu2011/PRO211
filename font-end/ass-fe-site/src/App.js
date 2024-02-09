
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar2';
import Footer from './components/footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ContactPage from './components/lienhe';
import LoginPage from "./components/login/loginand";
import Quenmk from "./components/login/quenmk";
import Lichtrinh from './components/lichtrinh';
import Trangchu from "./components/trangchu/trangchu";
import Tracuu from './components/tracuu';
import Dvtc from './components/datvethanhcong/datvetc';
import Fail from './components/datvethanhcong/flasethanhtoan';
import Tintuc from './components/tintuc';
import Lsmuave from './components/lichsumuave';
import Doimk from './components/doimatkhau';
import Thongttk from './components/thongtintaikhoan';
import Mailinhpay from './components/lichsugiaodich'
import Vechungtoi from './components/vechungtoi';
import ThongTin from "./components/trangchu/thongtin"
import SeatSelection from "./components/trangchu/listTuyen";
import SeatSelection2 from "./components/trangchu/listTuyen2";
import store from "./redux/store";
function App() {
  const [showNavbar, setShowNavbar] = useState(true);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          {showNavbar && <Navbar />}
          <div className="content">
            <Routes>
            <Route path="/" element={<Trangchu />}>
            <Route index element={<ThongTin />} />
            <Route path="timchuyen" element={<SeatSelection />} />
            <Route path="timchuyen2" element={<SeatSelection2 />} />
          </Route>
             
              <Route path="/lienhe" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/lichtrinh" element={<Lichtrinh />} />
              <Route path="/thongtinve/:id" element={<Dvtc />} />
              <Route path="/datvethatbai" element={<Fail />} />
              <Route path="/trangchu" element={<Trangchu />} />
              <Route path="/tracuu" element={<Tracuu />} />
              <Route path="/tintuc" element={<Tintuc />} />
              <Route path="/vechungtoi" element={<Vechungtoi />} />
              <Route path="/Lsmuave" element={<Lsmuave />} />
              <Route path="/doimk" element={<Doimk />} />
              <Route path="/quenmk" element={<Quenmk />} />
              <Route path="/thongttk" element={<Thongttk />} />
              <Route path="/Mailinhpay" element={<Mailinhpay />} />
             
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
             
            />
          </div>
          <br />
          {showNavbar && <Footer />}
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

