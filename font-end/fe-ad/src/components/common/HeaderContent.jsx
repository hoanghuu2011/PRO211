import { Col, Divider, Row } from "antd";
import React, { Component } from "react";
import { BiArrowBack } from "react-icons/bi";

class HeaderContent extends Component {
  render() {
    const { navigate, title, className } = this.props;
    return (
      <>
        <Row>
          <Col md={12}>
            <label className={className}>
              <BiArrowBack onClick={() => navigate(-1)} /> {title}
            </label>
          </Col>
        </Row>
        <Divider />
      </>
    );
  }
}

export default HeaderContent;
