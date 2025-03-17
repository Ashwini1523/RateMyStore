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
![Home Page](screenshots/homepage.png)

### 2. Store Listing
![Store Listing](screenshots/store-listing.png)

### 3. Rating Submission
![Rating Submission](screenshots/rating.png)

Make sure to add your own screenshots in the `screenshots/` directory.

---

## Contributing
Feel free to fork this repository and submit pull requests.

---

## License
This project is licensed under the MIT License.

