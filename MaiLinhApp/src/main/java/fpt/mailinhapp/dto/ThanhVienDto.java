package fpt.mailinhapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThanhVienDto implements Serializable {
    String soDT;
    String hoTen;
    String diaChi;
    String email;

    TaiKhoanDto taiKhoan;
    AnhDaLuuDto anhDaLuu;
}
