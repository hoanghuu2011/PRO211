package fpt.mailinhapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link fpt.mailinhapp.domain.AnhDaLuu}
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnhDaLuuDto implements Serializable {
    Long id;
    String tenAnh;
    String tenTep;
    String url;
    String status;

}