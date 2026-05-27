# Boss Recruit (Boss直聘类) 全栈开发项目

这是一个基于高保真 Stitch 设计稿开发的**求职招聘类全栈 App 项目**。项目支持完整的用户认证、职位检索与多维筛选、候选人个人中心及简历管理、联合约束防重复投递及收藏夹等核心功能。

---

## 🏗 应用架构设计 (Project Structure)

本项目完全使用**英文命名规范**及**生产级标准**进行目录规划：
```bash
├── /backend          # Spring Boot 3.x 后端项目
│   ├── src/          # 核心代码 (Entity, DTO, Repository, Service, Security, Controller)
│   └── pom.xml       # Maven 配置文件
├── /frontend         # Flutter 移动端项目
│   ├── lib/          # Dart 源码 (main.dart, models.dart, services.dart 含拦截器与守卫)
│   └── pubspec.yaml  # Flutter 依赖与打包参数
├── /database         # MySQL 脚本
│   ├── schema.sql    # 数据库建表语句 (含唯一索引、外键约束)
│   └── data.sql      # 预置推荐职位、岗位详情、企业信息初始化脚本
└── README.md         # 项目部署、编译运行指南文件
```

---

## 🛠 后端服务配置与启动 (Backend Guide)

### 1. 软件依赖要求
- JDK 17
- Maven 3.8+
- MySQL 8.0+

### 2. 导入数据库
在本地 MySQL server 创建数据库并导入，执行如下命令：
```sql
CREATE DATABASE IF NOT EXISTS `boss_recruit_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
接着在控制台或 Navicat 中依次运行 `/database/schema.sql` 和 `/database/data.sql` 数据种子。

### 3. 配置数据库与 JWT
打开 `/backend/src/main/resources/application.yml` 进行核心参数调整：
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/boss_recruit_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true&characterEncoding=utf-8
    username: YOUR_MYSQL_USERNAME # 如: root
    password: YOUR_MYSQL_PASSWORD # 填写你的本地 MySQL 登录密码
```
- **JWT 安全秘钥** (`app.jwt.secret`)：默认已预置了符合 HS256 所要求的加密哈希安全字符。你可以按需替换它。
- **JWT 过期时效** (`app.jwt.expirationMs`)：配置默认值为 `604800000` 毫秒（即 7 天）。

### 4. 编译并启动后端
```bash
cd backend
mvn clean package -DskipTests
java -jar target/recruit-1.0.0.jar
```
后端应用通常运行在 `http://localhost:8080`，API 前缀为 `/api`。

---

## 📱 移动端配置与启动 (Frontend Guide)

### 1. 软件依赖要求
- Flutter SDK (>= 3.16.0)
- Android Studio / VS Code & Xcode (iOS)

### 2. 配置接口基准地址 (API_BASE_URL)
在 Flutter 中网络请求组件全部在 `/frontend/lib/services.dart` 下进行统一封装。你可以将 `baseUrl` 指向你的本地或局域网局外公网 IP（注意：在 Android 实机调试时，`localhost` 通常需映射成 `10.0.2.2` 或具体的局域网段）：
```dart
// /frontend/lib/services.dart
final Dio _dio = Dio(BaseOptions(
  baseUrl: 'http://localhost:8080/api', // 实机调试修改为本地 IP, 如 http://192.168.1.100:8080/api
  connectTimeout: const Duration(seconds: 10),
  receiveTimeout: const Duration(seconds: 10),
));
```

### 3. 运行 Flutter 客户端
```bash
cd frontend
flutter pub get
flutter run
```

---

## ✨ 核心亮点功能技术实现 (Core Highlights Explained)

1. **路由守卫 (Route Guard)**: 
   在 Flutter 中基于 `go_router` 实现了细粒度的拦截与判定，未登录状态下访问“个人名片”、“简历管理”或“我的收藏”将立即重定向至 `/login` 页。
2. **防重复投递与原子化事务 (Transactional Application Policy)**:
   后端使用了 `@Transactional` 加锁以及在 `Bookmark` 和 `Delivery` 关系表上建立了联合唯一约束。相同候选人投递同一特定职位将触发回滚，并返回标准的 `400 Bad Request` 格式化 JSON 数据，极其安全稳定。
3. **全局日志拦截器与统一报错异常拦截**:
   利用 `HandlerInterceptor` 记录每一次进入 API 的来源 IP 指针、动作及响应延时；配置 `@RestControllerAdvice` 拦截所有抛出异常。
