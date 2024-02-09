package fpt.mailinhapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class FeedbackException extends RuntimeException{
    public FeedbackException(String message) {
        super(message);
    }
}
