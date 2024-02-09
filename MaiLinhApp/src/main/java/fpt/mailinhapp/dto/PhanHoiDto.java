package fpt.mailinhapp.dto;

import fpt.mailinhapp.domain.DanhGia;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link fpt.mailinhapp.domain.PhanHoi}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PhanHoiDto implements Serializable {
    Long id;
    String binhLuan;
    DanhGia danhGia;
    TaiKhoanDto taiKhoan;
    ChuyenXeDto chuyenXe;
}