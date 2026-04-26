import '../models/meal_impact_result.dart';

class WeeklyMealImpactService {
  static const Map<String, int> trackedIngredientScores = {
    'beef': 10,
    'lamb': 10,
    'pork': 8,
    'liver': 15,
    'sardines': 12,
    'anchovies': 12,
    'shellfish': 10,
    'shrimp': 8,
    'mussels': 10,
  };

  static MealImpactResult evaluate(List<String> ingredientsUsed) {
    int total = 0;
    final tracked = <String>[];

    for (final ingredient in ingredientsUsed) {
      final normalized = ingredient.trim().toLowerCase();
      final score = trackedIngredientScores[normalized];
      if (score != null) {
        total += score;
        tracked.add(ingredient);
      }
    }

    final summary = tracked.isEmpty
        ? 'This meal did not add to your weekly tracked score.'
        : 'This meal added $total points based on: ${tracked.join(', ')}.';

    return MealImpactResult(
      addedScore: total,
      trackedIngredients: tracked,
      summary: summary,
    );
  }
}
