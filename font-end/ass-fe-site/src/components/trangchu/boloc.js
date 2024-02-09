import React, { useState, useEffect } from "react";
import "../../css/loc.css";
import deleteicon from "../../image/trangchu/delete.svg";
import { connect } from "react-redux";
import withRouter from "../../helpers/withRouter";


function Boloc(props) {

  const [selectedCar, setSelectedCar] = useState([]);
  const [selectedChar, setSelectedChar] = useState([]);


  const [selectedFloor, setSelectedFloor] = useState([]);




  const handlecarClick = (button) => {
    if (selectedCar.includes(button)) {
      setSelectedCar(selectedCar.filter((name) => name !== button));
    } else if (selectedCar.length < 3) {
      setSelectedCar([...selectedCar, button]);
    }
  };
  const handlecharClick = (button) => {
    if (selectedChar.includes(button)) {
      setSelectedChar(selectedChar.filter((name) => name !== button));
    } else if (selectedChar.length < 3) {
      setSelectedChar([...selectedChar, button]);
    }
  };
  const handlefloorClick = (button) => {
    if (selectedFloor.includes(button)) {
      setSelectedFloor(selectedFloor.filter((name) => name !== button));
    } else if (selectedFloor.length < 3) {
      setSelectedFloor([...selectedFloor, button]);
    }
  };


useEffect(() => {
 
}, []);

let isLocationDisplayed = false;
  return (
      <div className="container-loc" style={{ marginLeft: "5cm" }}>
         <div className="title" style={{marginLeft:'0.5cm'}}>Bộ lọc tìm kiếm</div>
       
        <div class="flex cursor-pointer gap-2 text-[#E12424]" style={{marginLeft:'7cm', marginTop:'-1cm'}}>Bỏ lọc<img src={deleteicon} width="22" height="22" alt="delete"/></div>
        <div className="divide"></div>
        <div className="filter">
          <div className="filter-label">Giờ đi</div>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" className="checkbox-input" id="morning" />
              <div className="checkbox-custom"></div>
              <span className="checkbox-text">
                Sáng sớm 00:00 - 06:00
                <span className="checkbox-checkmark"></span>
              </span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" className="checkbox-input" id="morning2" />
              <div className="checkbox-custom"></div>
              <span className="checkbox-text">
                Buổi sáng 06:00 - 12:00
                <span className="checkbox-checkmark"></span>
              </span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-input"
                id="afternoon"
              />
              <div className="checkbox-custom"></div>
              <span className="checkbox-text">
                Buổi chiều 12:00 - 18:00
                <span className="checkbox-checkmark"></span>
              </span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" className="checkbox-input" id="evening" />
              <div className="checkbox-custom"></div>
              <span className="checkbox-text">
                Buổi tối 18:00 - 24:00
                <span className="checkbox-checkmark"></span>
              </span>
            </label>
          </div>
          <div className="divide"></div>
          <div className="filter">
          <div className="filter-label">Loại xe</div>
          <div className="checkbox-group-loaixe">
            <button
              className={`checkbox-button-loaixe ${selectedCar.includes("seat1") ? "active" : ""}`}
              onClick={() => handlecarClick("seat1")}
              style={{width:'51px', marginLeft:'20px'}}
            >
              Ghế
            </button>
            <button
              className={`checkbox-button-loaixe ${selectedCar.includes("bed") ? "active" : ""}`}
              onClick={() => handlecarClick("bed")}
              style={{width:'70px'}}
            >
              Giường
            </button>
            <button
              className={`checkbox-button-loaixe ${selectedCar.includes("cart") ? "active" : ""}`}
              onClick={() => handlecarClick("cart")}
              style={{width:'88px'}}
            >
              Limousine
            </button>
          </div>
        </div>

          <div className="divide"></div>
          <div className="filter">
            <div className="filter-label">Hàng ghế</div>
            <div className="checkbox-group-loaixe">
            <button
              className={`checkbox-button-loaixe ${selectedChar.includes("seat1") ? "active" : ""}`}
              onClick={() => handlecharClick("seat1")}
              style={{width:'88px', marginLeft:'20px'}}
            >
              Hàng đầu
            </button>
            <button
              className={`checkbox-button-loaixe ${selectedChar.includes("bed") ? "active" : ""}`}
              onClick={() => handlecharClick("bed")}
              style={{width:'92px'}}
            >
            Hàng Giữa
            </button>
            <button
              className={`checkbox-button-loaixe ${selectedChar.includes("cart") ? "active" : ""}`}
              onClick={() => handlecharClick("cart")}
              style={{width:'88px'}}
            >
            Hàng Cuối
            </button>
          </div>
          </div>
          <div className="divide"></div>
          <div className="filter">
          <div className="filter-label">Tầng</div>
          <div className="checkbox-group-loaixe">
          <button
            className={`checkbox-button-loaixe ${selectedFloor.includes("seat1") ? "active" : ""}`}
            onClick={() => handlefloorClick("seat1")}
            style={{width:'88px', marginLeft:'20px'}}
          >
            Tầng trên
          </button>
          <button
            className={`checkbox-button-loaixe ${selectedFloor.includes("bed") ? "active" : ""}`}
            onClick={() => handlefloorClick("bed")}
            style={{width:'92px'}}
          >
          Tầng dưới
          </button>
         
        </div>
        </div>
        </div>
        </div>
  );
}


const mapStateToProps = (state) => ({

  
});

const mapDispatchToProps = {

};

export default connect(

)(withRouter(Boloc));
