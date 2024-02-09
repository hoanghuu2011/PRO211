package fpt.mailinhapp.respondata;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InfoDto {
    private String id;
    private String email;
    private String hoTen;
}
