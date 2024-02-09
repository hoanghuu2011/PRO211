package fpt.mailinhapp.adminController;

import fpt.mailinhapp.dto.PhanHoiDto;
import fpt.mailinhapp.service.MapValidationErrorService;
import fpt.mailinhapp.service.PhanHoiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/fb")
public class FeedbackController {
    @Autowired
    PhanHoiService service;
    @Autowired
    MapValidationErrorService errorService;

    @PostMapping
    public ResponseEntity createFeedback(@Validated @RequestBody PhanHoiDto dto, BindingResult result){
        ResponseEntity error = errorService.mapValidationField(result);

        if(error != null){
            return error;
        }

        var saveFB = service.createFeedback(dto);

        return new ResponseEntity<>(saveFB, HttpStatus.CREATED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteFeedback(@PathVariable Long id){
        service.deleteFeedback(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity findAll(){
        return new ResponseEntity<>(service.findAll(),HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity getListByAccount(@PathVariable String id){
        return new ResponseEntity<>(service.findByAccount(id),HttpStatus.OK);
    }
}
