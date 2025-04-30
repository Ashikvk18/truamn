# Developer Guide 👩‍💻

This guide provides detailed information for developers who want to contribute to or understand the Truman Campus Recreation Website.

## 🏗️ Architecture Overview

### Frontend
- HTML5, CSS3, JavaScript
- Responsive design using custom CSS
- Interactive calculators with client-side validation
- Dynamic content loading

### Backend
1. **Workout Server (Flask)**
   - Handles workout generation
   - Processes user inputs
   - Returns personalized plans

2. **Nutrition Server (Flask)**
   - Manages meal planning
   - Calculates nutritional needs
   - Generates meal recommendations

3. **Chatbot Server (Node.js)**
   - Integrates with Claude API
   - Processes natural language queries
   - Returns fitness-related responses

## 🛠️ Development Setup

1. **Prerequisites**
   ```bash
   # Node.js
   node -v  # Should be 14.0+
   npm -v   # Should be 6.0+

   # Python
   python --version  # Should be 3.8+
   pip --version
   ```

2. **Environment Setup**
   ```bash
   # Clone repository
   git clone https://github.com/Ashikvk18/truamn.git
   cd truamn

   # Python virtual environment
   python -m venv .venv
   source .venv/bin/activate  # Windows: .venv\Scripts\activate
   pip install -r requirements.txt

   # Node.js dependencies
   npm install
   ```

3. **Configuration**
   ```bash
   # Copy example env file
   cp .env.example .env

   # Edit .env with your settings
   # Required variables:
   # - CLAUDE_API_KEY
   # - PORT settings
   # - Debug mode
   ```

## 🔄 Development Workflow

1. **Running Servers**
   ```bash
   # Start workout server
   python app.py

   # Start nutrition server
   python nutrition_app.py

   # Start chatbot server
   npm run dev
   ```

2. **Making Changes**
   - Follow style guides in CONTRIBUTING.md
   - Write tests for new features
   - Update documentation
   - Create meaningful commits

3. **Testing**
   - Run unit tests
   - Test across browsers
   - Verify mobile responsiveness
   - Check all calculators

## 📦 Code Structure

```
truamn/
├── app.py                 # Workout server
├── nutrition_app.py       # Nutrition server
├── server.js             # Chatbot server
├── templates/            # HTML templates
│   ├── workout.html
│   ├── nutrition.html
│   └── result.html
├── static/              # Static assets
│   ├── css/
│   ├── js/
│   └── images/
└── data/               # Application data
    ├── exercises.json
    └── nutrition.json
```

## 🔌 API Documentation

### Workout API
```python
POST /recommend
{
    "age": int,
    "weight": float,
    "body_part": string,
    "muscle_type": string
}
```

### Nutrition API
```python
POST /generate_meal_plan
{
    "age": int,
    "weight": float,
    "height": float,
    "gender": string,
    "activity_level": string,
    "preferences": array
}
```

## 🚀 Deployment

1. **Preparation**
   - Update environment variables
   - Run tests
   - Build production assets

2. **Render Deployment**
   - Configure `render.yaml`
   - Set up environment
   - Deploy services

3. **Monitoring**
   - Check server logs
   - Monitor performance
   - Track errors

## 🐛 Debugging

1. **Common Issues**
   - Port conflicts
   - API key issues
   - Database connections
   - CORS errors

2. **Debugging Tools**
   - Browser DevTools
   - Python debugger
   - Node.js debugger
   - Log files

3. **Performance**
   - Chrome Lighthouse
   - Network monitoring
   - Load testing
