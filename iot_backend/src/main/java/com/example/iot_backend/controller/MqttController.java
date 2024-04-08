//package com.example.iot_backend.controller;
//
//import com.example.iot_backend.dtoResponse.DataSensorResponse;
//import com.example.iot_backend.entity.ActionEnum;
//import com.example.iot_backend.MqttGateway;
//import com.example.iot_backend.entity.Action;
//import com.example.iot_backend.entity.DataSensor;
//import com.example.iot_backend.repository.ActionRepo;
//import com.example.iot_backend.repository.DataSensorRepo;
//import com.example.iot_backend.service.DataSensorService;
//import com.google.gson.Gson;
//import com.google.gson.JsonObject;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//
//@RestController
//@CrossOrigin(origins = "http://localhost:5173")
//@RequiredArgsConstructor
//@RequestMapping("/api")
//public class MqttController {
//    private final MqttGateway mqtGateway;
//
//    private final DataSensorService dataSensorService;
//
//    public final ActionRepo actionRepo;
//
//    public final DataSensorRepo dataSensorRepo;
//
//    @PostMapping("/sendMessage")
//    public ResponseEntity<?> publish(@RequestBody String mqttMessage){
//
//        try {
//            JsonObject convertObject = new Gson().fromJson(mqttMessage, JsonObject.class);
//            mqtGateway.sendToMqtt(
//                    convertObject.get("message").toString().replaceAll("\"", ""),
//                    convertObject.get("topic").toString().replaceAll("\"", ""));
//            return ResponseEntity.ok("Success");
//        }catch(Exception ex) {
//            ex.printStackTrace();
//            return ResponseEntity.ok("fail");
//        }
//    }
//
////    @PostMapping("/turnOnRedLed")
////    public ResponseEntity<?> turnOnRedLed() {
////        // Gửi yêu cầu bật đèn đỏ tới MQTT broker
////        mqtGateway.sendToMqtt("on", "control_led_red");
////        Action action = new Action("redled", ActionEnum.);
////        actionRepo.save(action);
////        return ResponseEntity.ok("Red LED turned on");
////    }
////
////    @PostMapping("/turnOffRedLed")
////    public ResponseEntity<?> turnOffRedLed() {
////        // Gửi yêu cầu tắt đèn đỏ tới MQTT broker
////        mqtGateway.sendToMqtt("off", "control_led_red");
////        Action action = new Action("redled",ActionEnum.OFF);
////        actionRepo.save(action);
////        return ResponseEntity.ok("Red LED turned off");
////    }
////    @PostMapping("/turnOnBlueLed")
////    public ResponseEntity<?> turnOnBlueLed() {
////        // Gửi yêu cầu bật đèn đỏ tới MQTT broker
////        mqtGateway.sendToMqtt("on", "control_led_blue");
////        return ResponseEntity.ok("Red LED turned on");
////    }
////
////    @PostMapping("/turnOffBlueLed")
////    public ResponseEntity<?> turnOffBlueLed() {
////        // Gửi yêu cầu tắt đèn đỏ tới MQTT broker
////        mqtGateway.sendToMqtt("off", "control_led_blue");
////        return ResponseEntity.ok("Red LED turned off");
////    }
//
//
////    @GetMapping("/getSensor")
////    public ResponseEntity<?> getSensorData() {
////        DataSensor data = dataSensorService.getLatestSensorData();
////        return ResponseEntity.ok(data);
////    }
////    @GetMapping("/getAllSensor")
////    public ResponseEntity<DataSensorResponse> getAllSensor(
////            @RequestParam(defaultValue = "0") int pageNo,
////            @RequestParam(defaultValue = "5") int pageSize,
////            @RequestParam(required = false) String sortBy,
////            @RequestParam(required = false) String sortDir
////    ) {
////        DataSensorResponse dataSensorResponse = dataSensorService.
////                getAllDataSensor(pageNo, pageSize, sortBy, sortDir);
////
////        if (dataSensorResponse == null || dataSensorResponse.getContent().isEmpty()) {
////            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
////        }
////
////        return new ResponseEntity<>(dataSensorResponse, HttpStatus.OK);
////    }
////
////    @GetMapping("/getAllAction")
////    public ResponseEntity<List<Action>> getAllActions() {
////        List<Action> histories = actionRepo.findAll();
////
////        if (histories.isEmpty()) {
////            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
////        }
////
////        return new ResponseEntity<>(histories, HttpStatus.OK);
////    }
//}
