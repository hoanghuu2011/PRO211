package fpt.mailinhapp.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "thanh_vien")
public class ThanhVien {
    @Id
    @Column(name = "soDT", nullable = false, length = 13)
    private String soDT;

    @Column(name = "ho_ten", nullable = true, length = 50)
    private String hoTen;

    @Column(name = "dia_chi", length = 100)
    private String diaChi;

    @Column(name = "email", nullable = true, length = 50)
    private String email;


    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "DD-MM-YYYY")
    @Column(name = "ngay_tao")
    private Date ngayTao;

    @Column(name = "ngay_chinh_su")
    @JsonFormat(pattern = "DD-MM-YYYY")
    private Date ngayChinhSu;



    @OneToOne(orphanRemoval = true)
    @JoinColumn(name = "anh_da_luu_id")
    private AnhDaLuu anhDaLuu;

    @OneToOne(orphanRemoval = true)
    @JoinColumn(name = "tai_khoan")
    private TaiKhoan taiKhoan;

    @PrePersist
    public void prePersist() {
        ngayTao = new Date();
    }

    @PreUpdate
    public void preUpdate() {
        ngayChinhSu = new Date();
    }

}