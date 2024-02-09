package fpt.mailinhapp.adminController;

import fpt.mailinhapp.dto.ChuyenXeDto;
import fpt.mailinhapp.dto.TuyenXeDto;
import fpt.mailinhapp.service.ChuyenXeService;
import fpt.mailinhapp.service.MapValidationErrorService;
import fpt.mailinhapp.service.TuyenXeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.Date;

@RestController
@CrossOrigin
@RequestMapping("api/v1/chuyen")
public class BusesController {
    @Autowired
    ChuyenXeService service;

    @Autowired
    MapValidationErrorService errService;

    @GetMapping
    public ResponseEntity fillAll(){
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity insertBuses(@Validated @RequestBody ChuyenXeDto dto, BindingResult result){
        ResponseEntity error = errService.mapValidationField(result);

        if(error != null){
            return error;
        }



        var saveBuses = service.instertChuyenXe(dto);

        return new ResponseEntity<>(saveBuses, HttpStatus.CREATED);
    }

    @PatchMapping("{id}")
    public ResponseEntity updateBuses(@PathVariable Long id, @Validated @RequestBody ChuyenXeDto dto,
                                      BindingResult result){
        ResponseEntity error = errService.mapValidationField(result);

        if(error != null){
            return error;
        }

        var saveBuses = service.updateChuyenXe(id, dto);

        return new ResponseEntity<>(saveBuses, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteBuses(@PathVariable Long id){
        service.deleteChuyen(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("nhanvien")
    public ResponseEntity getListNhanVienChuyen(){

        return new ResponseEntity<>(service.getListNhanVienByChuyen(), HttpStatus.OK);
    }



}
