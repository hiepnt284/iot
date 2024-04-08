package com.example.iot_backend.config;

import com.example.iot_backend.mqtt.MqttMessageListener;
import com.example.iot_backend.mqtt.Mqttconst;
import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MqttConfig {
    @Autowired
    private MqttMessageListener mqttMessageListener;
    @Bean
    public IMqttClient mqttClient() throws Exception {
        MqttConnectOptions options = new MqttConnectOptions();
        options.setAutomaticReconnect(true);
        options.setCleanSession(true);

        options.setUserName(Mqttconst.USERNAME);
        options.setPassword(Mqttconst.PASSWORD.toCharArray());

        IMqttClient mqttClient = new MqttClient(Mqttconst.MQTT_BROKER, Mqttconst.CLIENT_ID);
        mqttClient.connect(options);

        mqttClient.subscribe(Mqttconst.DATA_TOPIC, mqttMessageListener);
        mqttClient.subscribe(Mqttconst.ACTION_TOPIC, mqttMessageListener);

        return mqttClient;
    }
}
