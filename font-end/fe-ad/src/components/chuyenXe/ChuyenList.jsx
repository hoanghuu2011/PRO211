import { Button, Image, Popconfirm, Space, Table, Tooltip } from "antd";
import Column from "antd/es/table/Column";
import React, { Component } from "react";
import { BiEdit, BiSolidTrash } from "react-icons/bi";
import ImagesService from "../../services/ImagesService";
import { MdPreview } from "react-icons/md";
import withRouter from "../../helpers/withRouter";

class ChuyenList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      selectedCar: null,
    };
  }

  showProductDetail = (Car) => {
    this.setState({ previewVisible: true, selectedCar: Car });
  };

  closeProductDetail = () => {
    this.setState({ previewVisible: false, selectedCar: null });
  };

  render() {
    const { chuyens } = this.props;
    const reversedChuyens = [...chuyens].reverse();
    return (
      <>
        <Table dataSource={reversedChuyens} rowKey="maChuyen">
          <Column
            title="Mã chuyến xe"
            key="maChuyen"
            dataIndex="maChuyen"
            align="center"
          ></Column>

          <Column
            title="Tuyến xe"
            key="tuyenXe"
            dataIndex="tuyenXe"
            align="center"
            render={(text, record) => (
              <label>
                {record.tuyenXe.diemDi} - {record.tuyenXe.diemDen} ({record.tuyenXe.tgDi})
              </label>
            )}
          ></Column>

          <Column
            title="Biển số xe"
            key="xe"
            dataIndex="xe"
            align="center"
            render={(text, record) => <label>{record.xe.bienSoXe}</label>}
          ></Column>

          <Column
            title="Nhà xe"
            key="nhaXe"
            dataIndex="nhaXe"
            align="center"
            render={(text, record) => <label>{record.xe.nhaXe.tenNhaXe}</label>}
          ></Column>

          <Column
            title="Action"
            key="action"
            align="center"
            width={200}
            render={(_, record) => (
              <Space size="middle">
                <Tooltip placement="top" title="Cập nhật" color="blue">
                  <Button
                    key={record.key}
                    type="link"
                    size="small"
                    onClick={() => this.props.onEdit(record)}
                  >
                    <BiEdit color="blue" size={24} />
                  </Button>
                </Tooltip>
                <Tooltip placement="top" title="Xóa" color="red">
                  <Popconfirm
                    key={record.key}
                    title="Thông báo"
                    description="Bạn thực sự muốn xóa ?"
                    onConfirm={() => this.props.onConfirm(record)}
                    okText="Đúng"
                    cancelText="Không"
                  >
                    <Button type="link" danger>
                      <BiSolidTrash size={24}></BiSolidTrash>
                    </Button>
                  </Popconfirm>
                </Tooltip>
              </Space>
            )}
          ></Column>
        </Table>
      </>
    );
  }
}

export default withRouter(ChuyenList);
