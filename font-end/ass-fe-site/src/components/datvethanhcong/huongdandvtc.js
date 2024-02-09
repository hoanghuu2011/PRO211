import React from 'react';

import './dvtc.css'; 

const Huongdandvtc = () => {
  return (
   <>
   <article className="card-lenxe">
   <div className="body-lenxe">
     <div className="page-title-dv">
       <div className="" style={{marginLeft:'-1.2cm'}}>Hướng dẫn lên xe</div>
       <div className="title-lenxe" style={{width:'637px',textAlign: 'justify'}}>
         <span style={{ fontSize: '14px' ,fontWeight:'500',lineHeight:'21px',color:'black'}}>
           Bạn cần ra điểm đón trước 15 phút, đưa email xác nhận thanh toán của Vexere cho nhân viên văn phòng vé để đổi chứng từ giấy
         </span>
          <br />
         <span style={{ fontSize: '14px',fontWeight:'500',lineHeight:'21px',color:'black'}}>
           Khi lên xe, bạn xuất trình chứng từ giấy cho tài xế hoặc phụ xe.
         </span>
       </div>
     </div>
   </div>
 </article>

 
  </>
  );
};

export default Huongdandvtc;
