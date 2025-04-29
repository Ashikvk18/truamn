from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from nutrition_generator import calculate_tdee, generate_meal_plan

app = Flask(__name__, template_folder='templates', static_folder='static')
CORS(app)

@app.route('/')
def index():
    return render_template('nutrition.html')

@app.route('/nutrition')
def nutrition():
    return render_template('nutrition.html')

@app.route('/generate_meal_plan', methods=['POST'])
def generate_nutrition_plan():
    try:
        # Get form data
        weight_lbs = float(request.form.get('weight', 0))
        # Convert pounds to kilograms (1 lb = 0.45359237 kg)
        weight = weight_lbs * 0.45359237
        height = float(request.form.get('height', 0))
        age = int(request.form.get('age', 0))
        gender = request.form.get('gender', '')
        activity_level = request.form.get('activity_level', '')
        goal = request.form.get('goal', '')
        restrictions = request.form.getlist('restrictions')

        # Validate inputs
        if not all([weight, height, age, gender, activity_level, goal]):
            return render_template('nutrition.html', error='All fields except restrictions are required')

        # Calculate TDEE
        tdee = calculate_tdee(weight, height, age, gender, activity_level)

        # Generate meal plan
        meal_plan = generate_meal_plan(tdee, goal, restrictions)

        return render_template('nutrition.html', meal_plan=meal_plan)

    except Exception as e:
        return render_template('nutrition.html', error=str(e))

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001, debug=True)
