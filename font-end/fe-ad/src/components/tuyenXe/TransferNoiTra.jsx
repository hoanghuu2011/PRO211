import React, { useEffect, useState } from "react";
import { Button, Transfer } from "antd";
const TransferNoiTra = (props) => {
  const [targetKeys, setTargetKeys] = useState([]);

  const handleChange = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
    handleTargetKeysChange(newTargetKeys);
  };
  const { list, handleTargetKeysChange, tuyenXe } = props;
  const data = list
    ? list.map((i) => ({
        key: i.id,
        title: i.noiTra,
      }))
    : [];

  useEffect(() => {
    const setByTuyen = () => {
      if (tuyenXe && tuyenXe.noiTras) {
        const dataNoiTra = tuyenXe.noiTras.map((i) => i.id);
        setTargetKeys(dataNoiTra);
      }
    };
    setByTuyen();
  }, [tuyenXe]);
  return (
    <Transfer
      dataSource={data}
      showSearch
      listStyle={{
        width: 250,
        height: 300,
      }}
      operations={["Thêm", "Xóa"]}
      targetKeys={targetKeys}
      onChange={handleChange}
      render={(item) => `${item.title}`}
    />
  );
};
export default TransferNoiTra;
