package com.example.iot_backend.mqtt;

import com.example.iot_backend.config.LocalDateTimeAdapter;
import com.example.iot_backend.entity.Action;
import com.example.iot_backend.entity.DataSensor;
import com.example.iot_backend.repository.ActionRepo;
import com.example.iot_backend.repository.DataSensorRepo;
import com.example.iot_backend.websocket.WebSocketService;
import com.example.iot_backend.websocket.WebsocketConst;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.RequiredArgsConstructor;
import org.eclipse.paho.client.mqttv3.IMqttMessageListener;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class MqttMessageListener implements IMqttMessageListener {

    private final DataSensorRepo dataSensorRepo;

    private final ActionRepo actionRepo;

    private final ObjectMapper objectMapper;

    private final WebSocketService webSocketService;

    private final Gson gson;

    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {
        System.out.println("Received message from topic " + topic + ": " + new String(message.getPayload()));
        if(topic.equals(Mqttconst.DATA_TOPIC)){
            DataSensor dataSensor = objectMapper.readValue(message.toString(), DataSensor.class);
            LocalDateTime time = LocalDateTime.now();
            dataSensor.setTime(time);
            dataSensorRepo.save(dataSensor);
        }
        if(topic.equals(Mqttconst.ACTION_TOPIC)){
            Action action = objectMapper.readValue(message.toString(), Action.class);
            LocalDateTime time = LocalDateTime.now();
            action.setTime(time);
            actionRepo.save(action);
            webSocketService.sendMessageToClient(WebsocketConst.DEVICE_TOPIC, gson.toJson(action));
        }
    }
}
