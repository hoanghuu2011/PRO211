package fpt.mailinhapp.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.proxy.HibernateProxy;

import java.util.*;

@Getter
@Setter
@Entity
@Table(name = "chuyen_xe")
public class ChuyenXe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_chuyen", nullable = false)
    private Long maChuyen;
    @ManyToOne
    @JoinColumn(name = "tuyen_xe")
    private TuyenXe tuyenXe;
    @ManyToOne
    @JoinColumn(name = "xe")
    private Xe xe;

    @ManyToMany
    @JoinTable(name = "chuyen_xe_nhanViens",
            joinColumns = @JoinColumn(name = "chuyenXe_ma_chuyen"),
            inverseJoinColumns = @JoinColumn(name = "nhanViens_so_cccd"))
    private List<NhanVien> nhanViens = new ArrayList<>();


}
