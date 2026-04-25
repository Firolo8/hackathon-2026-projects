class MealPlan {
  final String title;
  final String summary;
  final List<String> ingredientsUsed;
  final List<String> steps;
  final String reason;

  MealPlan({
    required this.title,
    required this.summary,
    required this.ingredientsUsed,
    required this.steps,
    required this.reason,
  });

  factory MealPlan.fromJson(Map<String, dynamic> json) {
    return MealPlan(
      title: json['title'] ?? '',
      summary: json['summary'] ?? '',
      ingredientsUsed: List<String>.from(json['ingredientsUsed'] ?? []),
      steps: List<String>.from(json['steps'] ?? []),
      reason: json['reason'] ?? '',
    );
  }
}
