package com.example.iot_backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "history")
public class Action {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String deviceName;

    @Enumerated(EnumType.STRING)
    private ActionEnum action;

    @JsonFormat(pattern="dd-MM-yyyy HH:mm:ss")
    private LocalDateTime time;



}
