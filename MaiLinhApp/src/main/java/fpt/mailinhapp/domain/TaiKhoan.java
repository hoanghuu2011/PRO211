package fpt.mailinhapp.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "tai_khoan")
public class TaiKhoan {
    @Id
    @Column(name = "ten_tai_khoan", nullable = false, length = 30)
    private String tenTaiKhoan;

    @Column(name = "mat_khau", nullable = false, length = 30)
    private String matKhau;

    @Enumerated
    @Column(name = "vai_tro")
    private VaiTro vaiTro;

}