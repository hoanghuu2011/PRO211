package fpt.mailinhapp.adminController;

import fpt.mailinhapp.service.ThongKeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("api/v1/thongke")
public class ThongKeController {
    @Autowired
    ThongKeService service;
    @GetMapping("doanhthu/nam")
    public ResponseEntity getDoanhThu(){
        Integer nam = 2024;
        var data = service.thongKeDoanhThuNam(nam);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
    @GetMapping("doanhthu/quy")
    public ResponseEntity getDoanhThuQuy(){
        Integer nam = 2024;
        var data = service.thongKeDoanhThuQuy(nam);
        return  new ResponseEntity<>(data, HttpStatus.OK);
    }
    @GetMapping("ve/nam")
    public ResponseEntity getVeNam(){
        Integer nam = 2024;
        var data = service.thongKeVeNam(nam);
        return  new ResponseEntity<>(data, HttpStatus.OK);
    }
    @GetMapping("ve/quy")
    public ResponseEntity getVeQuy(){
        Integer nam = 2024;
        var data = service.thongKeVeQuy(nam);
        return  new ResponseEntity<>(data, HttpStatus.OK);
    }
}
