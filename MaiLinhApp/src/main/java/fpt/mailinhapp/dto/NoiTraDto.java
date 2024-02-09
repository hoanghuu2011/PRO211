package fpt.mailinhapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * DTO for {@link fpt.mailinhapp.domain.NoiTra}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NoiTraDto implements Serializable {
    private Long id;
    private String noiTra;
}