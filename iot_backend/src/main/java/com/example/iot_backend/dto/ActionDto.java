package com.example.iot_backend.dto;

import com.example.iot_backend.entity.ActionEnum;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ActionDto {
    private String deviceName;

    @Enumerated(EnumType.STRING)
    private ActionEnum action;
}
