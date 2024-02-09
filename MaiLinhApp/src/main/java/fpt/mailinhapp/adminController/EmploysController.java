package fpt.mailinhapp.adminController;

import fpt.mailinhapp.dto.NhanVienDto;
import fpt.mailinhapp.service.MapValidationErrorService;
import fpt.mailinhapp.service.NhanVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/employs")
@CrossOrigin
public class EmploysController {
    @Autowired
    NhanVienService service;
    @Autowired
    MapValidationErrorService errorService;

    @GetMapping
    public ResponseEntity getAllList(){
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity insertEmploy(@Validated @RequestBody NhanVienDto dto, BindingResult result){
        ResponseEntity error = errorService.mapValidationField(result);

        if (error != null){
            return error;
        }

        var employ = service.createEmployee(dto);

        return new ResponseEntity<>(employ, HttpStatus.CREATED);
    }
    @PatchMapping("{id}")
    public ResponseEntity updateEmpoly(@PathVariable String id,
                                       @Validated @RequestBody NhanVienDto dto, BindingResult result){
        ResponseEntity error = errorService.mapValidationField(result);

        if (error != null){
            return error;
        }

        var empoly = service.updateEmploy(id, dto);

        return new ResponseEntity<>(empoly, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteEmploy(@PathVariable String id){
        service.deleteEmploy(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/nhaxe/{id}")
    public ResponseEntity getListByNhaXe(@PathVariable String id){
        return new ResponseEntity<>(service.findByNhaXe(id), HttpStatus.OK);
    }
}
