
# IOT Project
Dự án IOT sử dụng mạch ESP8266, cảm biến dht11, quang trở để đo, quản lý nhiệt độ, độ ẩm và ánh sáng, kèm với bật tắt, quản lý 02 thiết bị: đèn và quạt:
- Thông tin về nhiệt độ, độ ẩm và ánh sáng sẽ được cảm biến thu lại ở phần cứng. Sau đó thông tin sẽ được xử lý ở server và hiển thị trực quan hoá trên giao diện web người dùng. 
- Người dùng có thể thực hiện chức năng bật/tắt các thiết bị đèn, quạt trên giao diện web, các yêu cầu sau đó sẽ được xử lý ở server và gửi về phần cứng để thực hiện yêu cầu.


## Deployment
## ***Server***


**Bước 1: Clone dự án ở repo**

```bash
  git clone https://github.com/hiepnt284/iot.git
```
**Bước 2: Setup JDK17, Maven (có thể bỏ qua nếu đã cài đặt)**
- Setup JDK17: `https://www.youtube.com/watch?v=ykAhL1IoQUM`
- Setup Maven: `https://www.youtube.com/watch?v=YTvlb6eny_0`

**Bước 3: Kết nối tới hệ quản trị cơ sở dữ liệu MySQL**
- Chỉnh sửa các thông tin tới database của bạn: url, username, password, driver trong file application.properties



**Bước 4: Build Spring Boot Project bằng Maven**
```bash
  mvn package
```
hoặc
```bash
  mvn install / mvn clean install
```
**Bước 5: Chạy ứng dụng Spring Boot sử dụng Maven**
```bash
  mvn spring-boot:run
```
## ***Client***
**Bước 1: Cài node_modules**
```bash
  npm i
```

**Bước 2: Chạy dự án**

```bash
  npm run dev
```

## ***Hardware ESP8266***
**Bước 1: Cài đặt Arduino và setup Arduino**
- Tham khảo cách làm: `http://arduino.vn/bai-viet/68-cai-dat-driver-va-arduino-ide`
  
**Bước 2: Cài đặt và setup MQTT Broker**
- Tham khảo cách làm: `https://ngocautomation.com/tai-va-cai-dat-mqtt-broker-mosquitto/`

**Bước 3: Kết nối và nạp code vào mạch ESP8266**



