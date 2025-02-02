# Task Management System (TMS)

This project is a Task Management System (TMS) built using Next JS for frontend and Express JS and MongoDB for backend.  It allows users to create, manage, and track tasks efficiently.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#Usage)
- [Technologies Used](#Technologies Used)




## Features

- **Task Creation:** Users can create new tasks with descriptions, due dates, priorities, and assigned users.
- **Task Management:**  Tasks can be viewed, edited, marked as complete, and deleted.
- **User Management:** [Describe user features, e.g., User registration, login, roles (admin, regular user), etc.]
- **Search:**  Users can search for tasks based on keywords in the description.

## Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/faraz9901/TMS.git](https://github.com/faraz9901/TMS.git)
   cd TMS

### Backend Setup:
1. Navigate to the backend directory (if separate):
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Configure the database connection (e.g., in a .env file or config file). Example `.env`:
   ```
   DATABASE_URL=mongodb://localhost:27017/tms
   PORT=5000
   JWT_SECRET=your_secret_key
   SENDGRID_API_KEY=your_sendgrid_api_key
   ```
4. Start the backend server:
   ```
   npm start
   ```

### Frontend Setup:
1. Navigate to the frontend directory (if separate):
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env.local` file in the frontend directory. Add environment variables needed for the frontend to connect to the backend. Example `.env.local`:
   ```
   NEXT_APP_API_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```
   npm start
   ```

### Database Setup (Example for MongoDB):
1. Install MongoDB (if you haven't already).
2. Start the MongoDB server.
3. Create the database named `tms` (or whatever you configured in your backend `.env` file). You can use MongoDB Compass or the command line. You might not need to create collections manually if your backend uses an ORM/ODM like Mongoose, as it will often create them for you.

## Usage

1. Start the backend server.
2. Start the frontend development server.
3. Open your web browser and navigate to the appropriate URL (usually `http://localhost:3000` for the frontend during development, or your deployed URL).

### User Registration/Login:
- Click 'Sign Up' to create a new account.
- Enter your name, email, and password.
- After registration, you can log in with your credentials.

### Creating a Task:
- Click the "Create Task" button (or similar).
- Fill in the task details (description, due date, priority, assigned user).
- Click "Save."

### Managing Tasks:
- Tasks will be displayed in a list.
- You can click on a task to view its details, edit it, mark it as complete, or delete it.

### Filtering/Sorting:
- Use the filter and sort options (if implemented) to organize tasks.

### Search:
- Use the search bar (if implemented) to find tasks by keywords.

## Technologies Used
- **Frontend:** Next.js, React, HTML, CSS, JavaScript, Tailwind, Axios
- **Backend:** Node.js, Express, 
- **Database:** MongoDB
- **Other:** JWT (for authentication), bcrypt (for password hashing), Nodemailer (for email), SendGrid (for email service)

