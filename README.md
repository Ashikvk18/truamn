# 🏋️‍♂️ Truman Campus Recreation Website

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org)
[![Flask](https://img.shields.io/badge/Flask-2.0+-lightgrey.svg)](https://flask.palletsprojects.com/)
[![Node.js](https://img.shields.io/badge/Node.js-14.0+-green.svg)](https://nodejs.org/)
[![Deployment](https://img.shields.io/badge/Deploy-Render-purple)](https://render.com)

A modern web application designed for Truman State University's Campus Recreation Center. It provides students and staff with interactive health tools, including BMI and BMR calculators, workout recommendations, and a chatbot assistant powered by Anthropic's Claude API.

## ✨ Features

- 🧮 **Health Calculators**: Interactive BMI and BMR calculators
- 💪 **Workout Recommendations**: Personalized workout suggestions based on age and preferences
- 🥗 **Nutrition Generator**: Custom meal plans with calorie and macro tracking
- 🤖 **AI Chatbot**: Intelligent fitness assistant powered by Claude API
- 📱 **Responsive Design**: Seamless experience across all devices
- 🏠 **Easy Navigation**: Consistent "Back to Home" functionality across all tools
- 🎨 **Modern UI**: Clean, intuitive interface with consistent styling
- 🔄 **Real-time Calculations**: Instant results for all health metrics

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ashikvk18/truamn.git
   cd truamn
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Set up Python environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. Configure environment variables:
   - Rename `.env.example` to `.env` and add your settings.

## 🔧 Running the Application

The application is split into three separate servers:

### 1. Chatbot Server (Node.js)
```bash
npm start  # or npm run dev for development with auto-reload
```
Access at: http://localhost:3002

### 2. Workout Server (Python/Flask)
```bash
python app.py
```
Access at: http://localhost:5001

### 3. Nutrition Server (Python/Flask)
```bash
python nutrition_app.py
```
Access at: http://localhost:5002

## 📑 Pages

- `/bmi.html`: BMI calculator
- `/bmr.html`: BMR calculator
- `/calculator.html`: Workout recommendation
- Homepage: Fitness chatbot

## 📂 Project Structure

```
truamn/
├── app.py
├── server.js
├── requirements.txt
├── package.json
├── .env.example
├── templates/
├── static/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── fonts/
├── Workout_Dataset_with_Age.csv
├── exercise_videos.json
└── README.md
```

## 🌐 Deployment

Deploy with Render using the `render.yaml` configuration.

## 👥 Contributing

Fork the repo and open a pull request. Open an issue to discuss major changes.

## 📄 License

MIT License

## 📬 Contact

Open an issue at: https://github.com/Ashikvk18/truamn/issues
