package com.example.iot_backend.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
@NoArgsConstructor
@Getter
@Setter
public class ErrorResponse {
    private List<String> message;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private LocalDateTime timeStamp;

    public ErrorResponse(List<String> message) {
        this.message = message;
        this.timeStamp = LocalDateTime.now();
    }
}
