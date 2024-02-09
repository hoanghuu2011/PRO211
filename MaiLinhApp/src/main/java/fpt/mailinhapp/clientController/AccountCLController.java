package fpt.mailinhapp.clientController;

import fpt.mailinhapp.domain.ThanhVien;
import fpt.mailinhapp.domain.VaiTro;

import fpt.mailinhapp.dto.TaiKhoanDto;
import fpt.mailinhapp.dto.ThanhVienDto;
import fpt.mailinhapp.respondata.AccountReg;
import fpt.mailinhapp.service.CustomerService;
import fpt.mailinhapp.service.MapValidationErrorService;
import fpt.mailinhapp.service.TaiKhoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import fpt.mailinhapp.exception.AccountException;

@RestController
@RequestMapping("api/v2/acc")
@CrossOrigin
public class AccountCLController {
    @Autowired
    TaiKhoanService service;
    @Autowired
    MapValidationErrorService errorService;
    @Autowired
    CustomerService customerService;

    @PostMapping("reg")
    public ResponseEntity createAcc(@Validated @RequestBody AccountReg dto, BindingResult result){
        ResponseEntity error = errorService.mapValidationField(result);

        if(error != null){
            return error;
        }
        TaiKhoanDto tkDto = new TaiKhoanDto(dto.getTenTaiKhoan(), dto.getMatKhau(), VaiTro.ThanhVien, dto.getNewPassword(), dto.getEmail());

        var newDto = service.insertAccount(tkDto);


        ThanhVienDto tv = new ThanhVienDto();
        tv.setTaiKhoan(tkDto);
        tv.setSoDT(dto.getTenTaiKhoan());
        tv.setTaiKhoan(newDto);
        tv.setEmail(dto.getEmail());
        tv.setHoTen(dto.getHoTen());




        customerService.insertCustomers(tv);

        System.out.println(tv.getTaiKhoan().getTenTaiKhoan());

       var saveTV = customerService.insertCustomers(tv);

        System.out.println(saveTV.getTaiKhoan().getTenTaiKhoan());




        return new ResponseEntity<>(newDto, HttpStatus.CREATED);
    }

    @PostMapping
    public ResponseEntity loginAcc(@Validated @RequestBody TaiKhoanDto dto, BindingResult result){
        ResponseEntity error = errorService.mapValidationField(result);

        if(error != null){
            return error;
        }
        var newDto = service.CheckLogin(dto);

        return new ResponseEntity<>(newDto,HttpStatus.ACCEPTED);
    }
    @PostMapping("changepassword/{id}")
    public ResponseEntity changePassword(@PathVariable String id, @RequestBody TaiKhoanDto dto) {
        try {
            service.changePassword(id, dto);
            return new ResponseEntity<>("Đổi mật khẩu thành công !!!", HttpStatus.OK);
        } catch (AccountException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
