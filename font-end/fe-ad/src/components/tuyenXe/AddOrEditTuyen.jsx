import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import HeaderContent from "../common/HeaderContent";
import { Button, Col, Divider, Row, Space, Steps } from "antd";
import CarService from "../../services/CarService";
import { SaveOutlined } from "@ant-design/icons";
import TuyenXeService from "../../services/TuyenXeService";
import { connect } from "react-redux";
import {
  insterTuyen,
  updateTuyen,
  clearTuyen,
} from "../../redux/actions/actionTuyenXe";
import FormTuyenXe from "./FormTuyenXe";
import { toast } from "react-toastify";
import TransferNoiTra from "./TransferNoiTra";

class AddOrEditTuyen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      tuyenXe: {},
      noiTra: [],
      listNoiTra: [],
    };
  }
  goNext = (values) => {
    this.setState({ ...this.state, tuyenXe: values, step: 1 });
  };
  goPrevi = () => {
    this.setState({ ...this.state, step: 0 });
  };

  componentDidMount = () => {
    this.loadData();
  };
  handleTargetKeysChange = (targetKeys) => {
    this.setState({ ...this.state, noiTra: targetKeys });
  };
  saveProduct = () => {
    const { tuyenXe, noiTra, listNoiTra } = this.state;
    const { navigate } = this.props.router;
    const nhanVienChon = listNoiTra.filter((item) => noiTra.includes(item.id));
    const newdata = { ...tuyenXe, noiTras: nhanVienChon };

    this.props.insterTuyen(newdata, navigate);
  };

  updateProduct = () => {
    const { navigate } = this.props.router;
    const { tuyenXe, noiTra, listNoiTra } = this.state;
    const nhanVienChon = listNoiTra.filter((item) => noiTra.includes(item.id));
    const newdata = { ...tuyenXe, noiTras: nhanVienChon };
    console.log(newdata);
    this.props.updateTuyen(tuyenXe.maTuyenXe, newdata, navigate);
  };

  loadData = async () => {
    const service = new TuyenXeService();
    const res = await service.getListNoiTra();
    res && res.data && this.setState({ ...this.state, listNoiTra: res.data });
  };

  render() {
    const { navigate } = this.props.router;
    const { step, listNoiTra } = this.state;
    const { tuyenXe } = this.props;

    return (
      <>
      <div>
        <HeaderContent
          title={
            tuyenXe && tuyenXe.maTuyenXe ? "Cập nhật tuyến" : "Thêm tuyến mới"
          }
          navigate={navigate}
        />

        <Row>
          <Col md={24}>
            <Steps
              current={step}
              items={[
                {
                  title: "Thông tin chuyến",
                },
                { title: "Nơi Trả", description: "Chọn Nơi trả cho tuyến xe" },
              ]}
            ></Steps>
          </Col>
        </Row>

        <Row>
          <Col md={24}>
            {step === 0 && (
              <>
                <Button
                  type="primary"
                  onClick={() => {
                    this.props.clearTuyen();
                  }}
                >
                  Mới
                </Button>
                <Divider></Divider>
                <FormTuyenXe
                  tuyenXe={tuyenXe}
                  goNext={this.goNext}
                ></FormTuyenXe>
              </>
            )}
            {step === 1 && (
              <>
                <TransferNoiTra
                  list={listNoiTra}
                  tuyenXe={tuyenXe}
                  handleTargetKeysChange={this.handleTargetKeysChange}
                />
                <Divider></Divider>
                <Row>
                  <Col md={24}>
                    <Divider></Divider>
                    <div style={{ float: "right" }}>
                      <Space>
                        <Button type="primary" onClick={this.goPrevi}>
                          Previous
                        </Button>
                        {tuyenXe && tuyenXe.maTuyenXe ? (
                          <Button type="primary" onClick={this.updateProduct}>
                            <SaveOutlined /> Update
                          </Button>
                        ) : (
                          <Button type="primary" onClick={this.saveProduct}>
                            <SaveOutlined /> Save
                          </Button>
                        )}
                      </Space>
                    </div>
                  </Col>
                </Row>
              </>
            )}
          </Col>
        </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  tuyenXe: state.TuyenXeReducer.tuyenXe,
});

const mapDispatchToProps = {
  insterTuyen,
  updateTuyen,
  clearTuyen,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddOrEditTuyen));
