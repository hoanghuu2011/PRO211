package fpt.mailinhapp.adminController;

import fpt.mailinhapp.dto.TuyenXeDto;
import fpt.mailinhapp.service.MapValidationErrorService;
import fpt.mailinhapp.service.TuyenXeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/tuyen")
public class TuyenXeController {
    @Autowired
    TuyenXeService service;
    @Autowired
    MapValidationErrorService errorService;

    @GetMapping
    public ResponseEntity getList(){
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity insertTuyen(@Validated @RequestBody TuyenXeDto dto, BindingResult result){
        ResponseEntity error = errorService.mapValidationField(result);
        if(error != null){
            return error;
        }
        var saveDto = service.createBuses(dto);
        return new ResponseEntity<>(saveDto, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity updateTuyen(@PathVariable Integer id, @Validated @RequestBody TuyenXeDto dto, BindingResult result){
        ResponseEntity error = errorService.mapValidationField(result);
        if(error != null){
            return error;
        }
        var updateTuyen = service.updateBuses(id, dto);

        return new ResponseEntity(updateTuyen, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteTuyen(@PathVariable Integer id){
        service.deleteBuses(id);
        return new ResponseEntity<>("Xóa thành công", HttpStatus.OK);
    }

    @GetMapping("/noitra")
    public ResponseEntity getListNoiTra(){
        return new ResponseEntity<>(service.findAllTra(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity getById(@PathVariable Integer id){
        var found = service.findByid(id);
        return new ResponseEntity<>(found, HttpStatus.OK);
    }

}
