# PTITChatbot
#### Yêu cầu Server
-   Server chạy NodeJS phiên bản >= 8.x.x, MongoDB
-   Tên miền có cài sẵn SSL, có thể dùng Nginx để pass proxy qua ứng dụng NodeJS
-   Facebook Page
#### Cấu hình Facebook
Làm theo hướng dẫn [link này](https://developers.facebook.com/docs/messenger-platform/)
#### Cấu hình Server
1. Chỉnh sửa cấu hình trong file **/config/config.json**
    - SERVER_PORT           Port nơi Chatbot chạy, sau dùng Nginx pass proxy qua port này
    - SERVER_DOMAIN         Tên miền mà bạn chạy Chatbot
    - SECRET_KEY            Khoá bí mật dùng để đăng nhập trang quản lý tại https://chatbot.38w.biz
    - DB_CONNECT            Chuỗi kết nối cơ sở dữ liệu MongoDB
    - PAGE_ACCESS_TOKEN     Access Token của Page chạy Chatbot
    - PERSONA               Chứa Persona ID
    - WEBHOOK_VERIFY_TOKEN  TOKEN xác nhận webhook
2.  Chạy lệnh npm install để cài các thư viện cần thiết
3.  Chạy lệnh npm install -g pm2 để cài ứng dụng pm2
4.  Chạy lệnh pm2 run app để chạy app
5.  (Tuỳ Chọn) Cấu hình Nginx pass proxy qua cổng SERVER_PORT
#### Cấu hình webhook
-   **Callback URL** là https//SERVER_DOMhookwebhook
-   **Verify Token** là WEBHOOK_VERIFY_TOKEN
-   **Subscription Fields** tích chọn messages, messaging_postbacks, message_reads
#### All Done! Chatbot đã được cài đặt thành công
* Lưu ý: Để người khác có thể sử dụng chatbot bạn cần trải qua bước Reviews App.
* Xem hướng dẫn tại <https://developers.facebook.com/docs/messenger-platform/app-review>
