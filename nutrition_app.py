from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__, template_folder='nutrition_templates', static_folder='static', static_url_path='/static')
CORS(app)

# Load meal suggestions from JSON file
MEAL_DATABASE = {
    'breakfast': [
        {'name': 'Oatmeal with fruits and nuts', 'calories': 350},
        {'name': 'Greek yogurt with granola and honey', 'calories': 300},
        {'name': 'Whole grain toast with eggs and avocado', 'calories': 400},
        {'name': 'Protein smoothie with banana and berries', 'calories': 250},
        {'name': 'Overnight chia pudding with almonds', 'calories': 300}
    ],
    'lunch': [
        {'name': 'Grilled chicken salad with olive oil dressing', 'calories': 400},
        {'name': 'Turkey sandwich on whole grain bread', 'calories': 450},
        {'name': 'Quinoa bowl with roasted vegetables', 'calories': 350},
        {'name': 'Tuna wrap with avocado', 'calories': 400},
        {'name': 'Lentil soup with whole grain crackers', 'calories': 300}
    ],
    'dinner': [
        {'name': 'Grilled salmon with sweet potato', 'calories': 450},
        {'name': 'Lean beef stir-fry with brown rice', 'calories': 500},
        {'name': 'Baked chicken with quinoa and vegetables', 'calories': 400},
        {'name': 'Turkey meatballs with whole grain pasta', 'calories': 450},
        {'name': 'Tofu and vegetable curry with brown rice', 'calories': 350}
    ],
    'snacks': [
        {'name': 'Apple with almond butter', 'calories': 200},
        {'name': 'Greek yogurt with berries', 'calories': 150},
        {'name': 'Mixed nuts and dried fruits', 'calories': 180},
        {'name': 'Protein bar', 'calories': 200},
        {'name': 'Carrot sticks with hummus', 'calories': 150}
    ]
}

@app.route('/')
def index():
    try:
        return render_template('nutrition.html')
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/generate', methods=['POST'])
def generate_nutrition():
    try:
        # Get form data with validation
        try:
            age = int(request.form.get('age', 25))
            if not 15 <= age <= 80:
                raise ValueError('Age must be between 15 and 80')
                
            # Convert weight from pounds to kilograms
            weight_lbs = float(request.form.get('weight', 154))
            if not 66 <= weight_lbs <= 660:
                raise ValueError('Weight must be between 66 and 660 lbs')
            weight = weight_lbs * 0.453592  # Convert lbs to kg
                
            height = float(request.form.get('height', 170))
            if not 140 <= height <= 220:
                raise ValueError('Height must be between 140 and 220 cm')
                
        except (ValueError, TypeError) as e:
            # Convert kg error message to lbs if present
            error_msg = str(e)
            if any(x in error_msg.lower() for x in ['weight', 'kg', 'kilograms', 'pounds', 'lbs']):
                error_msg = 'Weight must be between 66 and 660 lbs'
            return render_template('nutrition.html', error=error_msg)
            
        activity_level = request.form.get('activity_level', 'moderate')
        goal = request.form.get('goal', 'maintain')
        gender = request.form.get('gender', 'male')
        
        # Calculate BMR using Harris-Benedict equation
        if gender == 'male':
            bmr = 10 * weight + 6.25 * height - 5 * age + 5
        else:  # female
            bmr = 10 * weight + 6.25 * height - 5 * age - 161
        
        # Activity level multipliers
        activity_multipliers = {
            'sedentary': 1.2,
            'light': 1.375,
            'moderate': 1.55,
            'very': 1.725,
            'extra': 1.9
        }
        
        # Calculate TDEE (Total Daily Energy Expenditure)
        tdee = bmr * activity_multipliers.get(activity_level, 1.55)
        
        # Adjust calories based on goal
        calorie_adjustments = {
            'lose': -500,    # Caloric deficit for weight loss
            'maintain': 0,   # Maintain current weight
            'gain': 500      # Caloric surplus for weight gain
        }
        
        daily_calories = max(1200, tdee + calorie_adjustments.get(goal, 0))  # Ensure minimum healthy calories
        
        # Calculate macronutrient ratios based on goal
        if goal == 'lose':
            protein_ratio = 0.35  # Higher protein for preserving muscle
            carb_ratio = 0.40
            fat_ratio = 0.25
        elif goal == 'gain':
            protein_ratio = 0.30
            carb_ratio = 0.50  # Higher carbs for muscle gain
            fat_ratio = 0.20
        else:  # maintain
            protein_ratio = 0.30
            carb_ratio = 0.45
            fat_ratio = 0.25
            
        protein_calories = daily_calories * protein_ratio
        carb_calories = daily_calories * carb_ratio
        fat_calories = daily_calories * fat_ratio
        
        nutrition_plan = {
            'daily_calories': round(daily_calories),
            'protein_grams': round(protein_calories / 4),
            'carb_grams': round(carb_calories / 4),
            'fat_grams': round(fat_calories / 9),
            'meals': generate_meal_suggestions(daily_calories)
        }
        
        return render_template('nutrition_result.html', plan=nutrition_plan)
        
    except Exception as e:
        return render_template('nutrition.html', error=f'An error occurred: {str(e)}')

def generate_meal_suggestions(daily_calories):
    meals = []
    meal_ratios = {
        'Breakfast': 0.25,
        'Lunch': 0.35,
        'Dinner': 0.30,
        'Snacks': 0.10
    }
    
    for meal, ratio in meal_ratios.items():
        meal_calories = daily_calories * ratio
        target_calories = round(meal_calories)
        
        # Get appropriate meal suggestions
        suggestions = get_meal_suggestions(meal.lower(), target_calories)
        
        meals.append({
            'name': meal,
            'calories': target_calories,
            'suggestions': suggestions
        })
    
    return meals

def get_meal_suggestions(meal_type, target_calories):
    if meal_type not in MEAL_DATABASE:
        return ['Healthy meal options not available']
        
    # Get all meals for this type
    available_meals = MEAL_DATABASE[meal_type]
    
    # Sort meals by how close their calories are to our target
    sorted_meals = sorted(available_meals, 
                         key=lambda x: abs(x['calories'] - target_calories/len(available_meals)))
    
    # Return top 2 best matching meals
    selected_meals = sorted_meals[:2]
    return [meal['name'] for meal in selected_meals]

if __name__ == '__main__':
    app.run(debug=True, port=5001)
