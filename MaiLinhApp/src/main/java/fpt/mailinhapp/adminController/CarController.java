package fpt.mailinhapp.adminController;

import fpt.mailinhapp.dto.XeDto;
import fpt.mailinhapp.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/cars")
@CrossOrigin
public class CarController {
    @Autowired
    CarService service;
    @Autowired
    LoaiXeService loaiXeService;

    @Autowired
    MapValidationErrorService errorService;

    @GetMapping
    public ResponseEntity getListCars(){
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity insertCar(@Validated @RequestBody XeDto dto, BindingResult result){
        ResponseEntity error = errorService.mapValidationField(result);

        if(error != null){
            return error;
        }

        var saveCar = service.createCar(dto);

        return new ResponseEntity<>(saveCar,HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity updateCar(@PathVariable String id, @Validated @RequestBody XeDto dto, BindingResult  result){
        ResponseEntity error = errorService.mapValidationField(result);

        if(error != null){
            return error;
        }

        service.updateCar(id, dto);

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteCar(@PathVariable String id){
        service.deleteCar(id);
        return new ResponseEntity<>("Xoá thành công xe có biển số" + id,HttpStatus.OK );
    }

}
