import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  Select,
} from "antd";
import HeaderContent from "../common/HeaderContent";
import { connect } from "react-redux";
import {
  insterloaiXe,
  getloaiXe,
  clearloaiXe,
  updateloaiXe,
} from "../../redux/actions/actionLoaixe";

class AddOrEdit extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      loaiXe: {
        id: "",
        tenLoaiXe: "",
        soGhe: 0,
        loaiGhe: "",
      },
    };
  }
  componentDidMount = () => {
    const { id } = this.props.router.params;

    if (id) {
      this.props.getloaiXe(id);
    } else {
      this.props.clearloaiXe();
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.LoaiXe && prevState.loaiXe.id !== nextProps.LoaiXe.id) {
      return {
        ...prevState,
        loaiXe: nextProps.LoaiXe,
      };
    } else if (!nextProps.LoaiXe) {
      return {
        ...prevState,
        loaiXe: {
          id: "",
          tenLoaiXe: "",
          soGhe: 0,
          loaiGhe: "",
        },
      };
    }

    return null;
  }

  onSubmitForm = (values) => {
    const { navigate } = this.props.router;
    if (values.id != null) {
      this.props.insterloaiXe(values, navigate);
    } else {
      this.props.updateloaiXe(values.id, values, navigate);
    }
    console.log(values);
  };

  handleConfirmUpdate = () => {
    this.formRef.current.submit();
  };

  render() {
    const { navigate } = this.props.router;
    const { isLoading } = this.props;
    const { loaiXe } = this.state;
    return (
      <div>
        <HeaderContent
          title={loaiXe.id ? "Cập nhập loại xe" : "Thêm mới loại xe"}
          navigate={navigate}
        />
        <Form
          layout="vertical"
          className="Form"
          onFinish={this.onSubmitForm}
          key={loaiXe.id}
          ref={this.formRef}
          disabled={isLoading}
        >
          <Row>
            <Col md={12}>
              <Form.Item
                label="ID Loại Xe"
                name="id"
                initialValue={loaiXe.id}
                hidden={loaiXe.id ? false : true}
              >
                <Input readOnly></Input>
              </Form.Item>

              <Form.Item
                label="Tên Loại"
                name="tenLoai"
                initialValue={loaiXe.tenLoai}
                rules={[{ required: true, message: "Please input name" }]}
              >
                <Input></Input>
              </Form.Item>
              <Form.Item
                label="Số Ghế"
                name="soGhe"
                initialValue={loaiXe.soGhe}
                rules={[{ required: true, message: "Please input name" }]}
              >
                <InputNumber></InputNumber>
              </Form.Item>

              <Form.Item
                label="Loại Ghế"
                name="loaiGhe"
                initialValue={loaiXe.loaiGhe === "Giường" ? "Giường" : "Ngồi"}
              >
                <Select>
                  <Select.Option value="Giường">Giường</Select.Option>
                  <Select.Option value="Ngồi">Ngồi</Select.Option>
                </Select>
              </Form.Item>

              <Divider />
              {!loaiXe.id ? (
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{ float: "right" }}
                  loading={isLoading}
                >
                  Lưu
                </Button>
              ) : (
                <Popconfirm
                  title="Update the task"
                  description="Are you sure to update this task?"
                  onConfirm={this.handleConfirmUpdate}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    htmlType="button"
                    type="primary"
                    style={{ float: "right" }}
                    loading={isLoading}
                  >
                    Cập nhật
                  </Button>
                </Popconfirm>
              )}
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  LoaiXe: state.LoaiXeReducer.LoaiXe,
  isLoading: state.commonReducer.isLoading,
});
const mapDispatchToProps = {
  insterloaiXe,
  getloaiXe,
  clearloaiXe,
  updateloaiXe,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(AddOrEdit))
);
