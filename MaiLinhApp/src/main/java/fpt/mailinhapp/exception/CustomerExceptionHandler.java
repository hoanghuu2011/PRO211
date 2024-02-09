package fpt.mailinhapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomerExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(FileNotFoundException.class)
    public final ResponseEntity<Object> handlaFileNotFoundException(FileNotFoundException ex, WebRequest request){
        ExceptionResponse er = new ExceptionResponse(ex.getMessage());

        return new ResponseEntity<>(er, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(FileStorageException.class)
    public final ResponseEntity<Object> handleFileStorageException(FileStorageException ex, WebRequest request){
        ExceptionResponse er = new ExceptionResponse(ex.getMessage());

        return new ResponseEntity<>(ex,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AccountException.class)
    public final  ResponseEntity<Object> handleAccountException(AccountException ex, WebRequest request){
        ExceptionResponse er = new ExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(er.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CustomerException.class)
    public final  ResponseEntity<Object> handleCusException(CustomerException ex, WebRequest request){
        ExceptionResponse er = new ExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(er.getMessage(),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BusesException.class)
    public final ResponseEntity handelBuses(BusesException ex, WebRequest request){
        ExceptionResponse er = new ExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(er.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(TicketsException.class)
    public final ResponseEntity handelBuses(TicketsException ex, WebRequest request){
        ExceptionResponse er = new ExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(er.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EmployeeException.class)
    public final ResponseEntity handelBuses(EmployeeException ex, WebRequest request){
        ExceptionResponse er = new ExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(er.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(FeedbackException.class)
    public final ResponseEntity handelBuses(FeedbackException ex, WebRequest request){
        ExceptionResponse er = new ExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(er.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CarsException.class)
    public final ResponseEntity handelBuses(CarsException ex, WebRequest request){
        ExceptionResponse er = new ExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(er.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
