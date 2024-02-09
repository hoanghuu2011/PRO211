import React, { useEffect, useState } from "react";
import { IoClipboard, IoClipboardOutline } from "react-icons/io5";
import "./Choncho.css";
import { useSeatSelection } from "./SeatSelectionContext";
import { Checkbox, Col, Row, Card, message, Button } from "antd";

const ChonCho = (props) => {
  const [dataLower, setDataLower] = useState([]);
  const [dataLowerNgayVe, setDataLowerNgayVe] = useState([]);
  const [dataUpper, setDataUpper] = useState([]);
  const [dataUpperNgayVe, setDataUpperNgayVe] = useState([]);

  const [selectedSeatsLowerNgayDi, setSelectedSeatsLowerNgayDi] = useState([]);
  const [selectedSeatsUpperNgayDi, setSelectedSeatsUpperNgayDi] = useState([]);
  const [selectedSeatsLowerNgayVe, setSelectedSeatsLowerNgayVe] = useState([]);
  const [selectedSeatsUpperNgayVe, setSelectedSeatsUpperNgayVe] = useState([]);

  const { soGhe1, soGhe2, disCho1, disCho2 } = props;
  console.log(disCho1);
  console.log(disCho2);

  const onChange = (values, floor, tab) => {
    if (floor === "lower" && tab === "ngayDi") {
      setSelectedSeatsLowerNgayDi(values);
      const updatedDataLowerNgayDi = dataLower.map((item) => {
        if (values.includes(item.key) || disCho1.includes(item.key)) {
          return { ...item, label: <IoClipboard /> };
        } else {
          return { ...item, label: <IoClipboardOutline /> };
        }
      });
      setDataLower(updatedDataLowerNgayDi);
    } else if (floor === "upper" && tab === "ngayDi") {
      setSelectedSeatsUpperNgayDi(values);
      const updatedDataUpperNgayDi = dataUpper.map((item) => {
        if (values.includes(item.key) || disCho1.includes(item.key)) {
          return { ...item, label: <IoClipboard /> };
        } else {
          return { ...item, label: <IoClipboardOutline /> };
        }
      });
      setDataUpper(updatedDataUpperNgayDi);
    } else if (floor === "lower" && tab === "ngayVe") {
      setSelectedSeatsLowerNgayVe(values);
      const updatedDataLowerNgayVe = dataLowerNgayVe.map((item) => {
        if (values.includes(item.key) || disCho2.includes(item.key)) {
          return { ...item, label: <IoClipboard /> };
        } else {
          return { ...item, label: <IoClipboardOutline /> };
        }
      });
      setDataLower(updatedDataLowerNgayVe);
    } else if (floor === "upper" && tab === "ngayVe") {
      setSelectedSeatsUpperNgayVe(values);
      const updatedDataUpperNgayVe = dataUpperNgayVe.map((item) => {
        if (values.includes(item.key) || disCho2.includes(item.key)) {
          return { ...item, label: <IoClipboard /> };
        } else {
          return { ...item, label: <IoClipboardOutline /> };
        }
      });
      setDataUpper(updatedDataUpperNgayVe);
    }
  };

  const onChangeNgayVe = (values, floor) => {
    if (floor === "lower") {
      setSelectedSeatsLowerNgayVe(values);
      const updatedDataLowerNgayVe = dataLowerNgayVe.map((item) => {
        if (values.includes(item.key) || disCho2.includes(item.key)) {
          return { ...item, label: <IoClipboard /> };
        } else {
          return { ...item, label: <IoClipboardOutline /> };
        }
      });
      setDataLowerNgayVe(updatedDataLowerNgayVe);
    } else if (floor === "upper") {
      setSelectedSeatsUpperNgayVe(values);
      const updatedDataUpperNgayVe = dataUpperNgayVe.map((item) => {
        if (values.includes(item.key) || disCho2.includes(item.key)) {
          return { ...item, label: <IoClipboard /> };
        } else {
          return { ...item, label: <IoClipboardOutline /> };
        }
      });
      setDataUpperNgayVe(updatedDataUpperNgayVe);
    }
  };

  const onNext = () => {
    props.onNext({
      ngayDi: [...selectedSeatsLowerNgayDi, ...selectedSeatsUpperNgayDi],
      ngayVe: [...selectedSeatsLowerNgayVe, ...selectedSeatsUpperNgayVe],
    });
  };

  const createData = () => {
    let numRows = soGhe1 / 2;
    const dataCreateUppe = [];
    const dataCreateLow = [];
    for (let i = 1; i <= numRows; i++) {
      dataCreateUppe.push({
        label: <IoClipboardOutline />,
        value: `A${i}`,
        key: `A${i}`,
        disabled: false,
      });
    }
    for (let i = 1; i <= numRows; i++) {
      dataCreateLow.push({
        label: <IoClipboardOutline />,
        value: `B${i}`,
        key: `B${i}`,
        disabled: false,
      });
    }
    const newDataLower = dataCreateLow.map((item) => {
      if (disCho1.includes(item.key)) {
        return { ...item, label: <IoClipboard />, disabled: true };
      }
      return item;
    });
    const newDataUpper = dataCreateUppe.map((item) => {
      if (disCho1.includes(item.key)) {
        return { ...item, label: <IoClipboard />, disabled: true };
      }
      return item;
    });
    setDataLower(newDataLower);
    setDataUpper(newDataUpper);
  };

  const createDataNgayVe = () => {
    let numRows = soGhe2 / 2;
    const dataCreateUppeNgayVe = [];
    const dataCreateLowNgayVe = [];
    for (let i = 1; i <= numRows; i++) {
      dataCreateUppeNgayVe.push({
        label: <IoClipboardOutline />,
        value: `A${i}`,
        key: `A${i}`,
        disabled: false,
      });
    }
    for (let i = 1; i <= numRows; i++) {
      dataCreateLowNgayVe.push({
        label: <IoClipboardOutline />,
        value: `B${i}`,
        key: `B${i}`,
        disabled: false,
      });
    }
    const newDataLowerNgayVe = dataCreateLowNgayVe.map((item) => {
      if (disCho2.includes(item.key)) {
        return { ...item, label: <IoClipboard />, disabled: true };
      }
      return item;
    });
    const newDataUpperNgayVe = dataCreateUppeNgayVe.map((item) => {
      if (disCho2.includes(item.key)) {
        return { ...item, label: <IoClipboard />, disabled: true };
      }
      return item;
    });
    setDataLowerNgayVe(newDataLowerNgayVe);
    setDataUpperNgayVe(newDataUpperNgayVe);
  };

  useEffect(() => {
    createData();
    createDataNgayVe();
  }, [soGhe1, soGhe2, disCho1, disCho2]);
  console.log(dataUpper);

  return (
    <>
      <Row>
        <Col md={6} style={{ marginTop: "0.4cm", marginRight: "1.2cm" }}>
          <div className="seat-status">
            <Card title="chú thích">
              <p>
                <IoClipboard /> Ghế đã được chọn
              </p>
              <p>
                <IoClipboardOutline /> Ghế trống
              </p>
            </Card>
          </div>
        </Col>
        <Col md={8}>
          <label style={{ marginLeft: "1.5cm", marginBottom: "-10cm" }}>
            Tầng dưới - Ngày Đi
          </label>
          <Checkbox.Group
            options={dataUpper}
            onChange={(values) => onChange(values, "upper", "ngayDi")}
            value={selectedSeatsUpperNgayDi}
          />
        </Col>
        <Col md={8}>
          <label style={{ marginLeft: "1.5cm" }}>Tầng trên - Ngày Đi</label>
          <Checkbox.Group
            options={dataLower}
            onChange={(values) => onChange(values, "lower", "ngayDi")}
            value={selectedSeatsLowerNgayDi}
          />
        </Col>
      
      </Row>
    
      <Row style={{ marginLeft: "3cm" }} className="chonchokhuhoi">
        <Col md={8} style={{ marginLeft: "2cm" }}>
          <label style={{ marginLeft: "2cm", width: "300px" }}>
            Tầng dưới - Ngày Về
          </label>
          <Checkbox.Group
            options={dataUpperNgayVe}
            onChange={(values) => onChangeNgayVe(values, "upper")}
            value={selectedSeatsUpperNgayVe}
            style={{ marginRight: "-1cm", marginLeft: "0.5cm" }}
          />
        </Col>
        <Col md={8} style={{ marginLeft: "1.8cm" }}>
          <label style={{ width: "300px" }}>Tầng trên - Ngày Về</label>
          <Checkbox.Group
            options={dataLowerNgayVe}
            onChange={(values) => onChangeNgayVe(values, "lower")}
            value={selectedSeatsLowerNgayVe}
            style={{ marginRight: "-1cm" }}
          />
        </Col>
      </Row>
      <Col md={8} className="thongbaoghedachon">
      {selectedSeatsLowerNgayDi.length > 0 && (
        <div className="selected-seats">
          <p>
            Đã chọn ghế tầng trên - Ngày Đi:{" "}
            <span style={{ color: "blue" }}>
              {selectedSeatsLowerNgayDi.join(", ")}
            </span>
          </p>
        </div>
      )}
      {selectedSeatsUpperNgayDi.length > 0 && (
        <div className="selected-seats">
          <p>
            Đã chọn ghế tầng dưới - Ngày Đi:{" "}
            <span style={{ color: "blue" }}>
              {selectedSeatsUpperNgayDi.join(", ")}
            </span>
          </p>
        </div>
      )}
      {selectedSeatsLowerNgayVe.length > 0 && (
        <div className="selected-seats">
          <p>
            Đã chọn ghế tầng trên - Ngày Về:{" "}
            <span style={{ color: "blue" }}>
              {selectedSeatsLowerNgayVe.join(", ")}
            </span>
          </p>
        </div>
      )}
      {selectedSeatsUpperNgayVe.length > 0 && (
        <div className="selected-seats">
          <p>
            Đã chọn ghế tầng dưới - Ngày Về:{" "}
            <span style={{ color: "blue" }}>
              {selectedSeatsUpperNgayVe.join(", ")}
            </span>
          </p>
        </div>
      )}
    </Col>
      <Row style={{ float: "right" }}>
        <Button type="primary" onClick={() => onNext()}>
          Tiếp tục
        </Button>

        <Button
          type="primary"
          style={{ margin: "0 8px" }}
          onClick={() => props.onClose()}
        >
          Hủy
        </Button>
      </Row>
    </>
  );
};

export default ChonCho;
