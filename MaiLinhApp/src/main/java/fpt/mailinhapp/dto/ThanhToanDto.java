package fpt.mailinhapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * DTO for {@link fpt.mailinhapp.domain.ThanhToan}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ThanhToanDto implements Serializable {
    private String id;
    private Long amount;
    private String bank;
    private String orderInfo;
    private LocalDateTime payDate;
    private Boolean status;

}
