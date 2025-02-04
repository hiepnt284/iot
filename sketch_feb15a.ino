#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"
#include <ArduinoJson.h>

#define DHT11Pin D2
#define DHTType DHT11
#define LED_1 "den"
#define LED_2 "quat"
DHT HT(DHT11Pin,DHTType);
float humi;
float tempC;
float tempF;
float wind;

const char *ssid = "Note11";
const char *password = "12345678";
const char *mqtt_server = "192.168.116.204";
const char *mqtt_username = "admin";  
const char *mqtt_password = "123";  
const int mqtt_port = 1886;

const char *data_topic = "Data";
const char *action_topic = "Action";

const int ledPinRed = D7;  
const int ledPinBlue = D3;  
const int lightSensorPin = A0;  


WiFiClient espClient;
PubSubClient client(espClient);

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
}

void callback(char *topic, byte *payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  char json[length + 1];
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
    json[i] = (char)payload[i];
  }
  json[length] = '\0';
  Serial.println();

  // Parse the JSON
  StaticJsonDocument<200> doc;
  deserializeJson(doc, json);

  // Extract values
  const char *device_name = doc["deviceName"];
  const char *state = doc["action"];

  Serial.print("Device: ");
  Serial.println(device_name);
  Serial.print("Action: ");
  Serial.println(state);


  if (strcmp(device_name, LED_1) == 0) {
    if (strncmp(state, "on",2) == 0) {
      digitalWrite(ledPinRed, HIGH);
    }
    if (strncmp(state, "off",3) == 0) {
      digitalWrite(ledPinRed, LOW);
    }
  }

   if (strcmp(device_name, LED_2) == 0) {
    if (strncmp(state, "on",2) == 0) {
      digitalWrite(ledPinBlue, LOW);
      
    } 
     if (strncmp(state, "off",3) == 0) {
      digitalWrite(ledPinBlue, HIGH);
    }
   }




    client.publish(action_topic, json);
}


void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");

    if (client.connect("ESP8266Client", mqtt_username, mqtt_password)) {
      Serial.println("connected");

      client.subscribe("device/led");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");

      delay(5000);
    }
  }
}

void setup() {
  pinMode(2, OUTPUT);
  digitalWrite(2, HIGH);

  pinMode(ledPinRed, OUTPUT);
  pinMode(ledPinBlue, OUTPUT);
  
  digitalWrite(ledPinBlue, HIGH);

  Serial.begin(115200);
  HT.begin();
  setup_wifi();


  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);


  client.subscribe("device/led");

}

unsigned long previousMillis = 0;  
const long publishInterval = 1000;  

void loop() {


  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  
  unsigned long currentMillis = millis();  


  if (currentMillis - previousMillis >= publishInterval) {

    previousMillis = currentMillis;

    int lightValue = analogRead(lightSensorPin);
    humi = HT.readHumidity();
    tempC = HT.readTemperature();
    tempF = HT.readTemperature(true);
    wind = rand() % 80;

    DynamicJsonDocument jsonDoc(1024);
    jsonDoc["temperature"] = tempC;
    jsonDoc["humidity"] = humi;
    jsonDoc["light"] = lightValue;
    jsonDoc["wind"] = wind;

    String jsonStr;
    serializeJson(jsonDoc, jsonStr);



    client.publish(data_topic, jsonStr.c_str());


  }
}

