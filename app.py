from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from workoutModel import generate_precise_workout_plan

app = Flask(__name__, template_folder='templates', static_folder='static')
CORS(app)

@app.route('/')
def index():
    return render_template('workout.html')

@app.route('/workout')
def workout():
    return render_template('workout.html')

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        age = int(request.form.get('age', 0))
        weight_lbs = float(request.form.get('weight', 0))
        body_part = request.form.get('body_part', '')
        muscle_type = request.form.get('muscle_type', '')
        
        # Convert weight to kg for future use
        weight_kg = weight_lbs * 0.45359237 if weight_lbs else 0
        
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



if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
