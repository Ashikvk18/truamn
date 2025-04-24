from flask import Flask, render_template, request, jsonify, send_file
from flask_cors import CORS
from workoutModel import generate_precise_workout_plan
from nutrition_generator import calculate_tdee, generate_meal_plan
import os

app = Flask(__name__)
CORS(app)

@app.route('/workout')
def workout():
    return render_template('workout.html')

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        age = int(request.form.get('age', 0))
        body_part = request.form.get('body_part', '')
        muscle_type = request.form.get('muscle_type', '')
        
        if not age or not body_part:
            return render_template('workout.html', error='Age and body part are required')

        plan, recommendation, prime_video = generate_precise_workout_plan(body_part, age)
        if not plan:
            return render_template('workout.html', error=f'No workouts found for {body_part}')
            
        return render_template('result.html', 
                             plan=plan,
                             recommendation=recommendation,
                             prime_video=prime_video,
                             age=age,
                             body_part=body_part,
                             muscle_type=muscle_type)
    except Exception as e:
        return render_template('workout.html', error=str(e))

@app.route('/nutrition')
def nutrition():
    return render_template('nutrition.html')

@app.route('/generate_meal_plan', methods=['POST'])
def generate_nutrition_plan():
    try:
        # Get form data
        weight = float(request.form.get('weight', 0))
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
    app.run(port=5000)
