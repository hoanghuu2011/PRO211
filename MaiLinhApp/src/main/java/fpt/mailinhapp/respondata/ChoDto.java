package fpt.mailinhapp.respondata;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChoDto {
    Long id;
    Date ngayDi;
    Date ngayVe;
}
