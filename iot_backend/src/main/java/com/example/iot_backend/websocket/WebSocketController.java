package com.example.iot_backend.websocket;

import com.example.iot_backend.config.LocalDateTimeAdapter;
import com.example.iot_backend.entity.Action;
import com.example.iot_backend.mqtt.MqttService;
import com.example.iot_backend.mqtt.Mqttconst;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
public class WebSocketController {
    private final WebSocketService webSocketService;

    private final MqttService mqttService;
    Gson gson = new GsonBuilder()
            .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter())
            .create();
    @MessageMapping("/device")
    public void sendAction(@Payload Action action){
        try{
            mqttService.sendMessageToMqtt(Mqttconst.ACTION_TOPIC, gson.toJson(action));
        }catch (Exception e){
            throw  new RuntimeException(e);
        }
    }

}
