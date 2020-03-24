"use strict";

module.exports = {
  "message": {
    /*
     *
     */
    "START": {
      "title": "Chào mừng bạn đến với PTIT Chatbot",
      "subtitle": "Mời bạn nhấn ❓ Help hoặc chat /help để biết cách sử dụng"
    },
    /*
     *
     */
    "TERM": {
      "title": "Thoả thuận sử dụng",
      "subtitle": "Bằng cách sử dụng Chatbot, bạn đã đồng ý với những điều khoản của Chatbot"
    },
    /*
     *
     */
    "REPORT_ASK": {
      "title": "Mời bạn nhập nội dung report",
      "subtitle": "Nếu ấn nhầm thì ấn huỷ"
    },
    "REPORT_CONFIRM": {
      "title": "Chúng tôi đã ghi nhận trường hợp này",
      "subtitle": "Chúng tôi sẽ kiểm tra và phản hồi.\n" +
        "Cảm ơn bạn"
    },
    "CANCEL_ACTION": {
      "title": "Bạn đã huỷ hành động",
      "subtitle": "Chúc bạn có một trải nghiệm tốt"
    },
    /*
     * CALENDAR
     */
    "CALENDAR_ASK": {
      "title": "Mời bạn nhập mã sinh viên",
      "subtitle": "Nếu ấn nhầm thì ấn huỷ"
    },
    "CALENDAR_CONFIRM": {
      "title": "Sinh viên: ",
      "subtitle": "Đây là file lịch học của bạn\n" +
        "Bạn có thể nhập nó vào ứng dụng Calendar"
    },
    "CALENDAR_FAIL": {
      "title": "Lấy lịch học không thành công",
      "subtitle": "Sai mã sinh viên"
    },
    "SEND_FAIL": {
      "title": "Không thể gửi tin nhắn tới đối",
      "subtitle": "Có thể đối đã chặn tin nhắn hoặc 24h rồi các bạn không nói chuyện"
    },
    /*
     *
     */
    "HELP": "Danh sách lệnh: \n"+
      " - /gender\n"+
      " --> Chọn giới tính của đối\n"+
      " - /find\n" +
      " --> Tìm người ghép cặp\n" +
      " - /end\n" +
      " --> Kết thúc session chat\n" +
      " - /help\n" +
      " --> Hiện help menu\n" +
      " - /info\n" +
      " --> Hiện thông tin tài khoản của bạn\n" +
      " - /report\n" +
      " --> Chức năng report\n"
  },
  "button": {
    "FIND": [{
      "type": "postback",
      "title": "Tìm đối mới",
      "payload": "FIND"
    }],
    /*
     *
     */
    "CANCEL_FIND": [{
      "type": "postback",
      "title": "Huỷ tìm đối",
      "payload": "END"
    }],
    /*
     *
     */
    "END": [{
      "type": "postback",
      "title": "Kết thúc chat",
      "payload": "END"
    }],
    /*
     *
     */
    "START": [
      {
        "type": "postback",
        "title": "❓ Help",
        "payload": "HELP"
      },
      {
        "type": "postback",
        "title": "Chọn giới tính đối",
        "payload": "SELECT_GENDER"
      },
      {
        "type": "postback",
        "title": "Tìm đối nuôn",
        "payload": "FIND"
      }
    ],
    /*
     *
     */
    "TERM":[
      {
        "type":"web_url",
        "url":"https://ptitchatbot.me/terms.pdf",
        "title":"Điều khoản dịch vụ"
      }
    ],
    /*
     *
     */
    "CANCEL_ACTION": [
      {
        "type": "postback",
        "title": "Huỷ",
        "payload": "CANCEL_ACTION"
      }
    ],
    "SELECT_GENDER": [
      {
        "type": "postback",
        "title": "Nam",
        "payload": "GENDER_MALE"
      },
      {
        "type": "postback",
        "title": "Nữ",
        "payload": "GENDER_FEMALE"
      },
      {
        "type": "postback",
        "title": "Tất cả",
        "payload": "GENDER_ALL"
      }
    ]
  },
  "gender_vi": {
    "male": "Nam",
    "female": "Nữ",
    "all": "Tất cả"
  }
};