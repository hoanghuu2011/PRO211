package fpt.mailinhapp.dto;

import fpt.mailinhapp.domain.NhanVien;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * DTO for {@link fpt.mailinhapp.domain.ChuyenXe}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChuyenXeDto implements Serializable {
    Long maChuyen;
    private List<NhanVienDto> nhanViens = new ArrayList<>();
    Integer tuyenXe;
    String xe;
    XeDto xedto;
    NhanVienDto nhanvien;

}
