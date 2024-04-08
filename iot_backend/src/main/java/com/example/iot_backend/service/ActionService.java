package com.example.iot_backend.service;


import com.example.iot_backend.dtoResponse.ActionResponse;
import com.example.iot_backend.entity.Action;
import com.example.iot_backend.exception.InvalidDateRangeException;
import com.example.iot_backend.exception.NoDataException;
import com.example.iot_backend.mqtt.MqttService;
import com.example.iot_backend.repository.ActionRepo;
import com.google.gson.Gson;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.RequestMapping;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
public class ActionService {
    private final ActionRepo actionRepo;
    private final MqttService mqttService;
    private final Gson gson;

    public ActionResponse getAllAction(int pageNo, int pageSize, LocalDateTime startDate, LocalDateTime endDate, String sortBy, String sortDir){
        if (startDate == null) {
            startDate = LocalDateTime.of(1970, 1, 1, 0, 0);
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

        Page<Action> actionPage = actionRepo.findAllByTimeBetween(startDate,endDate,pageable);

        ActionResponse actionResponse = new ActionResponse();
        actionResponse.setContent(actionPage.getContent());
        actionResponse.setPageNo(actionPage.getNumber() + 1);
        actionResponse.setPageSize(actionPage.getSize());
        actionResponse.setTotalElements(actionPage.getTotalElements());
        actionResponse.setTotalPages(actionPage.getTotalPages());
        actionResponse.setLast(actionPage.isLast());

        return actionResponse;
    }

    public void sendAction(Action action) {


        String message = gson.toJson(action);
        System.out.println(message);
        try {
            mqttService.sendMessageToMqtt("device/led", message);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    public List<Action> getLastAction() {
        List<Action> lastAction = actionRepo.getLastAction();
        if(lastAction.isEmpty()){
            throw  new NoDataException();
        }
        return  lastAction;
    }
}
