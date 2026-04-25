export const data = {
  totalSavedYear: 340,
  totalSavedMonth: 120,
  categories: [
    {
      name: "Physiotherapy",
      type: "Medical",
      sessionsUsed: 5,
      sessionsTotal: 10,
      allowanceUsed: 300,
      allowanceTotal: 600,
      saved: 150,
    },
    {
      name: "Acupuncture",
      type: "Wellness",
      sessionsUsed: 3,
      sessionsTotal: 8,
      allowanceUsed: 200,
      allowanceTotal: 500,
      saved: 100,
    },
    {
      name: "Nutrition",
      type: "Wellness",
      sessionsUsed: 2,
      sessionsTotal: 6,
      allowanceUsed: 120,
      allowanceTotal: 400,
      saved: 60,
    },
    {
      name: "Therapy",
      type: "Mental Health",
      sessionsUsed: 4,
      sessionsTotal: 12,
      allowanceUsed: 240,
      allowanceTotal: 1200,
      saved: 200,
    },
  ],
  recentActivity: [
    {
      date: "2026-04-20",
      provider: "City Physio Clinic",
      service: "Physiotherapy",
      saved: 40,
    },
    {
      date: "2026-04-18",
      provider: "Zen Wellness",
      service: "Acupuncture",
      saved: 35,
    },
    {
      date: "2026-04-15",
      provider: "Healthy Eats",
      service: "Nutrition",
      saved: 20,
    },
    {
      date: "2026-04-10",
      provider: "MindCare",
      service: "Therapy",
      saved: 50,
    },
    {
      date: "2026-04-05",
      provider: "City Physio Clinic",
      service: "Physiotherapy",
      saved: 30,
    },
  ],
};

export type Category = (typeof data.categories)[number];
export type Activity = (typeof data.recentActivity)[number];
