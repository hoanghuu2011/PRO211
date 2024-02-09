package fpt.mailinhapp.onlinePay;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResDto {
    private String status;
    private String message;
    private String url;
}
