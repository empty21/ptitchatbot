"use strict";

module.exports = {
  generic_template: {
    /*
     START MESSAGE
     */
    START: [
      {
        title: "Chào mừng bạn đến với PTIT Chatbot",
        subtitle: "Mời bạn nhấn ❓ Help hoặc chat /help để biết cách sử dụng",
        image_url: "https://ptitchatbot.me/img/logo.png"
      },
      {
        title: "Thoả thuận sử dụng",
        subtitle: "Bằng cách sử dụng Chatbot, bạn đã đồng ý với những điều khoản của Chatbot",
        image_url: "https://surchdigital.com/wp-content/uploads/2018/02/terms-of-service-text.png",
        buttons: [
          {
            type: "web_url",
            url: "https://ptitchatbot.me/terms.pdf",
            title: "Đọc điều khoản"
          }
        ]
      }
    ],
    /*
     REPORT MESSAGE
     */
    REPORT_ASK: [
      {
        title: "Mời bạn nhập nội dung report",
        subtitle: "Nếu ấn nhầm thì ấn huỷ"
      }
    ],
    REPORT_CONFIRM: [
      {
        title: "Chúng tôi đã ghi nhận trường hợp này",
        subtitle: "Chúng tôi sẽ kiểm tra và phản hồi.\n" +
          "Cảm ơn bạn"
      }
    ],
    END_ASK: [
      {
        title: "Bạn có chắc chắn muốn kết thúc chat?",
        subtitle: "Nếu không thì bỏ qua và tiếp tục chat"
      }
    ],
    GENDER_ASK: [
      {
        title: "Bạn muốn đối của mình là: ",
        subtitle: "Chọn 1 trong 3"
      }
    ],
    CANCEL_ACTION: [
      {
        title: "Bạn đã huỷ hành động",
        subtitle: "Chúc bạn có một trải nghiệm tốt"
      }
    ],
    /*
     * RESPONSE WHEN SEND FAILED
     */
    SEND_FAIL: [
      {
        title: "Không thể gửi tin nhắn tới đối",
        subtitle: "Có thể đối đã chặn tin nhắn hoặc đối đã không nhắn tin tới page trong 24h qua"
      }
    ],

  },
  /*
   * MESSAGE TYPE TEXT
   */
  "text": {
    /*
     * HELP MESSAGE RESPONSE
     */
    HELP: "Danh sách lệnh: \n"+
      " /gender\n"+
      " --> Chọn giới tính của đối\n"+
      " /find\n" +
      " --> Tìm người ghép cặp\n" +
      " /end\n" +
      " --> Kết thúc session chat\n" +
      " /help\n" +
      " --> Hiện help menu\n" +
      " /info\n" +
      " --> Hiện thông tin tài khoản của bạn\n" +
      " /report\n" +
      " --> Chức năng report\n"
  },
  quick_replies: {
    START: [
      {
        content_type: "text",
        title: "❓ Help",
        payload: "HELP"
      },
      {
        content_type: "text",
        title: "Chọn giới tính đối",
        payload: "SELECT_GENDER"
      },
      {
        content_type: "text",
        title: "Tìm đối luônn",
        payload: "FIND"
      }
    ],
    SELECT_GENDER: [
      {
        content_type: "text",
        title:"Nam",
        payload:"SELECT_GENDER_MALE",
      },
      {
        content_type: "text",
        title:"Nữ",
        payload:"SELECT_GENDER_FEMALE",
      },
      {
        content_type: "text",
        title:"Tất cả",
        payload:"SELECT_GENDER_ALL",
      }
    ],
    CANCEL_ACTION: [
      {
        content_type: "text",
        title: "Huỷ",
        payload: "CANCEL_ACTION"
      }
    ],
    FIND: [
      {
        content_type: "text",
        title: "Tìm đối mới",
        payload: "FIND"
      }
    ],
    CANCEL_FIND: [
      {
        content_type: "text",
        title: "Huỷ tìm đối",
        payload: "END_REQUEST"
      }
    ],
    END_ASK: [
      {
        content_type: "text",
        title: "Kết thúc chat",
        payload: "END_REQUEST"
      }
    ],
    END_CONFIRM: [
      {
        content_type: "text",
        title: "Xác nhận",
        payload: "END_CONFIRM"
      }
    ]
  },
  /*
   * Phiên âm tiếng Việt =)))
   */
  gender_vi: {
    male: "Nam",
    fle: "Nữ",
    all: "Tất cả"
  }
};