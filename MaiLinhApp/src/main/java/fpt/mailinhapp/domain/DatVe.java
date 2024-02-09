package fpt.mailinhapp.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "dat_ve")
public class DatVe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "dat_ve_gen")

    @Column(name = "ma_ve", nullable = false)
    private Long maVe;

    @Column(name = "so_luong")
    private Integer soLuong;

    @Column(name = "tong_tien")
    private Long tongTien;

    @Column(name = "noi_tra", length = 200)
    private String noiTra;

    @ElementCollection
    @Column(name = "cho_ngoi", length = 5)
    @CollectionTable(name = "dat_ve_choNgoi", joinColumns = @JoinColumn(name = "owner_id"))
    private List<String> choNgoi = new ArrayList<>();

    @ElementCollection
    @Column(name = "cho_ngoi", length = 5)
    @CollectionTable(name = "dat_ve_choNgoi2", joinColumns = @JoinColumn(name = "owner_id"))
    private List<String> choNgoi2 = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "chuyen_xe_ma_chuyen")
    private ChuyenXe chuyenXe;

    @ManyToOne
    @JoinColumn(name = "chuyen_xe_ma_chuyen2")
    private ChuyenXe chuyenXeVe;

    @OneToOne(orphanRemoval = true)
    @JoinColumn(name = "info_id")
    private Info info;

    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "DD-MM-YYYY")
    @Column(name = "ngay_dat_ve")
    private Date ngayDatVe;

    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "DD-MM-YYYY")
    @Column(name = "ngay_di")
    private Date ngayDi;






    @Temporal(TemporalType.DATE)
    @Column(name = "ngay_ve")
    @JsonFormat(pattern = "DD-MM-YYYY")
    private Date ngayVe;

    @OneToOne(orphanRemoval = true)
    @JoinColumn(name = "thanh_toan_id")
    private ThanhToan thanhToan;



    @PrePersist
    public void prePersist() {
        ngayDatVe = new Date();
    }
}