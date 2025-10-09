# 🎓 E-Learning App (React Native + Expo + Gemini AI + ZaloPay)

Ứng dụng **E-Learning** được xây dựng bằng **React Native (Expo)** — cung cấp nền tảng học trực tuyến toàn diện với tính năng **thanh toán ZaloPay**, **bảo mật JWT**, **bài quiz có AI giải thích**, và **chatbot học tập thông minh tích hợp Gemini**.
---

## 🚀 Tính năng nổi bật

### 👤 Người dùng & Bảo mật
- 🔐 **Đăng nhập / Đăng ký** (qua email, Google, hoặc số điện thoại)
- 🪪 **Phân quyền JWT**: Xác thực và phân quyền theo vai trò (Học viên / Giảng viên / Quản trị viên)
- 🔄 **Tự động làm mới token** giúp duy trì phiên đăng nhập bảo mật

### 💳 Thanh toán
- 💰 **Thanh toán khóa học bằng ZaloPay**
- 📜 Lưu lịch sử giao dịch & xác thực thanh toán thành công
- 🧾 Quản lý đơn hàng, hóa đơn, và xác minh giao dịch qua API backend

### 🧩 Học tập & Quiz
- 📚 Danh sách khóa học, nội dung bài học, và video
- 📝 **Làm bài quiz trắc nghiệm**
- 🤖 **Giải thích đáp án bằng Gemini AI** (Google Generative AI)
- 📈 Xem lại lịch sử làm bài, điểm số và tiến trình học tập

### 💬 Chatbot học tập (AI Assistant)
- 🧠 Tích hợp **Gemini AI** làm trợ lý ảo trong ứng dụng
- 👩‍🏫 Chatbot có thể:
  - Giải thích câu hỏi và khái niệm
  - Gợi ý khóa học phù hợp
  - Trả lời thắc mắc của học viên
- 🔊 Hỗ trợ hội thoại tự nhiên (text-based)

### 🎨 Giao diện & Trải nghiệm người dùng
- 🌗 Hỗ trợ **Dark/Light Mode** tự động (theo hệ thống)
- 🌐 Đa ngôn ngữ (🇻🇳 Tiếng Việt / 🇺🇸 English)
- 📱 Responsive, hiệu năng cao, mượt mà

---

## 🛠️ Công nghệ sử dụng

| Công nghệ | Mục đích |
|------------|----------|
| **React Native (Expo)** | Phát triển ứng dụng di động đa nền tảng |
| **TypeScript** | Giúp mã an toàn và dễ bảo trì |
| **Zustand** | Quản lý state nhẹ, thay thế Redux |
| **React Query** | Quản lý và cache dữ liệu từ API |
| **i18next** | Hỗ trợ đa ngôn ngữ |
| **Axios** | Gọi API backend |
| **Tailwind CSS RN / Custom StyleSheet** | Tùy chỉnh giao diện nhanh chóng |
| **Expo Router ** | Điều hướng giữa các màn hình |

---

## 📁 Cấu trúc thư mục

```bash
.
├── api/                     # Cấu hình và hàm gọi API
├── app/                     # Định nghĩa route khi dùng Expo Router
├── assets/
│   └── images/              # Ảnh, biểu tượng
├── components/
│   ├── common/              # Các component dùng chung (Button, Card, ...)
│   ├── screen/              # Component cho từng màn hình (Home, CourseDetail, ...)
│   ├── ui/                  # Thành phần UI nhỏ (Input, Modal, ...)
│   └── ThemeToggle.tsx      # Chuyển đổi chế độ sáng/tối
├── constants/               # Hằng số, giá trị dùng toàn cục
├── hooks/
│   └── queries/             # Custom hooks dùng React Query
├── lib/
│   ├── http.ts              # Cấu hình Axios
│   ├── react-query.ts       # Thiết lập React Query Client
│   ├── useColorScheme.tsx   # Hook xác định theme hệ thống
│   ├── utils.ts             # Hàm tiện ích
│   ├── i18n.ts              # Cấu hình i18n
│   ├── constants.ts         # Định nghĩa giá trị toàn cục
│   └── zustand-selectors.ts # Selector cho Zustand
├── locales/
│   ├── en.json              # Ngôn ngữ tiếng Anh
│   └── vi.json              # Ngôn ngữ tiếng Việt
├── schema/                  # Định nghĩa schema dữ liệu hoặc validation
├── stores/                  # Zustand stores (state management)
├── types/                   # Kiểu dữ liệu TypeScript
├── utils/                   # Các hàm tiện ích mở rộng
├── .env                     # Biến môi trường
├── app.json                 # Cấu hình Expo
├── babel.config.js          # Cấu hình Babel
├── expo-env.d.ts            # Định nghĩa type cho biến môi trường
├── global.css               # Cấu hình style toàn cục
└── index.js / App.tsx       # Điểm khởi đầu của ứng dụng

## ⚙️ Cài đặt & Cấu hình

### 1️⃣ Cài đặt môi trường

Node.js >= 18

Expo CLI:

npm install -g expo-cli

### 2️⃣ Cài đặt dependencies
npm install
# hoặc
yarn install

### 3️⃣ Tạo file .env
API_URL=https://your-api-url.com

### 4️⃣ Chạy ứng dụng
npm start
# hoặc
expo start

### 👨‍💻 Nhóm phát triển
Quân - FE develop
