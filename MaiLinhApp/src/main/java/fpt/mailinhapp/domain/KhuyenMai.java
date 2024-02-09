package fpt.mailinhapp.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "khuyen_mai")
public class KhuyenMai {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ma_khuyen_mai", nullable = false)
    private Long maKhuyenMai;

    @Column(name = "ten_khuyen_mai", length = 100)
    private String tenKhuyenMai;

    @Column(name = "mo_ta")
    private String moTa;

    @Temporal(TemporalType.DATE)
    @Column(name = "ngay_bat_dau")
    private Date ngayBatDau;

    @Temporal(TemporalType.DATE)
    @Column(name = "ngay_ket_thuc")
    private Date ngayKetThuc;

    @Column(name = "so_luong")
    private Integer soLuong;

    @Column(name = "muc_giam_gia")
    private Float mucGiamGia;

}