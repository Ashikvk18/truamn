# Truman Campus Recreation Website

A modern web application designed for Truman State University's Campus Recreation Center. It provides students and staff with interactive health tools, including BMI and BMR calculators, workout recommendations, and a chatbot assistant powered by Anthropic's Claude API.

## Features

- Health Calculators: Interactive BMI and BMR calculators
- Workout Recommendations: Personalized workout suggestions
- Nutrition Gererator: Personalized nutrition suggestions
- AI Chatbot: Fitness-related queries answered via Claude API
- Responsive Design: Works across all devices

## Getting Started

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

## Running the Application

### Backend Server
```bash
python app.py
```

### Frontend Server
```bash
node server.js
```

Open `http://localhost:3000` in your browser.

## Pages

- `/bmi.html`: BMI calculator
- `/bmr.html`: BMR calculator
- `/calculator.html`: Workout recommendation
- Homepage: Fitness chatbot

## Project Structure

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

## Deployment

Deploy with Render using the `render.yaml` configuration.

## Contributing

Fork the repo and open a pull request. Open an issue to discuss major changes.

## License

MIT License

## Contact

Open an issue at: https://github.com/Ashikvk18/truamn/issues
