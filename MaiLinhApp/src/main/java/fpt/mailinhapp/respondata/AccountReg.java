package fpt.mailinhapp.respondata;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountReg {
    private String tenTaiKhoan;
    private String matKhau;
    private String hoTen;
    private String newPassword;
    private  String email;

}
