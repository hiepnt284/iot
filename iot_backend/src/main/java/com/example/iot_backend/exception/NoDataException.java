package com.example.iot_backend.exception;

public class NoDataException extends RuntimeException{
    public NoDataException(){
        super("No data");
    }
}
