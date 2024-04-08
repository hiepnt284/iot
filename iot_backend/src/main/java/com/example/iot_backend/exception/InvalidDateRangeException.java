package com.example.iot_backend.exception;

public class InvalidDateRangeException extends RuntimeException{
    public InvalidDateRangeException() {
        super("Invalid Date Range");
    }
}
