# 📐 Microservices Architecture Overview

This project follows a **microservices-based architecture** designed for scalability, modularity, and asynchronous communication between services.

![Architecture Diagram](path-to-your-diagram.png)

---

## 🧩 Components:

### 1. **Website (Frontend)**
- The main user interface that sends **HTTP requests** to the backend system.
- Communicates with the **Gateway** for all operations (e.g., CRUD on instruments, file uploads, user management).

---

### 2. **Gateway (API Gateway)**
- Acts as a **single entry point** for all client requests.
- Routes incoming requests to the appropriate **microservice** (Instrument Service, File Service, User Service).
- Provides:
  - Centralized **authentication/authorization** (if implemented).
  - **Load balancing** (if scaled horizontally).
  - Future support for **rate limiting** or **logging**.

---

### 3. **Instrument Service**
- Handles business logic related to **instruments** (e.g., creating, updating, deleting instruments).
- Stores instrument data in a **MySQL database**.
- Uses **OpenFeign** to communicate with:
  - **File Service** for uploading instrument-related images.
  - **User Service** to validate or retrieve user details.

---

### 4. **File Service**
- Manages **file uploads** and stores them in **Firebase** (cloud storage).
- Accepts file upload requests from:
  - **Instrument Service** (e.g., instrument images).
- Communicates with **User Service** via **OpenFeign** if needed (e.g., validating ownership of files).

---

### 5. **User Service**
- Handles user management (**registration**, **authentication**, **authorization**).
- Stores user data in a separate **MySQL database**.
- Provides APIs for:
  - Validating **JWT tokens**.
  - Retrieving **user information**.

---

## 🔄 **Communication Flow**

1. The **Website** sends requests to the **Gateway**.
2. The **Gateway** forwards the request to the corresponding microservice.
3. Microservices communicate **synchronously** with the Gateway but **asynchronously** with each other using **OpenFeign**.

---

## 🚀 **OpenFeign for Service-to-Service Communication**

- **OpenFeign** enables **declarative REST clients** in each service.
- Allows **asynchronous communication** between microservices without tightly coupling them:
  - Example: Instrument Service calls File Service via Feign to upload images.
  - Example: Instrument Service verifies a user by calling User Service via Feign.
- **Benefits**:
  - Services remain **loosely coupled**.
  - Simplifies REST calls between services.
  - Supports **load balancing** (if integrated with service discovery like Eureka).

---

## ⚙️ **Databases and Storage**

| Service           | Storage Solution        |
|-------------------|-------------------------|
| Instrument Service| MySQL                   |
| File Service      | Firebase (Cloud Storage)|
| User Service      | MySQL                   |
