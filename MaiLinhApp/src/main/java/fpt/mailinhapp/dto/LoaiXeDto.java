package fpt.mailinhapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * DTO for {@link fpt.mailinhapp.domain.LoaiXe}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoaiXeDto implements Serializable {
    private Integer id;
    private String tenLoai;
    private Integer soGhe;
    private String loaiGhe;
}
