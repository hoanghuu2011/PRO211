import SearchService from "../../services/SearchService";
import {
  FIELD_SET,
  LISTCHUYEN,
  LISTCHUYEN1,
  LISTCHUYEN2,
  LISTTUYEN_SET,
  NGAY_DI_SET,
  NGAY_VE_SET,
} from "./actionType";

const service = new SearchService();

export const loadDataField = () => async (dispatch) => {
  try {
    const res = await service.loadDataField();
    console.log(res);

    if (res.status === 200) {
      dispatch({
        type: FIELD_SET,
        payload: res.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const listSearchOneWay = (start, end, ngayDi) => async (dispatch) => {
  try {
    const data = { diemDi: start, diemDen: end, ngayDi: ngayDi };

    const res = await service.loadListChuyen(data);
    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: LISTCHUYEN,
        payload: res.data,
      });
      dispatch({
        type: NGAY_DI_SET,
        payload: ngayDi,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const listSearchReturn =
  (start, end, ngayDi, ngayVe) => async (dispatch) => {
    try {
      const data = { diemDi: start, diemDen: end, ngayDi: ngayDi , ngayVe: ngayVe};
      const res = await service.loadListChuyenReturn(data);
      console.log(res);
      if (res.status === 200) {
        dispatch({
          type: LISTCHUYEN1,
          payload: res.data.chuyen1,
        });
        dispatch({
          type: LISTCHUYEN2,
          payload: res.data.chuyen2,
        });
        dispatch({
          type: NGAY_DI_SET,
          payload: ngayDi,
        });
        dispatch({
          type: NGAY_VE_SET,
          payload: ngayVe,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const loadDataTuyen = () => async (dispatch) => {
  try {
    const res = await service.loadDataTuyen();
    console.log(res);

    if (res.status === 200) {
      dispatch({
        type: LISTTUYEN_SET,
        payload: res.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const listSearchByTuyen =
  (diemDi, diemDen, ngayDi) => async (dispatch) => {
    try {
      const data = { diemDi: diemDi, diemDen: diemDen, ngayDi:ngayDi };
      const res = await service.loadListChuyen(data);
      console.log(res);
      if (res.status === 200) {
        dispatch({
          type: LISTCHUYEN,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
