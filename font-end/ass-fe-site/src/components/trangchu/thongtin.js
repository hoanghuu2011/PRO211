import React from "react";
import user from "../../image/userss.png";
import location from "../../image/location.png";
import bus from "../../image/bus.png";
import km1 from "../../image/Km/km1.png";
import km2 from "../../image/Km/km2.png";
import km3 from "../../image/Km/km3.png";
import km4 from "../../image/Km/km4.png";
import km5 from "../../image/Km/km5.png";
import km6 from "../../image/Km/km6.png";
import xehd from "../../image/xehopdong.png";
import vept from "../../image/vept.png";
import gh from "../../image/gh.png";
import bus1 from "../../image/bus1.png";
import saigon from "../../image/saigon.png";
import dalat from "../../image/dalat.png";
import danang from "../../image/danang.png";
import baner from "../../image/baner.png";
import { Carousel } from "react-responsive-carousel";

const ThongTin = () => {
  return (
    <>
      <div className="km">
        <span>Chương trình khuyến mãi</span>
      </div>
      <br />
      <div className="promo-carousel">
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true} // Automatically change images
          stopOnHover={true} // Pause on hover
          showArrows={false}
        >
          <div className="promo-group ">
            <div className="promo-item ">
              <img src={km1} alt="Ảnh khuyến mãi 1" />
            </div>
            <div className="promo-item">
              <img src={km2} alt="Ảnh khuyến mãi 2" />
            </div>
            <div className="promo-item">
              <img src={km3} alt="Ảnh khuyến mãi 3" />
            </div>
          </div>

          <div className="promo-group">
            <div className="promo-item">
              <img src={km4} alt="Ảnh khuyến mãi 4" />
            </div>
            <div className="promo-item">
              <img src={km5} alt="Ảnh khuyến mãi 5" />
            </div>
            <div className="promo-item">
              <img src={km6} alt="Ảnh khuyến mãi 6" />
            </div>
          </div>
          {/* Thêm các ảnh khuyến mãi khác ở đây */}
        </Carousel>
      </div>

      <br />
      <div className="container">
        <div className="Pb">
          <span>
            TUYẾN PHỔ BIẾN
            <br />
          </span>
          <h6>Được khách hàng tin tưởng và lựa chọn</h6>
          <br />
        </div>
        <div className="row">
       
          <div className="col-md-4 ">
            <div className="route mx-auto">
              <img src={saigon} alt="Tuyến TP. Hồ Chí Minh" />
              <div className="overlay">Tuyến xe từ</div>
              <div className="overlay-text">TP Hồ Chí Minh</div>
              <div className="route-info">
                <div >
                  <p>
                    <a href="#">Đà Lạt</a> <span>280,000đ</span> <br />
                    305km - 8 giờ - 01/10/2023
                  </p>
                </div>
                <div>
                  <p>
                    <a href="#">Cần Thơ</a> <span>165,000đ</span> <br />
                    166km - 3 giờ 12 phút - 01/10/2023
                  </p>
                </div>
                <div>
                  <p>
                    <a href="#">Long Xuyên</a> <span>185,000đ</span> <br />
                    186km - 5 giờ - 01/10/2023
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Tuyến đường từ Đà Lạt */}
          <div className="col-md-4">
            <div className="route">
              <img src={dalat} alt="Tuyến Đà Lạt" />
              <div className="overlay">Tuyến xe từ</div>
              <div className="overlay-text">Đà Lạt</div>
              <div className="route-info">
                <div>
                  <p>
                    <a href="#">TP. Hồ Chí Minh</a> <span>280,000đ</span>
                    <br />
                    310km - 8 giờ - 01/10/2023
                  </p>
                </div>
                <div>
                  <p>
                    <a href="#">Đà Nẵng</a> <span>340,000đ</span>
                    <br />
                    757km - 17 giờ - 01/10/2023
                  </p>
                </div>
                <div>
                  <p>
                    <a href="#">Cần Thơ</a> <span>430,000đ</span> <br />
                    457km - 11 giờ - 01/10/2023
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="route">
              <img src={danang} alt="Tuyến Đà Nẵng" />
              <div className="overlay">Tuyến xe từ</div>
              <div className="overlay-text">Đà Nẵng</div>
              <div className="route-info">
                <div>
                  <p>
                    <a href="#">Đà Lạt</a> <span>340,000đ</span>
                    <br />
                    666km - 17 giờ - 01/10/2023
                  </p>
                </div>
                <div>
                  <p>
                    <a href="#">BX An Sương</a> <span>400,000đ</span>
                    <br />
                    966km - 20 giờ - 01/10/2023
                  </p>
                </div>
                <div>
                  <p>
                    <a href="#">Nha Trang</a> <span>290,000đ</span> <br />
                    528km - 9 giờ 25 phút - 01/10/2023
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="futa-quality">
          <span>MAI LINH TOUR - CHẤT LƯỢNG LÀ DANH DỰ</span>
          <p>Được khách hàng tin tưởng và lựa chọn</p>
        </div>
        <div className="futa-stats">
          <div className="futa-stats-left">
            <div>
              <img src={user} alt="Lượt khách" />
              <span className="lg">Hơn 2 Triệu</span>
              <span className="sm"> Lượt khách</span>
              <p>
                Mai Linh phục vụ hơn 2 triệu lượt khách bình quân 1 năm trên
                toàn quốc
              </p>
            </div>

            <div>
              <img src={location} alt="Phòng vé - Bưu cục" />
              <span className="lg">Hơn 150 Phòng vé</span>
              <span className="sm"> Bưu cục</span>
              <p>
                Mai Linh có hơn 150 phòng vé, trạm trung chuyển, bến xe,... trên
                toàn hệ thống
              </p>
            </div>

            <div>
              <img src={bus} alt="Chuyến xe" />
              <span className="lg">Hơn 500</span>
              <span className="sm"> Chuyến xe</span>
              <br />
              <p>
                Mai Linh phục vụ hơn 500 chuyến xe đường dài và liên tỉnh mỗi
                ngày
              </p>
            </div>
          </div>

          <div className="futa-stats-right ">
            <div className="big-image">
              <img src={baner} alt="Ảnh lớn" />
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="futa-connect">
        <div className="container">
          <div className="futa-quality">
            <span>KẾT NỐI Mai Linh</span>
            <p>
              Kết nối đa dạng hệ sinh thái: mua vé Xe Mai Linh, Xe Buýt <br />{" "}
              Xe Hợp Đồng, Giao Hàng,...
            </p>
          </div>
        </div>
        <br />
        <div className="futa-images">
          <div className="image-with-text ">
            <img src={xehd} alt="Image 1" />
            <p>Xe Hợp Đồng</p>
          </div>
          <div className="image-with-text">
            <img src={vept} alt="Image 1" />
            <p className="vept">Mua Vé Mai Linh</p>
          </div>
          <div className="image-with-text">
            <img src={gh} alt="Image 1" />
            <p>Giao Hàng</p>
          </div>
          <div className="image-with-text">
            <img src={bus1} alt="Image 1" />
            <p>Xe Buýt</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThongTin;
