package com.example.iot_backend.service;

import com.example.iot_backend.dtoResponse.DataSensorResponse;
import com.example.iot_backend.entity.DataSensor;
import com.example.iot_backend.exception.InvalidDateRangeException;
import com.example.iot_backend.repository.DataSensorRepo;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DataSensorService {
    private final DataSensorRepo dataSensorRepo;



//    public DataSensorResponse getAllDataSensor(
//            int pageNo, int pageSize,double minTemp,double maxTemp, double minHumi, double maxHumi,
//            double minLight, double maxLight, LocalDateTime startDate,
//            LocalDateTime endDate, String sortBy, String sortDir) {
//
//        if (startDate == null) {
//            startDate = LocalDateTime.of(1970, 1, 1, 0, 0);
//        }
//        if (endDate == null) {
//            endDate = LocalDateTime.now();
//        }
//        if (endDate.isBefore(startDate)) {
//            throw new InvalidDateRangeException();
//        }
//
//        Sort sort = null;
//
//        if (sortDir.equalsIgnoreCase("DESC")) {
//            sort = Sort.by(Sort.Direction.DESC, sortBy);
//        } else {
//            sort = Sort.by(Sort.Direction.ASC, sortBy);
//        }
//
//        // Tạo Pageable instance
//        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
//
//        Page<DataSensor> dataSensorPage = dataSensorRepo
//                .findAllByTemperatureBetweenAndHumidityBetweenAndLightBetweenAndTimeBetween(
//                        minTemp, maxTemp, minHumi, maxHumi, minLight, maxLight, startDate, endDate, pageable);
//
//        DataSensorResponse dataSensorResponse = new DataSensorResponse();
//        dataSensorResponse.setContent(dataSensorPage.getContent());
//        dataSensorResponse.setPageNo(dataSensorPage.getNumber() + 1);
//        dataSensorResponse.setPageSize(dataSensorPage.getSize());
//        dataSensorResponse.setTotalElements(dataSensorPage.getTotalElements());
//        dataSensorResponse.setTotalPages(dataSensorPage.getTotalPages());
//        dataSensorResponse.setLast(dataSensorPage.isLast());
//
//        return dataSensorResponse;
//    }


    public DataSensorResponse searchSensors(
            LocalDateTime startDate,
            LocalDateTime endDate,
            String searchBy,
            String operator,
            Double value1,
            Double value2,
            String sortBy,
            String sortDir,
            int pageNo,
            int pageSize) {
        if (startDate == null) {
            startDate = LocalDateTime.of(1970, 1, 1, 0, 0,0);
        }
        if (endDate == null) {
            endDate = LocalDateTime.now();
        }
        if (endDate.isBefore(startDate)) {
            throw new InvalidDateRangeException();
        }

        Sort sort = null;

        if (sortDir.equalsIgnoreCase("DESC")) {
            sort = Sort.by(Sort.Direction.DESC, sortBy);
        } else {
            sort = Sort.by(Sort.Direction.ASC, sortBy);
        }

        // Tạo Pageable instance
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);

        Page<DataSensor> dataSensorPage = null;
        if(operator==null){
            if (startDate.equals(endDate)) {
                dataSensorPage = dataSensorRepo.findAllByTimeEquals(startDate,pageable);
            }else{
                dataSensorPage = dataSensorRepo.getData(startDate,endDate,pageable);
            }


        }else{
            dataSensorPage = dataSensorRepo.filterData(startDate,endDate,searchBy,operator,value1,value2,pageable);
        }

        DataSensorResponse dataSensorResponse = new DataSensorResponse();
        dataSensorResponse.setContent(dataSensorPage.getContent());
        dataSensorResponse.setPageNo(dataSensorPage.getNumber() + 1);
        dataSensorResponse.setPageSize(dataSensorPage.getSize());
        dataSensorResponse.setTotalElements(dataSensorPage.getTotalElements());
        dataSensorResponse.setTotalPages(dataSensorPage.getTotalPages());
        dataSensorResponse.setLast(dataSensorPage.isLast());

        return dataSensorResponse;
    }
}
