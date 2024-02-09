package fpt.mailinhapp.adminController;

import fpt.mailinhapp.repository.ThanhVienRepository;
import fpt.mailinhapp.service.CustomerService;
import fpt.mailinhapp.service.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/cus")
@CrossOrigin

public class CustomerController {
    @Autowired
    CustomerService service;
    @Autowired
    MapValidationErrorService errorService;

    @GetMapping
    public ResponseEntity getList(){
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }



}
