# API Documentation 📚

## Overview

The Truman Campus Recreation Website provides several APIs for workout generation, meal planning, and fitness calculations.

## Authentication

Currently, APIs are for internal use and don't require authentication.

## API Endpoints

### Workout Generator API

#### Generate Workout Plan
```http
POST http://127.0.0.1:5000/recommend
Content-Type: application/json

{
    "age": integer,
    "weight": float,    // in pounds
    "body_part": string,
    "muscle_type": string
}
```

**Response**
```json
{
    "plan": [
        {
            "text": "Exercise description",
            "video": "YouTube URL",
            "sets": integer,
            "reps": integer
        }
    ],
    "recommendation": "Prime exercise recommendation",
    "prime_video": "YouTube URL"
}
```

### Nutrition API

#### Generate Meal Plan
```http
POST http://127.0.0.1:5001/generate_meal_plan
Content-Type: application/json

{
    "age": integer,
    "weight": float,    // in pounds
    "height": float,    // in cm
    "gender": string,
    "activity_level": string,
    "preferences": array,
    "restrictions": array
}
```

**Response**
```json
{
    "meals": {
        "breakfast": [
            {
                "name": "Meal name",
                "calories": float,
                "protein": float,
                "carbs": float,
                "fat": float
            }
        ],
        "lunch": [...],
        "dinner": [...],
        "snacks": [...]
    },
    "total_calories": float,
    "macros": {
        "protein": float,
        "carbs": float,
        "fat": float
    }
}
```

### Calculator APIs

#### Calculate BMI
```http
POST http://127.0.0.1:5507/calculate_bmi
Content-Type: application/json

{
    "weight": float,    // in pounds
    "height": float     // in cm
}
```

**Response**
```json
{
    "bmi": float,
    "category": string
}
```

#### Calculate BMR
```http
POST http://127.0.0.1:5507/calculate_bmr
Content-Type: application/json

{
    "weight": float,    // in pounds
    "height": float,    // in cm
    "age": integer,
    "gender": string,
    "activity_level": string
}
```

**Response**
```json
{
    "bmr": float,
    "tdee": float,
    "daily_calories": float
}
```

## Error Handling

All APIs use standard HTTP status codes:

- 200: Success
- 400: Bad Request
- 404: Not Found
- 500: Server Error

Error Response Format:
```json
{
    "error": "Error message",
    "details": "Additional details if available"
}
```

## Rate Limiting

Currently, no rate limiting is implemented. Please use APIs responsibly.

## Testing

Test endpoints using curl:

```bash
# Test Workout API
curl -X POST http://127.0.0.1:5000/recommend \
     -H "Content-Type: application/json" \
     -d '{"age": 25, "weight": 150, "body_part": "chest", "muscle_type": "strength"}'

# Test Nutrition API
curl -X POST http://127.0.0.1:5001/generate_meal_plan \
     -H "Content-Type: application/json" \
     -d '{"age": 25, "weight": 150, "height": 170, "gender": "male", "activity_level": "moderate"}'
```

## Best Practices

1. Always include Content-Type header
2. Validate input before sending
3. Handle errors gracefully
4. Cache responses when appropriate
5. Use HTTPS in production

## Future Enhancements

Planned API improvements:
1. Authentication
2. Rate limiting
3. Response caching
4. Bulk operations
5. Webhook notifications
