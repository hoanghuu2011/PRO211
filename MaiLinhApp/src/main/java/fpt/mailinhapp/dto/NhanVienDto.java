package fpt.mailinhapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link fpt.mailinhapp.domain.NhanVien}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NhanVienDto implements Serializable {
    String soCCCD;
    String hoTen;
    String sdt;
    String diaChi;
    AnhDaLuuDto anhDaLuu;
    private NhaXeDto nhaXe;


}
