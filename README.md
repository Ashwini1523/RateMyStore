# RateMyStore

RateMyStore is a full-stack web application that allows users to rate and review stores. The project is divided into two main parts: `frontend` and `backend`. This README provides instructions on how to set up and run the project successfully on any system.

## Features
- User authentication with JWT
- Store rating and review system
- Responsive UI built with Bootstrap
- Backend powered by Node.js, Express, and MySQL

## Project Structure
```
RateMyStore/
│-- frontend/   # React frontend
│-- backend/    # Node.js backend with Express and MySQL
```

## Prerequisites
Ensure you have the following installed on your system:
- Node.js (v14 or later)
- MySQL Database

---

## Installation & Setup

### 1. Clone the Repository
```sh
git clone https://github.com/your-username/RateMyStore.git
cd RateMyStore
```

### 2. Backend Setup
```sh
cd backend
npm install
```

#### Configure the Database
- Update the `.env` file with your MySQL database credentials:

```env
PORT=5000
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_HOST=your_mysql_host
DB_PORT=3306
DB_NAME=your_database_name
JWT_SECRET=your_secret_key
```

> **Note:** Make sure to replace the values with your own MySQL database information.

#### Run the Backend Server
```sh
npm start
```

This will start the backend server on `http://localhost:5000`.

---

### 3. Frontend Setup
```sh
cd ../frontend
npm install
npm install bootstrap axios
```

#### Run the Frontend Application
```sh
npm start
```

This will start the React frontend on `http://localhost:3000`.

---

## API Endpoints
Here are some key API endpoints:

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive a token

### Store Ratings
- `GET /api/stores` - Get all stores
- `POST /api/stores/rate` - Rate a store (Requires authentication)

---

## Expected Output Screenshots
### 1. Home Page
![Home Page]
![image](https://github.com/user-attachments/assets/a4599188-af7d-495c-9561-f261359fe312)
![image](https://github.com/user-attachments/assets/f9fdbdff-9cc0-4e29-87af-3b5b7d55d10e)
![image](https://github.com/user-attachments/assets/7c07ed63-8459-4866-a971-40ecf00246b4)
![image](https://github.com/user-attachments/assets/caabe26c-84e8-4fbf-9fec-19ad6f08431d)


### 2. Store Listing
![image](https://github.com/user-attachments/assets/4b3e983d-803c-47ef-a02b-3a24d365ab6f)
![image](https://github.com/user-attachments/assets/ed41ef99-8e29-4828-925e-97490b068521)


![image](https://github.com/user-attachments/assets/f08f8870-67c0-4042-aee0-3a154b063f4b)
![image](https://github.com/user-attachments/assets/46c5bed4-0f27-4fa3-a370-3ae50832ac57)


### 3. Rating Submission
![image](https://github.com/user-attachments/assets/e82df148-fcb0-47ca-8483-b7982a2cf914)

### 4. Backend Tables
![image](https://github.com/user-attachments/assets/e6b89867-ceec-4054-b9e8-0790401bd94f)
![image](https://github.com/user-attachments/assets/4625b698-2714-438c-a658-8eb25eff2283)
![image](https://github.com/user-attachments/assets/526ad1b5-7c7c-4077-bd90-aa8c5285044e)

Make sure to add your own screenshots in the `screenshots/` directory.

---

## Contributing
Feel free to fork this repository and submit pull requests.

