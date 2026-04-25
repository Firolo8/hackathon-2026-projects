import 'package:flutter/material.dart';
import 'package:medimeal/services/gemini_meal_service.dart';

import '../models/care_state.dart';
import '../models/meal_plan.dart';
import '../services/meal_planner_service.dart';
import '../widgets/section_title.dart';
import '../widgets/summary_card.dart';

class MealsTab extends StatefulWidget {
  final CareState? careState;

  const MealsTab({
    super.key,
    required this.careState,
  });

  @override
  State<MealsTab> createState() => _MealsTabState();
}

class _MealsTabState extends State<MealsTab> {
  final TextEditingController ingredientsController = TextEditingController();

  bool isLoading = false;
  String? errorMessage;

  String selectedMealType = 'Breakfast';
  MealPlan? generatedMealPlan;

  final List<String> mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  Future<void> generateMealPlan() async {
    setState(() {
      isLoading = true;
      errorMessage = null;
    });

    try {
      final mealPlan = await GeminiMealService.generateMealPlan(
        ingredientsText: ingredientsController.text,
        mealType: selectedMealType,
        careState: widget.careState,
      );

      setState(() {
        generatedMealPlan = mealPlan;
      });
    } catch (e) {
      setState(() {
        errorMessage = e.toString();
      });
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  void dispose() {
    ingredientsController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Meals',
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 6),
          const Text(
            'Generate care-aware meal suggestions',
            style: TextStyle(
              color: Color(0xFF94A3B8),
              fontSize: 15,
            ),
          ),
          const SizedBox(height: 24),
          const SectionTitle(title: 'Current Care Context'),
          SummaryCard(
            text: widget.careState == null
                ? 'No active care context yet. Log a medication first for more personalized meal guidance.'
                : '${widget.careState!.summary}\n\n${widget.careState!.caution}',
          ),
          const SizedBox(height: 24),
          const SectionTitle(title: 'Meal Inputs'),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(18),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Ingredients',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: ingredientsController,
                    maxLines: 3,
                    decoration: InputDecoration(
                      hintText: 'Enter ingredients separated by commas',
                      filled: true,
                      fillColor: const Color(0xFF334155),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(14),
                        borderSide: BorderSide.none,
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Meal Type',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 8),
                  DropdownButtonFormField<String>(
                    initialValue: selectedMealType,
                    items: mealTypes
                        .map(
                          (type) => DropdownMenuItem(
                            value: type,
                            child: Text(type),
                          ),
                        )
                        .toList(),
                    onChanged: (value) {
                      if (value != null) {
                        setState(() {
                          selectedMealType = value;
                        });
                      }
                    },
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: const Color(0xFF334155),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(14),
                        borderSide: BorderSide.none,
                      ),
                    ),
                  ),
                  const SizedBox(height: 18),
                  ElevatedButton(
                    onPressed: isLoading ? null : generateMealPlan,
                    child: Text(
                        isLoading ? 'Generating...' : 'Generate Meal Plan'),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),
          if (errorMessage != null) ...[
            const SizedBox(height: 16),
            Text(
              errorMessage!,
              style: const TextStyle(color: Colors.redAccent),
            ),
          ],
          const SectionTitle(title: 'Suggested Meal'),
          if (generatedMealPlan == null)
            const SummaryCard(
              text:
                  'No meal generated yet. Add ingredients and generate a plan.',
            )
          else
            Card(
              child: Padding(
                padding: const EdgeInsets.all(18),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      generatedMealPlan!.title,
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 10),
                    Text(
                      generatedMealPlan!.summary,
                      style: const TextStyle(
                        color: Color(0xFFCBD5E1),
                        height: 1.4,
                      ),
                    ),
                    const SizedBox(height: 14),
                    const Text(
                      'Ingredients Used',
                      style: TextStyle(fontWeight: FontWeight.w600),
                    ),
                    const SizedBox(height: 6),
                    ...generatedMealPlan!.ingredientsUsed.map(
                      (ingredient) => Padding(
                        padding: const EdgeInsets.only(bottom: 4),
                        child: Text('• $ingredient'),
                      ),
                    ),
                    const SizedBox(height: 14),
                    const Text(
                      'Steps',
                      style: TextStyle(fontWeight: FontWeight.w600),
                    ),
                    const SizedBox(height: 6),
                    ...generatedMealPlan!.steps.map(
                      (step) => Padding(
                        padding: const EdgeInsets.only(bottom: 6),
                        child: Text('• $step'),
                      ),
                    ),
                    const SizedBox(height: 14),
                    const Text(
                      'Why It Fits',
                      style: TextStyle(fontWeight: FontWeight.w600),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      generatedMealPlan!.reason,
                      style: const TextStyle(
                        color: Color(0xFFCBD5E1),
                        height: 1.4,
                      ),
                    ),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }
}
