package fpt.mailinhapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

/**
 * DTO for {@link fpt.mailinhapp.domain.Xe}
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class XeDto implements Serializable {
    String bienSoXe;
    AnhDaLuuDto anhDaLuu;

    private LoaiXeDto loaiXe;
    NhaXeDto nhaXe;

}
