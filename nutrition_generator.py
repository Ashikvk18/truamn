import random

# Database of foods with their nutritional values
FOODS_DB = {
    'proteins': [
        {'name': 'Chicken Breast', 'calories': 165, 'protein': 31, 'carbs': 0, 'fat': 3.6},
        {'name': 'Salmon', 'calories': 208, 'protein': 22, 'carbs': 0, 'fat': 13},
        {'name': 'Greek Yogurt', 'calories': 100, 'protein': 17, 'carbs': 6, 'fat': 0.4},
        {'name': 'Eggs', 'calories': 155, 'protein': 13, 'carbs': 1.1, 'fat': 11},
        {'name': 'Tofu', 'calories': 144, 'protein': 17, 'carbs': 3, 'fat': 8},
    ],
    'carbs': [
        {'name': 'Brown Rice', 'calories': 216, 'protein': 5, 'carbs': 45, 'fat': 1.8},
        {'name': 'Sweet Potato', 'calories': 103, 'protein': 2, 'carbs': 24, 'fat': 0.2},
        {'name': 'Quinoa', 'calories': 120, 'protein': 4.4, 'carbs': 21, 'fat': 1.9},
        {'name': 'Oatmeal', 'calories': 307, 'protein': 13, 'carbs': 55, 'fat': 5},
        {'name': 'Whole Wheat Bread', 'calories': 69, 'protein': 3.6, 'carbs': 12, 'fat': 1},
    ],
    'fats': [
        {'name': 'Avocado', 'calories': 160, 'protein': 2, 'carbs': 8.5, 'fat': 14.7},
        {'name': 'Almonds', 'calories': 164, 'protein': 6, 'carbs': 6, 'fat': 14},
        {'name': 'Olive Oil', 'calories': 120, 'protein': 0, 'carbs': 0, 'fat': 14},
        {'name': 'Chia Seeds', 'calories': 138, 'protein': 4.7, 'carbs': 12, 'fat': 8.7},
        {'name': 'Peanut Butter', 'calories': 188, 'protein': 8, 'carbs': 6, 'fat': 16},
    ],
    'vegetables': [
        {'name': 'Broccoli', 'calories': 55, 'protein': 3.7, 'carbs': 11.2, 'fat': 0.6},
        {'name': 'Spinach', 'calories': 23, 'protein': 2.9, 'carbs': 3.6, 'fat': 0.4},
        {'name': 'Kale', 'calories': 33, 'protein': 2.9, 'carbs': 6.7, 'fat': 0.5},
        {'name': 'Bell Peppers', 'calories': 31, 'protein': 1, 'carbs': 6, 'fat': 0.3},
        {'name': 'Carrots', 'calories': 41, 'protein': 0.9, 'carbs': 10, 'fat': 0.2},
    ],
    'fruits': [
        {'name': 'Banana', 'calories': 105, 'protein': 1.3, 'carbs': 27, 'fat': 0.4},
        {'name': 'Apple', 'calories': 95, 'protein': 0.5, 'carbs': 25, 'fat': 0.3},
        {'name': 'Berries', 'calories': 85, 'protein': 1.1, 'carbs': 21, 'fat': 0.5},
        {'name': 'Orange', 'calories': 62, 'protein': 1.2, 'carbs': 15, 'fat': 0.2},
        {'name': 'Pineapple', 'calories': 82, 'protein': 0.9, 'carbs': 22, 'fat': 0.2},
    ]
}

def calculate_tdee(weight, height, age, gender, activity_level):
    """Calculate Total Daily Energy Expenditure"""
    # Calculate BMR using Mifflin-St Jeor Equation
    if gender.lower() == 'male':
        bmr = 10 * weight + 6.25 * height - 5 * age + 5
    else:
        bmr = 10 * weight + 6.25 * height - 5 * age - 161

    # Activity multipliers
    activity_multipliers = {
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'active': 1.725,
        'very_active': 1.9
    }

    return bmr * activity_multipliers[activity_level]

def generate_meal_plan(tdee, goal, restrictions=None):
    """Generate a personalized meal plan"""
    if restrictions is None:
        restrictions = []

    # Adjust calories based on goal
    if goal == 'lose':
        target_calories = tdee - 500
    elif goal == 'gain':
        target_calories = tdee + 500
    else:  # maintain
        target_calories = tdee

    # Macronutrient distribution
    if goal == 'gain':
        protein_ratio = 0.25
        carb_ratio = 0.50
        fat_ratio = 0.25
    elif goal == 'lose':
        protein_ratio = 0.35
        carb_ratio = 0.40
        fat_ratio = 0.25
    else:
        protein_ratio = 0.30
        carb_ratio = 0.45
        fat_ratio = 0.25

    # Calculate target macros in grams
    target_protein = (target_calories * protein_ratio) / 4  # 4 calories per gram of protein
    target_carbs = (target_calories * carb_ratio) / 4      # 4 calories per gram of carbs
    target_fat = (target_calories * fat_ratio) / 9         # 9 calories per gram of fat

    # Generate meals
    meals = {
        'breakfast': [],
        'lunch': [],
        'dinner': [],
        'snacks': []
    }

    # Filter foods based on restrictions
    available_foods = FOODS_DB.copy()
    if restrictions:
        for category in available_foods:
            available_foods[category] = [
                food for food in available_foods[category]
                if not any(r.lower() in food['name'].lower() for r in restrictions)
            ]

    # Helper function to add foods to a meal
    def add_to_meal(meal, target_cals):
        meal_cals = 0
        while meal_cals < target_cals:
            category = random.choice(list(available_foods.keys()))
            if available_foods[category]:
                food = random.choice(available_foods[category])
                meal.append(food)
                meal_cals += food['calories']

    # Distribute calories across meals
    breakfast_cals = target_calories * 0.25
    lunch_cals = target_calories * 0.35
    dinner_cals = target_calories * 0.25
    snacks_cals = target_calories * 0.15

    add_to_meal(meals['breakfast'], breakfast_cals)
    add_to_meal(meals['lunch'], lunch_cals)
    add_to_meal(meals['dinner'], dinner_cals)
    add_to_meal(meals['snacks'], snacks_cals)

    return {
        'meals': meals,
        'target_calories': target_calories,
        'macros': {
            'protein': target_protein,
            'carbs': target_carbs,
            'fat': target_fat
        }
    }
