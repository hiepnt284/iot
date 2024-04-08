package com.example.iot_backend.repository;

import com.example.iot_backend.entity.DataSensor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface DataSensorRepo extends JpaRepository<DataSensor, Integer> {

    Page<DataSensor> findAllByTemperatureBetweenAndHumidityBetweenAndLightBetweenAndTimeBetween(
            double minTemp, double maxTemp, double minHumi, double maxHumi, double minLight, double maxLight,
            LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
}
