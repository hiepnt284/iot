package com.example.iot_backend.repository;

import com.example.iot_backend.entity.DataSensor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface DataSensorRepo extends JpaRepository<DataSensor, Integer> {

//    Page<DataSensor> findAllByTemperatureBetweenAndHumidityBetweenAndLightBetweenAndTimeBetween(
//            double minTemp, double maxTemp, double minHumi, double maxHumi, double minLight, double maxLight,
//            LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);

    @Query("SELECT d FROM DataSensor d WHERE d.time BETWEEN :startDate AND :endDate")
    Page<DataSensor> getData(
            LocalDateTime startDate,
            LocalDateTime endDate,
            Pageable pageable
    );

    Page<DataSensor> findAllByTimeEquals(
             LocalDateTime startDate,
            Pageable pageable
    );



    @Query("SELECT d FROM DataSensor d WHERE d.time BETWEEN :startDate AND :endDate AND " +
            "CASE " +
            "WHEN :searchBy = 'ALL' AND :operator = 'equal' THEN " +
            "(d.temperature = :value1 OR d.humidity = :value1 OR d.light = :value1) " +
            "WHEN :searchBy = 'ALL' AND :operator = 'greater' THEN " +
            "(d.temperature >= :value1 OR d.humidity >= :value1 OR d.light >= :value1) " +
            "WHEN :searchBy = 'ALL' AND :operator = 'less' THEN " +
            "(d.temperature <= :value1 OR d.humidity <= :value1 OR d.light <= :value1) " +
            "WHEN :searchBy = 'ALL' AND :operator = 'in range' THEN " +
            "((d.temperature >= :value1 AND d.temperature <= :value2) OR" +
            " (d.humidity >= :value1 AND d.humidity<= :value2) OR" +
            " (d.light >= :value1 AND d.light <= :value2)) " +
            "WHEN :searchBy = 'temperature' AND :operator = 'equal' THEN " +
            "(d.temperature = :value1) " +
            "WHEN :searchBy = 'temperature' AND :operator = 'greater' THEN " +
            "(d.temperature >= :value1) " +
            "WHEN :searchBy = 'temperature' AND :operator = 'less' THEN " +
            "(d.temperature <= :value1) " +
            "WHEN :searchBy = 'temperature' AND :operator = 'in range' THEN " +
            "(d.temperature >= :value1 AND d.temperature<=:value2) " +
            "WHEN :searchBy = 'humidity' AND :operator = 'equal' THEN " +
            "(d.humidity = :value1) " +
            "WHEN :searchBy = 'humidity' AND :operator = 'greater' THEN " +
            "(d.humidity >= :value1) " +
            "WHEN :searchBy = 'humidity' AND :operator = 'less' THEN " +
            "(d.humidity <= :value1) " +
            "WHEN :searchBy = 'humidity' AND :operator = 'in range' THEN " +
            "(d.humidity >= :value1 AND d.humidity<=:value2) " +
            "WHEN :searchBy = 'light' AND :operator = 'equal' THEN " +
            "(d.light = :value1) " +
            "WHEN :searchBy = 'light' AND :operator = 'greater' THEN " +
            "(d.light >= :value1) " +
            "WHEN :searchBy = 'light' AND :operator = 'less' THEN " +
            "(d.light <= :value1) " +
            "WHEN :searchBy = 'light' AND :operator = 'in range' THEN " +
            "(d.light >= :value1 AND d.light<=:value2) " +
            "WHEN :searchBy = 'wind' AND :operator = 'equal' THEN " +
            "(d.wind = :value1) " +
            "WHEN :searchBy = 'wind' AND :operator = 'greater' THEN " +
            "(d.wind >= :value1) " +
            "WHEN :searchBy = 'wind' AND :operator = 'less' THEN " +
            "(d.wind <= :value1) " +
            "WHEN :searchBy = 'wind' AND :operator = 'in range' THEN " +
            "(d.wind >= :value1 AND d.wind<=:value2) " +
            "END"
    )
    Page<DataSensor> filterData(
            LocalDateTime startDate,
            LocalDateTime endDate,
            String searchBy,
            String operator,
            Double value1,
            Double value2,
            Pageable pageable
    );



}
