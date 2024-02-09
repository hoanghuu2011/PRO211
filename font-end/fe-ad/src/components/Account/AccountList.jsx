import { Button, Image, Popconfirm, Space, Table, Tag, Tooltip } from "antd";
import Column from "antd/es/table/Column";
import React, { Component } from "react";
import { BiEdit, BiSolidTrash } from "react-icons/bi";
import { MdPreview } from "react-icons/md";

import AccountEdit from "./AccountEdit";
import ImagesService from "../../services/ImagesService";

export class AccountList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      selectedAcc: null,
      previewVisibleEdit: false,
    };
  }

  onOkUpdate = (data) => {
    this.closeAccEdit();
    this.props.onOkUpdateAcc(data);
  };

  colorTag = (data) => {
    switch (data.vaiTro) {
      case "ThanhVien":
        return "green";
      case "QuanLy":
        return "red";
      default:
        return "blue";
    }
  };

  showAccEdit = (acc) => {
    this.setState({ previewVisibleEdit: true, selectedAcc: acc });
  };

  closeAccEdit = () => {
    this.setState({ previewVisibleEdit: false, selectedAcc: null });
  };

  render() {
    const { acc } = this.props;
    console.log(acc);
    return (
      <>
        <Table dataSource={acc} rowKey="username">
          <Column
            title="Image"
            key="fileName"
            align="center"
            width={90}
            render={(_, record) => (
              <Space size="middle">
                {record.photoImage ? (
                  <Image
                    width="100%"
                    src={ImagesService.getProductImageUrl(
                      record.photoImage.fileName
                    )}
                  />
                ) : (
                  <Image
                    width="100%"
                    src="https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
                  />
                )}
              </Space>
            )}
          ></Column>

          <Column
            title="Tên Tài Khoản"
            key="soDT"
            dataIndex="soDT"
            align="center"
          ></Column>

          <Column
            title="Họ Tên"
            key="hoTen"
            dataIndex="hoTen"
            align="center"
          ></Column>
          <Column
            title="Địa Chỉ"
            key="diaChi"
            dataIndex="diaChi"
            align="center"
          ></Column>
          <Column
            title="Email"
            key="email"
            dataIndex="email"
            align="center"
          ></Column>
          <Column
            title="Chức Vụ"
            key="taiKhoan"
            dataIndex="taiKhoan"
            align="center"
            render={(_, data) => (
              <span>
                <Tag color={this.colorTag(data)} key={data.taiKhoan}>
                  {data.taiKhoan.vaiTro}
                </Tag>
              </span>
            )}
          ></Column>

          <Column
            title="Hành Động"
            key="hanhDong"
            align="center"
            width={200}
            render={(_, record) => (
              <Space size="middle">
                <Tooltip placement="top" title="Cập nhật" color="blue">
                  <Button
                    key={record.key}
                    type="link"
                    size="small"
                    onClick={() => this.showAccEdit(record.taiKhoan)}
                  >
                    <BiEdit color="blue" size={24} />
                  </Button>
                </Tooltip>
             
              </Space>
            )}
          ></Column>
        </Table>

        <AccountEdit
          onOkUpdate={this.onOkUpdate}
          visible={this.state.previewVisibleEdit}
          acc={this.state.selectedAcc}
          onClose={this.closeAccEdit}
        />
      </>
    );
  }
}

export default AccountList;
