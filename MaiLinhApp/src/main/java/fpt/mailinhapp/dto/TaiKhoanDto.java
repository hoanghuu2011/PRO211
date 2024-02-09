package fpt.mailinhapp.dto;

import fpt.mailinhapp.domain.VaiTro;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaiKhoanDto implements Serializable {
    String tenTaiKhoan;
    String matKhau;
    VaiTro vaiTro;
    String newPassword;
    String email;

}
