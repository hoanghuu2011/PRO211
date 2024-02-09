import React, { useEffect, useState } from "react";
import { Transfer } from "antd";
import ChuyenXeService from "../../services/ChuyenXeService";
const TransferNhanVien = (props) => {
  const [listData, setListData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [listDisabled, setListDisabled] = useState([]);
  const { list, chuyen, handleTargetKeysChange } = props;
  console.log(list);
  const handleChange = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
    handleTargetKeysChange(newTargetKeys);
  };
  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  useEffect(() => {
    const loadData = async () => {
      const service = new ChuyenXeService();
      const nhanVienRes = await service.listDisabled();
      nhanVienRes && nhanVienRes.data && setListDisabled(nhanVienRes.data);
    };
    loadData();
  }, []);

  useEffect(() => {
    const loadListByChuyen = () => {
      if (chuyen && chuyen.nhanViens) {
        const newDisabled = listDisabled.filter((nv) =>
          chuyen.nhanViens.some((chuyenNV) => chuyenNV.soCCCD === nv.soCCCD)
        );
        setListDisabled(newDisabled);
        const targetList = chuyen.nhanViens.map((i) => i.soCCCD);

        setTargetKeys(targetList);
      }
    };
    loadListByChuyen();
  }, [chuyen]);

  useEffect(() => {
    const loadDisbaled = () => {
      if (listDisabled) {
        const newData = list.map((i) => ({
          key: i.soCCCD,
          title: i.hoTen,
          disabled: listDisabled.some((dis) => i.soCCCD === dis.soCCCD),
        }));
        if (targetKeys) {
          const newDataWithDisabled = newData.map((item) => ({
            ...item,
            disabled: targetKeys.includes(item.key) ? false : item.disabled,
          }));

          setListData(newDataWithDisabled);
        } else {
          setListData(newData);
        }
      } else {
        const data = list.map((i) => ({ key: i.soCCCD, title: i.hoTen }));
        setListData(data);
      }
    };
    loadDisbaled();
  }, [listDisabled]);
  return (
    <>
      <Transfer
        dataSource={listData}
        titles={["Source", "Target"]}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        render={(item) => item.title}
        oneWay
        style={{
          marginBottom: 16,
        }}
      />
    </>
  );
};
export default TransferNhanVien;
