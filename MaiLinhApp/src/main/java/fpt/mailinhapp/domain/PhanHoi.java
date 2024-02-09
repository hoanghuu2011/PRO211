package fpt.mailinhapp.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "phan_hoi")
public class PhanHoi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "binh_luan")
    private String binhLuan;

    @Enumerated
    @Column(name = "danh_gia")
    private DanhGia danhGia;

    @ManyToOne
    @JoinColumn(name = "tai_khoan")
    private TaiKhoan taiKhoan;

    @ManyToOne
    @JoinColumn(name = "ma_chuyen")
    private ChuyenXe chuyenXe;

}