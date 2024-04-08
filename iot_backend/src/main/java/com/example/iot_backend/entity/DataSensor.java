package com.example.iot_backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DataSensor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private double temperature;
    private double humidity;
    private double light;
    @JsonFormat(pattern="dd-MM-yyyy HH:mm:ss")
    private LocalDateTime time;


}
