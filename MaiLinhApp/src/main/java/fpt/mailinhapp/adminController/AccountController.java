package fpt.mailinhapp.adminController;

import fpt.mailinhapp.domain.TaiKhoan;
import fpt.mailinhapp.domain.VaiTro;
import fpt.mailinhapp.dto.TaiKhoanDto;
import fpt.mailinhapp.service.MapValidationErrorService;
import fpt.mailinhapp.service.TaiKhoanService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/acc")
@CrossOrigin
public class AccountController {

    @Autowired
    TaiKhoanService service;
    @Autowired
    MapValidationErrorService errService;

    @GetMapping
    public ResponseEntity getListAccount(){
        return new ResponseEntity(service.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity createAccount(@Validated @RequestBody TaiKhoanDto dto, BindingResult result){
        ResponseEntity error = errService.mapValidationField(result);

        if(error != null){
            return error;
        }


       dto.setVaiTro(VaiTro.ThanhVien);


        var saveDto = service.insertAccount(dto);

        return new ResponseEntity<>(saveDto, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteAccount(@PathVariable String id){
        service.deleteAccount(id);
        return new ResponseEntity<>("Đã xóa tài khoản "+id,HttpStatus.OK);
    }

    @PatchMapping("edit/{id}")
    public ResponseEntity editAccount(@PathVariable String id,@Validated @RequestBody TaiKhoanDto dto, BindingResult result){
        ResponseEntity error = errService.mapValidationField(result);

        if(error != null){
            return error;
        }

        var newDto = service.uploadAccount(id, dto);

        return new ResponseEntity<>(newDto, HttpStatus.OK);
    }
}
