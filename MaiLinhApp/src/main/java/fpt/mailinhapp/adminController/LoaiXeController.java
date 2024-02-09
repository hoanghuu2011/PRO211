package fpt.mailinhapp.adminController;

import fpt.mailinhapp.dto.LoaiXeDto;
import fpt.mailinhapp.service.LoaiXeService;
import fpt.mailinhapp.service.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/loaixe")
@CrossOrigin
public class LoaiXeController {
    @Autowired
    LoaiXeService service;
    @Autowired
    MapValidationErrorService errorService;

    @GetMapping()
    public ResponseEntity getList(){
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity findById(@PathVariable Integer id){
        return new ResponseEntity<>(service.findById(id),HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity insertLoaiXe(@Validated @RequestBody LoaiXeDto dto, BindingResult result){
        ResponseEntity error = errorService.mapValidationField(result);

        if(error != null){
            return error;
        }
        var saveDto = service.insertLoaiXe(dto);

        return new ResponseEntity<>(saveDto, HttpStatus.CREATED);
    }

    @PatchMapping("{id}")
    public ResponseEntity updateLoaiXe(@PathVariable Integer id,@Validated @RequestBody LoaiXeDto dto, BindingResult result){
        ResponseEntity error = errorService.mapValidationField(result);

        if(error != null){
            return error;
        }
        var saveDto = service.updateLoaixe(id,dto);

        return new ResponseEntity<>(saveDto, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteLoaixe(@PathVariable Integer id){
        service.deleteLoai(id);
        return new ResponseEntity<>("Xóa thành công",HttpStatus.OK);
    }

}
