package fpt.mailinhapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link fpt.mailinhapp.domain.Info}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InfoDto implements Serializable {
    String email;
    Long id;
    String soDT;
    String hoTen;
}