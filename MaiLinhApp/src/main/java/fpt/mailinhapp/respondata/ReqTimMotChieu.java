package fpt.mailinhapp.respondata;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReqTimMotChieu {
    private String diemDi;
    private String diemDen;
    private LocalTime tgDi;
    private LocalDate ngayDi;
    private LocalDate ngayVe;
}
