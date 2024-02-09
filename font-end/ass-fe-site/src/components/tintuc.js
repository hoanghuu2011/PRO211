import React, { useEffect, useState } from 'react';
import '../css/tintuc.css';
import tintuclogo from '../image/logo/shape.png';
import baner1 from '../image/tintuc/banner.png';
function Tintuc() {
  useEffect(() => {
    document.title = 'Tin Tức';

    return () => {
      document.title = 'Mai Linh TOUR';
    };
  }, []);

  return (
    <div>
      <div className="tintuc-nav" style={{ width: "1520px" }}>
        <a className="tintuc-navbar-brand" href="#">
          <img src={tintuclogo} style={{ width: '30', height: '24', marginRight: '-8cm' }} />
        </a>
        <div className="tintuc-nav-list" style={{ marginLeft: "-14cm" }}>
          <li><a href="">Tin tức tổng hợp</a></li>
          <li><a href="">MAILINH Bus Lines</a></li>
          <li><a href="">MAILINH City Bus</a></li>
          <li><a href="">Khuyến mãi</a></li>
          <li><a href="">Trạm Dừng</a></li>
        </div>
        <form className="tintuc-search-form" >
          <input className="tintuc-search-input" type="search" placeholder="Tìm kiếm tin tức" aria-label="Search" style={{ marginLeft: '-27cm' }} />
        </form>
      </div>
      <div className="tintuc-text-container">
        <div className="tintuc-text">Tin tức nổi bật</div>
        <div className="tintuc-horizontal-line"></div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="car" >
            <img className="card-img-top" src={baner1} style={{ width: '556px', height: '313px', marginTop: '24px', marginRight: '-2.5cm' }} />
            <div className="card-body">
              <h5 className="card-title1">FUTA ĐỒNG HÀNH CÙNG SHB - X3 QUÀ TẶNG</h5>
              <p className="card-text-tintuc" style={{ marginLeft: '-9cm' }}>14:35 26/07/2023</p>
            </div>
          </div>
        </div>
        <div className="col-md-6" style={{ marginLeft: '-2.5cm' }}>
          <div className="row">
            <div className="col-md-6">
              <div className="car" >
                <img className="card-img-top" src={baner1} />
                <div className="card-body">
                  <p className="card-title-tintuc" style={{ marginLeft: '-1cm' }}>PHƯƠNG TRANG - FUTA BUS <br /> LINES VINH DỰ NHẬN GIẢI...</p>
                  <p className="card-text-tintuc" style={{ marginLeft: '-4cm' }}>14:35 26/07/2023</p>
                </div>
              </div>
            </div>

            <div className="col-md-6" style={{ marginLeft: '-2.5cm' }}>
              <div className="car">
                <img className="card-img-top" src={baner1} />
                <div className="card-body">
                  <p className="card-title-tintuc">FUTA ĐỒNG HÀNH CÙNG SHB - <br /> X3 QUÀ TẶNG</p>
                  <p className="card-text-tintuc" style={{ marginLeft: '-3cm' }}>14:35 26/07/2023</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="car" >
                <img className="card-img-top" src={baner1} />
                <div className="card-body">
                  <p className="card-title-tintuc" >PHƯƠNG TRANG - FUTA BUS <br /> LINES VINH DỰ NHẬN GIẢI...</p>
                  <p className="card-text-tintuc" style={{ marginLeft: '-3cm' }}>14:35 26/07/2023</p>
                </div>
              </div>
            </div>
            <div className="col-md-6" style={{ marginLeft: '-2.5cm' }}>
              <div className="car" >
                <img className="card-img-top" src={baner1} />
                <div className="card-body">
                  <p className="card-title-tintuc">FUTA ĐỒNG HÀNH CÙNG SHB - <br /> X3 QUÀ TẶNG</p>
                  <p className="card-text-tintuc" style={{ marginLeft: '-3cm' }}>14:35 26/07/2023</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="row">
        <div class="tieudiem">
          <div class="square">
            <div class="top-text">Tiêu điểm</div>
            <div class="bottom-text-tintuc">MaiLinh Tour</div>
          </div>
        </div>
        <div class="col-md-2">
          <div class="car">
            <img class="card-img-top-tt" src={baner1} />
            <div class="card-body">
              <p class="card-title">FUTA ĐỒNG HÀNH CÙNG SHB - X3 QUÀ TẶNG</p>
              <p class="card-text">14:35 26/07/2023</p>
            </div>
          </div>
        </div>
        <div class="col-md-2">
          <div class="car">
            <img class="card-img-top-tt" src={baner1} />
            <div class="card-body">
              <p class="card-title">FUTA ĐỒNG HÀNH CÙNG SHB - X3 QUÀ TẶNG</p>
              <p class="card-text">14:35 26/07/2023</p>
            </div>
          </div>
        </div>
        <div class="col-md-2">
          <div class="car" >
            <img class="card-img-top-tt" src={baner1} />
            <div class="card-body">
              <p class="card-title">FUTA ĐỒNG HÀNH CÙNG SHB - X3 QUÀ TẶNG</p>
              <p class="card-text">14:35 26/07/2023</p>
            </div>
          </div>
        </div>
      </div>
      <div className="tintuc-text-container">
      <div className="tintuc-text">Tất cả tin tức</div>
      <div className="tintuc-horizontal-line"></div>
    </div>
      <div class="row">
        <div class="col-md-3">
          <div class="image">
            <img class="card-img-top" src={baner1} style={{marginLeft:'4cm'}} />
          </div>
        </div>
        <div class="col-md-3">
          <div class="text-tt" >
            <div class="card-body">
            <p class="card-title-tt">FUTA ĐỒNG HÀNH CÙNG SHB - </p>
            <p className="card-title-tintuc" style={{marginLeft:'-4.5cm', marginTop:'-0.3cm'}}>X3 QUÀ TẶNG </p>
              <p class="card-text-tt">14:35 26/07/2023</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="image">
            <img class="card-img-top"  src={baner1}/>
          </div>
        </div>
        <div class="col-md-3">
          <div class="text-tt">
            <div class="card-body"style={{marginLeft:'-5.8cm'}}>
              <p class="card-title-tt">FUTA ĐỒNG HÀNH CÙNG SHB - </p>
              <p className="card-title-tintuc" style={{marginLeft:'-4.5cm', marginTop:'-0.3cm'}}>X3 QUÀ TẶNG </p>
              <p class="card-text-tt">14:35 26/07/2023</p>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="image">
            <img class="card-img-top"  src={baner1} style={{marginLeft:'4cm'}} />
          </div>
        </div>
        <div class="col-md-3">
          <div class="text-tt" >
            <div class="card-body">
            <p class="card-title-tt">FUTA ĐỒNG HÀNH CÙNG SHB - </p>
            <p className="card-title-tintuc" style={{marginLeft:'-4.5cm', marginTop:'-0.3cm'}}>X3 QUÀ TẶNG </p>
              <p class="card-text-tt">14:35 26/07/2023</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="image">
            <img class="card-img-top" src={baner1} />
          </div>
        </div>
        <div class="col-md-3">
          <div class="text-tt">
            <div class="card-body"style={{marginLeft:'-5.8cm'}}>
            <p class="card-title-tt">FUTA ĐỒNG HÀNH CÙNG SHB - </p>
            <p className="card-title-tintuc" style={{marginLeft:'-4.5cm', marginTop:'-0.3cm'}}>X3 QUÀ TẶNG </p>
              <p class="card-text-tt">14:35 26/07/2023</p>
            </div>
          </div>
        </div>
      </div>

      <div aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">4</a></li>
          <li class="page-item"><a class="page-link" href="#">5</a></li>

        </ul>
      </div>

    </div>
  );
}

export default Tintuc;
