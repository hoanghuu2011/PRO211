package fpt.mailinhapp.adminController;

import fpt.mailinhapp.dto.DatVeDto;
import fpt.mailinhapp.service.MapValidationErrorService;
import fpt.mailinhapp.service.VeXeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/tickets")
@CrossOrigin("*")
public class TicketsController {

    @Autowired
    VeXeService service;
    @Autowired
    MapValidationErrorService errorService;
    @PostMapping
    public ResponseEntity createTicket(@Validated @RequestBody DatVeDto dto, BindingResult result){

        ResponseEntity error = errorService.mapValidationField(result);
        if(error != null){
            return error;
        }

        var saveDto = service.createVe(dto);

        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity getAll(){
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public  ResponseEntity getVeXeChitiet(@PathVariable Long id){
        var found = service.findById(id);

        return new ResponseEntity<>(found, HttpStatus.OK);
    }

}
