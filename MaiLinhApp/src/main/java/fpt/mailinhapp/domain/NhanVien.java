package fpt.mailinhapp.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.proxy.HibernateProxy;

import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "nhan_vien")
public class NhanVien {
    @Id
    @Column(name = "so_cccd", nullable = false, length = 12)
    private String soCCCD;

    @Column(name = "ho_ten", nullable = false, length = 50)
    private String hoTen;

    @Column(name = "sdt", nullable = false, length = 11)
    private String sdt;

    @Column(name = "dia_chi", nullable = false, length = 100)
    private String diaChi;



    @OneToOne(orphanRemoval = true)
    @JoinColumn(name = "anh_da_luu_id")
    private AnhDaLuu anhDaLuu;

    @ManyToOne
    @JoinColumn(name = "nha_xe_id")
    private NhaXe nhaXe;

}