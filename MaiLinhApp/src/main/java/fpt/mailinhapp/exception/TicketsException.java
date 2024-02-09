package fpt.mailinhapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TicketsException extends RuntimeException{
    public TicketsException(String message) {
        super(message);
    }
}
