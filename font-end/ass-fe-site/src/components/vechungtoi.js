import React, { Component, useEffect, useState } from 'react';
import '../css/vechungtoi.css';
import vct1 from '../image/vechungtoi/vct1.png';
import vct2 from '../image/vechungtoi/vct2.png';
import vct3 from '../image/vechungtoi/vct3.png';
function Vechungtoi() {

  useEffect(() => {
    document.title = 'Về Chúng Tôi';

    return () => {
      document.title = 'Mai Linh Tour';
    };
  }, []);

  return (
    <div>
    <main>
      <div className="v_layout px-4">
        <div className="v_flex v_flex-col text-base">
          <div className="ck-content">
            <h3 style={{ textAlign: 'center' }}>
              <strong>“Chất lượng là danh dự”</strong>
            </h3>
            <p style={{ columnCount: 1 }}>
              Tập đoàn Phương Trang – FUTA Group được thành lập năm 2001. Với hoạt động kinh doanh chính trong lĩnh vực mua bán xe ô tô, vận tải hành khách, bất động sản và kinh doanh dịch vụ. Phương Trang dần trở thành cái tên quen thuộc đồng hành cùng người Việt trên mọi lĩnh vực.
            </p>
            <p style={{ columnCount: 1 }}>
              Trải qua hơn 20 năm hình thành và phát triển đặt khách hàng là trọng tâm, chúng tôi tự hào trở thành doanh nghiệp vận tải nòng cốt đóng góp tích cực vào sự phát triển chung của ngành vận tải nói riêng và nền kinh tế đất nước nói chung. Luôn cải tiến mang đến chất lượng dịch vụ tối ưu nhất dành cho khách hàng, Công ty Phương Trang được ghi nhận qua nhiều giải thưởng danh giá như “Thương hiệu số 1 Việt Nam, “Top 10 Thương hiệu nổi tiếng Việt Nam”, “Top 10 Dịch vụ hoàn hảo vì quyền lợi người tiêu dùng năm 2022”, “Top 10 Doanh nghiệp tiêu biểu Việt Nam”, “Top 10 thương hiệu, sản phẩm dịch vụ uy tín Việt Nam – ASEAN 2022” …
            </p>
          </div>
          <div className="mx-auto v_btnThem">
            Xem thêm <i className="fa-solid fa-chevron-down"></i>
          </div>
        </div>
        <div className="row pt-4">
          <div className="col-sm-6">
            <div className="v_img">
              <img src={vct1} alt="" />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb-6 text-v">TẦM NHÌN VÀ SỨ MỆNH</div>
            <div className="ck-content">
              <p style={{ columnCount: 1 }}>
                <strong>
                  <span style={{ color: '#ef5222' }}>BÁO ĐÁP TỔ QUỐC VÌ MỘT VIỆT NAM HÙNG CƯỜNG.</span>
                </strong>
                <br />
                Trở thành Tập Đoàn uy tín và chất lượng hàng đầu Việt Nam với cam kết:
              </p>
              <ul>
                <li>
                  <p style={{ columnCount: 1 }}>Tạo môi trường làm việc năng động, thân thiện.</p>
                </li>
                <li>
                  <p style={{ columnCount: 1 }}>Phát triển từ lòng tin của khách hàng.</p>
                </li>
                <li>
                  <p style={{ columnCount: 1 }}>Trở thành tập đoàn dẫn đầu chuyên nghiệp.</p>
                </li>
              </ul>
              <p style={{ columnCount: 1 }}>
                <strong>
                  <span style={{ color: '#ef5222' }}>Phương Trang</span>
                </strong>
                luôn phấn đấu làm việc hiệu quả nhất, để luôn cống hiến, đóng góp hết sức mình vì một Việt Nam hùng cường.
              </p>
            </div>
          </div>
        </div>
        <div className="row pt-4" >
          <div className="col-sm-6" >
            <div className="v_img"style={{marginLeft:'700px'}}>
              <img src={vct2} alt="" />
            </div>
          </div>
          <div className="col-sm-4">
              <div className="mb-6 text-v" style={{marginLeft:'-16cm', width:'350px'}}>GIÁ TRỊ CỐT LÕI</div>
              <div className="ck-content2">
                <p style={{ columnCount: 1 }}>
                <span style={{marginLeft:'-27cm'}} >
                  Giá trị cốt lõi – <strong><span style={{ color: '#ef5222'}}>Phương Trang</span></strong></span>
                  <ul style={{marginLeft:'-8cm'}}>
                  <li>
                    <p style={{ columnCount: 1, }}>
                      <strong>
                        <span style={{ color: '#ef5222' }}>Phương:</span>
                      </strong>
                      chữ “Phương” trong tiếng Hán nghĩa là Vuông, vật gì hình thể ngay thẳng đều gọi là phương.
                      thể hiện sự chính trực, phẩm chất đạo đức tốt đẹp. Mọi hành động của Phương Trang luôn thể hiện sự minh bạch, công bằng chính trực với đồng nghiệp, khách hàng, đối tác.
                    </p>
                  </li>
                  <li>
                    <p style={{ columnCount: 1 }}>
                      <strong>
                        <span style={{ color: '#ef5222' }}>Trang:</span>
                      </strong>
                      mang nghĩa To lớn, Tráng lệ. Hướng tới sự thành công vượt bậc, thể hiện ý chí, khát vọng thực hiện những mục tiêu lớn, đem lại giá trị lớn cho cộng động, cho xã hội.&nbsp;
                    </p>
                  </li>
                  <li>
                    <p style={{ columnCount: 1 }}>
                      <strong>
                        <span style={{ color: '#ef5222' }}>Phương Trang </span>
                      </strong>
                      với hàm nghĩa càng phát triển, càng to lớn lại càng phải “CHÍNH TRỰC”. Luôn là biểu tượng của sự phát triển dựa trên những giá trị đạo đức tốt đẹp nhất.
                    </p>
                  </li>
                </ul>
                </p>
                
              
            </div>
          </div>
        </div>
        <div className="row pt-4">
          <div className="col-sm-6">
            <div className="v_img">
            <img src={vct3} alt="" />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb-6 text-v">TRIẾT LÝ</div>
            <div className="ck-content">
              <p style={{ columnCount: 1 }}>
                Hội nhập và phát triển góp phần vào sự thịnh vượng của đất nước. Nguồn nhân lực chính là nhân tố then chốt, là tài sản lớn nhất của Công ty Phương Trang, chú trọng tạo ra môi trường làm việc hiện đại, năng động, thân thiện và trao cơ hội phát triển nghề nghiệp cho tất cả thành viên. Sự hài lòng của khách hàng là minh chứng cho chất lượng dịch vụ của Phương Trang. Không ngừng hoàn thiện và phát triển năng lực kinh doanh, Phương Trang thấu hiểu nhu cầu khách hàng, mang đến sản phẩm dịch vụ hoàn hảo, đáp ứng tối đa mong đợi của khách hàng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  );
}

export default Vechungtoi;
