package fpt.mailinhapp.adminController;

import fpt.mailinhapp.dto.NoiTraDto;
import fpt.mailinhapp.service.MapValidationErrorService;
import fpt.mailinhapp.service.NoiTraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/noitra")
public class NoiTraController {
    @Autowired
    NoiTraService service;
    @Autowired
    MapValidationErrorService errorService;
    @GetMapping
    public ResponseEntity getAll(){
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity insertNoiTra(@Validated @RequestBody NoiTraDto dto, BindingResult result){
        ResponseEntity error = errorService.mapValidationField(result);

        if(error != null){
            return error;
        }
        var saveDto = service.insertNoiTra(dto);
        return new ResponseEntity<>(saveDto, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity updateNoiTra(@PathVariable Long id,@Validated @RequestBody NoiTraDto dto, BindingResult result){
        ResponseEntity error = errorService.mapValidationField(result);

        if(error != null){
            return error;
        }
        var saveDto = service.updateNoiTra(id,dto);
        return new ResponseEntity<>(saveDto, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteNoitra(@PathVariable Long id){
        service.deleteNoiTra(id);
        return new ResponseEntity<>("Xóa thành công", HttpStatus.OK);
    }
}
