package fpt.mailinhapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class CarsException extends RuntimeException{
    public CarsException(String message) {
        super(message);
    }
}
