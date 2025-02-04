export function formattedTime(dateTimeString) {
  // Phân tích cú pháp chuỗi thời gian
  let parsedTime = new Date(dateTimeString);

  // Lấy giá trị giờ, phút và giây
  let hours = parsedTime.getHours();
  let minutes = parsedTime.getMinutes();
  let seconds = parsedTime.getSeconds();

  // Định dạng giá trị giờ, phút và giây thành chuỗi với định dạng hh:mm:ss
  let formattedTime = `${hours}:${minutes}:${seconds}`;

  return formattedTime;
}
