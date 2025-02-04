package com.example.iot_backend.controller;

import com.example.iot_backend.dtoResponse.DataSensorResponse;
import com.example.iot_backend.exception.NoDataException;
import com.example.iot_backend.service.DataSensorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@Tag(name = "DataSensor")
@RequestMapping("/api")
public class DataSensorController {

    private final DataSensorService dataSensorService;


    @GetMapping("/datasensors")
    @Operation(description = "Lấy giá trị cảm biến lọc theo các điều kiện", summary = "Lấy giá trị cảm biến")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lấy giá trị thành công"),
            @ApiResponse(responseCode = "404", description = "Không có giá trị", content = @Content)
    })


    public ResponseEntity<DataSensorResponse> searchSensors(
            @RequestParam( required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startDate,
            @RequestParam( required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")  LocalDateTime endDate,

            @RequestParam(required = false, defaultValue = "ALL") String searchBy,
            @RequestParam(required = false) String operator,
            @RequestParam(required = false) Double value1,
            @RequestParam(required = false) Double value2,

            @RequestParam(required = false, defaultValue = "id") String sortBy,
            @RequestParam(required = false, defaultValue = "DESC") String sortDir,
            @RequestParam(required = false,defaultValue = "1") int pageNo,
            @RequestParam(required = false,defaultValue = "5") int pageSize

    ){

        DataSensorResponse dataSensorResponse = dataSensorService.searchSensors(
                startDate,
                endDate,
                searchBy,
                operator,
                value1,
                value2,
                sortBy,
                sortDir,
                pageNo,
                pageSize
                );



        return new ResponseEntity<>(dataSensorResponse, HttpStatus.OK);
    }



//    public ResponseEntity<DataSensorResponse> getSensors(
//            @RequestParam(required = false,defaultValue = "1") int pageNo,
//            @RequestParam(required = false,defaultValue = "5") int pageSize,
//            @RequestParam(required = false,defaultValue = "0") double minTemp,
//            @RequestParam(required = false,defaultValue = "100") double maxTemp,
//            @RequestParam(required = false,defaultValue = "0") double minHumi,
//            @RequestParam(required = false,defaultValue = "100") double maxHumi,
//            @RequestParam(required = false,defaultValue = "0") double minLight,
//            @RequestParam(required = false,defaultValue = "1024") double maxLight,
//            @RequestParam(required = false, defaultValue = "id") String sortBy,
//            @RequestParam(required = false, defaultValue = "DESC") String sortDir,
//            @RequestParam(name = "startDate", required = false) @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss") LocalDateTime startDate,
//            @RequestParam(name = "endDate", required = false) @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss")  LocalDateTime endDate
//    )
//    {
//        DataSensorResponse dataSensorResponse = dataSensorService.getAllDataSensor(pageNo,pageSize,minTemp,maxTemp,minHumi,maxHumi,
//                minLight,maxLight,startDate,endDate,sortBy,sortDir);
//
//        if (dataSensorResponse == null || dataSensorResponse.getContent().isEmpty()) {
//            throw  new NoDataException();
//        }
//
//        return new ResponseEntity<>(dataSensorResponse, HttpStatus.OK);
//    }
}
