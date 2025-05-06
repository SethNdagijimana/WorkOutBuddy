export const workoutPlans = {
  beginner: [
    {
      name: "Wall Push-ups",
      description:
        "Stand facing a wall. Place your hands on the wall and perform push-ups.",
      reps: [10, 10, 10],
      rest: 30,
      category: "Upper Body",
      image: "/assets/wallpushup.png"
    },
    {
      name: "Bodyweight Squats",
      description:
        "Stand with feet shoulder-width apart. Lower your body as if sitting in a chair.",
      reps: [10, 10, 10],
      rest: 30,
      category: "Lower Body",
      image: "/assets/bodyweightsquats.png"
    },
    {
      name: "Glute Bridges",
      description:
        "Lie on your back with knees bent. Lift hips toward the ceiling.",
      reps: [10, 10, 10],
      rest: 30,
      category: "Core",
      image: "/assets/glute.webp"
    },
    {
      name: "Plank (on knees)",
      description:
        "Support your weight on your forearms and knees, keeping your body straight.",
      reps: [20, 20, 20], // in seconds
      rest: 30,
      category: "Core",
      image: "/assets/plank.webp"
    }
  ],
  intermediate: [
    {
      name: "Regular Push-ups",
      description:
        "Support your weight on hands and toes. Lower chest to floor and push back up.",
      reps: [12, 12, 12],
      rest: 45,
      category: "Upper Body",
      image: "/assets/regularPushUps.webp"
    },
    {
      name: "Bulgarian Split Squats",
      description: "Place one foot behind you on a bench and perform lunges.",
      reps: [8, 8, 8],
      rest: 45,
      category: "Lower Body",
      image: "/assets/splitSquats.webp"
    },
    {
      name: "Mountain Climbers",
      description:
        "Start in a push-up position and bring knees to chest alternately.",
      reps: [20, 20, 20],
      rest: 45,
      category: "Cardio",
      image: "/assets/mountainClimbers.webp"
    },
    {
      name: "Full Plank",
      description:
        "Support your weight on your forearms and toes, keeping your body straight.",
      reps: [30, 30, 30], // in seconds
      rest: 45,
      category: "Core",
      image: "/assets/fullPlank.webp"
    }
  ],
  advanced: [
    {
      name: "Diamond Push-ups",
      description:
        "Place hands close together in a diamond shape and perform push-ups.",
      reps: [15, 15, 15],
      rest: 60,
      category: "Upper Body",
      image: "/assets/diamondPushUps.webp"
    },
    {
      name: "Pistol Squats",
      description:
        "Perform a one-legged squat while extending the other leg forward.",
      reps: [8, 8, 8],
      rest: 60,
      category: "Lower Body",
      image: "/assets/pistolSquats.webp"
    },
    {
      name: "Burpees",
      description:
        "Combine a push-up with a jump, moving from floor to standing position quickly.",
      reps: [15, 15, 15],
      rest: 60,
      category: "Full Body",
      image: "/assets/burpees.webp"
    },
    {
      name: "Side Plank Rotations",
      description:
        "From side plank position, rotate arm under and back up to the ceiling.",
      reps: [10, 10, 10], // per side
      rest: 60,
      category: "Core",
      image: "/assets/sidePlank.webp"
    }
  ]
}
