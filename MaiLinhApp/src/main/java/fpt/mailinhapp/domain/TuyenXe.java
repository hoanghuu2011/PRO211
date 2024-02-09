package fpt.mailinhapp.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Getter
@Setter
@Entity
@Table(name = "tuyen_xe")
public class TuyenXe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_Tuyen_xe", nullable = false)
    private Integer maTuyenXe;

    @Column(name = "diem_di")
    private String diemDi;

    @Column(name = "diem_den", nullable = false, length = 100)
    private String diemDen;

    @Column(name = "noi_don")
    private String noiDon;

    @JsonFormat(pattern = "HH:mm")
    @Column(name = "tgian_di")
    private LocalTime tgDi;

    @JsonFormat(pattern = "HH:mm")
    @Column(name = "tgian_den")
    private LocalTime tgDen;


    @Column(name = "gia")
    private Long gia;

    @ManyToMany
    @JoinTable(name = "tuyen_xe_noiTras",
            joinColumns = @JoinColumn(name = "tuyenXe_ma_Tuyen_xe"),
            inverseJoinColumns = @JoinColumn(name = "noiTras_id"))
    private List<NoiTra> noiTras = new ArrayList<>();
}
