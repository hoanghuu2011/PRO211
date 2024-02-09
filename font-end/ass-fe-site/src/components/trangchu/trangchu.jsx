import React, { useEffect, useState } from "react";

import "../../css/routes.scss"; // Import file CSS cho phần này

import baner1 from "../../image/baner1.png";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // Thêm CSS cho Carousel

import TimChuyen from "../timChuyen/TimChuyen";

import { Outlet } from "react-router-dom";
import { connect } from "react-redux";
import withRouter from "../../helpers/withRouter";
import { updateCustom,fillAccount } from "../../redux/actions/actionCusstom";
import { loadDataTuyen } from "../../redux/actions/actionSearch";

function Home (props) {
  const user = localStorage.getItem("username");
  


  useEffect(() => {
    document.title = "Trang chủ";
    props.fillAccount(user, {});
    props.loadDataTuyen();
    return () => {
      document.title = "Mai Linh TOUR";
    };
    
  }, []);
  

 
  return (
    <section className="routes">
      <div className="large-image">
        <img src={baner1} alt="large" />
      </div>
      <div className="layout">
        <div className="home-search z-30">
          <div className="search-form">
            <TimChuyen />
          </div>
        </div>
      </div>
      <div style={{ marginTop: "5%" }}>
        <Outlet />
      </div>
    </section>
  );
}


const mapStateToProps = (state) => ({
  custom: state.CustomReducer.custom,
});

const mapDispatchToProps = {
  fillAccount,
  loadDataTuyen
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Home));
