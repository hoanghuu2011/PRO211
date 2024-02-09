import React, { useState } from 'react';
import '../css/lichsugiaodich.css'
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';  
import history from '../image/dangnhap/History.svg';
import Menudangnhap from'./menudangnhap'// Import CSS cho DatePicker
function Lichsugiaodich() {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    return (
        <div className="border">
            <div className="" style={{height:'600px'}}>
                <div className="mr-1 p-3 mr-0 p-0">
                    <div className="grid grid-col-12 gap-0 gap-8">
                    <Menudangnhap/>
                    <div className="col-span-9 mt-6" style={{marginLeft:'12cm', marginTop:'40px'}}>
                    <div>
                      <div style={{ position: 'relative' }}>
                        <div className="flex-lichsumuave" style={{ backgroundColor: '#FEF6F3' }}>
                          <div>
                            <div className="text-center" style={{ marginLeft:'-20cm', fontSize: '15px', lineHeight: '18px', marginTop:'40px' }}>
                              Số dư ví
                            </div>
                            <div className="font-medium-giaodich" style={{marginLeft:'25px', marginTop:'-0.2cm'}}>0&nbsp;₫</div>
                          </div>
                        </div>
                        <div style={{ position: 'absolute', bottom: 0, right: 0, padding: '10px'}}>
                          <div className="cursor-pointer flex-col items-center">
                            <img src={history} alt="" width="60" style={{ marginBottom:'0.1cm'}} />
                            <div className="mt-3">Giao dịch</div>
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="mt-6 font-medium-lichsu" style={{marginLeft:'0.4cm'}}>
                        Lịch sử giao dịch
                      </div>
                      <div className="flex flex-wrap gap-6 pt-4">
                        <div style={{ display: 'flex' }}>
                          <div className="flex-1">
                            <label className="label2" style={{marginLeft:'-4cm'}}>Thời gian</label> <br />
                            <div className="form-outline datetimepicker">
                            <DatePicker.RangePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            format="DD/MM/YYYY" // Định dạng ngày/tháng/năm đầy đủ
                            showTimeSelect
                            timeFormat="HH:mm:ss"
                            id="datepicker"
                            style={{ width: '240px', height:'40px', marginLeft:'0.5cm' }}
                          />
                          
                            </div>
                          </div>
                          <div className="flex-1"style={{marginLeft:'-0.5cm'}}>
                            <label className="label2">Trạng thái</label> <br />
                            <select className="input-search item-start form-control" style={{ width: '137px', height:'40px', fontSize:'14px', lineHeight:'22px'}}>
                                <option value="1" style={{ color: '#bca8a8 !important' , fontSize:'14px', lineHeight:'22px'}}>Khởi tạo</option>
                              <option value="2" style={{ color: '#bca8a8 !important' , fontSize:'14px', lineHeight:'22px'}}>Chờ duyệt</option>
                              <option value="3" style={{ color: '#bca8a8 !important' , fontSize:'14px', lineHeight:'22px'}}>Hủy bỏ</option>
                              <option value="4" style={{ color: '#bca8a8 !important' , fontSize:'14px', lineHeight:'22px'}}>Đã duyệt</option>
                            </select>
                          </div>
                        </div>
                        <div />
                        <div className="flex items-center justify-center" style={{ paddingTop: '12px' }}>
                          <button
                            type="submit"
                            className="btn-lsgd"
                          >
                            <span role="img" aria-label="filter" className="anticon anticon-filter">
                            </span>
                            <span> Tìm</span>
                          </button>
                        </div>
                      </div>
                      <div style={{ paddingTop: '25px' }}>
                        <table style={{ tableLayout: 'fixed' }}>
                          <colgroup>
                            <col style={{ width: '140.137px' }} />
                            <col style={{ width: '116.787px' }} />
                            <col style={{ width: '291.962px' }} />
                            <col style={{ width: '140.137px' }} />
                            <col style={{ width: '140.175px' }} />
                            <col style={{ width: '8px' }} />
                          </colgroup>
                          <thead className="ant-table-thead">
                            <tr>
                              <th className="ant-table-cell text-center">Mã giao dịch</th>
                              <th className="ant-table-cell text-center">Số tiền</th>
                              <th className="ant-table-cell text-center">Nội dung</th>
                              <th className="ant-table-cell text-center">Thời gian</th>
                              <th className="ant-table-cell text-center">Trạng thái</th>
                              <th className="ant-table-cell ant-table-cell-scrollbar"></th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div className="ant-table-body" style={{ overflowY: 'scroll', maxHeight: '400px', border: '#111111' }}>
                        <div className="ant-empty">
                          <i className="fa-solid fa-database" style={{ fontSize: '30px', color: '#bca8a8', paddingTop: '100px' }}></i>
                          <div>No Data</div>
                        </div>
                      </div>
                    </div>
                  </div>
                
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Lichsugiaodich;
