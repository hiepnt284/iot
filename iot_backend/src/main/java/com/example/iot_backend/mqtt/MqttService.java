package com.example.iot_backend.mqtt;

import lombok.RequiredArgsConstructor;
import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MqttService {

    private final IMqttClient mqttClient;

    public void sendMessageToMqtt(String topic, String messageContent) throws Exception {
        MqttMessage message = new MqttMessage(messageContent.getBytes());
        mqttClient.publish(topic, message);
    }
}
