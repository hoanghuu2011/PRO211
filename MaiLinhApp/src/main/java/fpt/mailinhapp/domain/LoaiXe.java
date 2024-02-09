package fpt.mailinhapp.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "loai_xe")
public class LoaiXe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "ten_loai", length = 50)
    private String tenLoai;

    @Column(name = "so_ghe")
    private Integer soGhe;

    @Column(name = "loai_ghe", length = 50)
    private String loaiGhe;

}