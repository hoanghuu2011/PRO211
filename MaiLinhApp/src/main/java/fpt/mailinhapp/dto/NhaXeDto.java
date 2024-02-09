package fpt.mailinhapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link fpt.mailinhapp.domain.NhaXe}
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NhaXeDto implements Serializable {
    Long id;
    String tenNhaXe;
    String diaChiNhaXe;
    String sdt;
}