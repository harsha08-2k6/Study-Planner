# Study Planner 🚀

A comprehensive personal study planning and productivity application designed to help students manage their schedules, track progress, and stay motivated through gamification.

## ✨ Features

- **📊 Visual Analytics**: Track your study habits and progress with intuitive charts.
- **⏲️ Interactive Pomodoro Widget**: Stay focused using the built-in Pomodoro timer.
- **🏆 Gamification & Achievement Badges**: Earn points and unlock badges as you complete tasks.
- **📅 Interactive Study Calendar**: Manage your deadlines and study sessions in a dynamic calendar view.
- **🔒 Secure Authentication**: JWT-based authentication for secure user access.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Lucide React, Axios, React Router.
- **Backend**: Django, Django REST Framework, JWT.
- **Database**: SQLite (Development).
- **Styling**: Vanilla CSS with modern design principles.

## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- Python 3.x
- pip

### 1. Server Setup (Django)

```bash
cd server
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt # Make sure you have the requirements
python manage.py migrate
python manage.py runserver
```

### 2. Client Setup (React + Vite)

```bash
cd client
npm install
npm run dev
```

The application should now be running! Access the frontend at `http://localhost:5173` and the backend at `http://localhost:8000`.

## 📂 Project Structure

- `client/`: React frontend application.
- `server/`: Django backend API.
- `core/`: Django project settings.
- `planner/`: Main Django app for study planner logic.

---
Built with ❤️ for better study habits.
