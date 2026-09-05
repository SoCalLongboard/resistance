// Resistance band (tubular, handle/clip style) exercises by muscle group and movement direction.
// `muscles` lists the specific muscles the exercise engages.
// `url` links to a demonstration guide on liftmanual.com.
//
// Each populated push/pull direction is { day, exercises }, where `day` is the
// weekly training day (Monday/Wednesday/Friday) assigned to that intersection.
// See docs in the plan for the push/pull/forearms split rationale. Directions
// with no exercises are `null`.

const exercise = (name, muscles, url) => ({ name, muscles, url });

export const muscleGroups = [
  {
    name: "Back",
    push: null,
    pull: {
      day: "Wednesday",
      exercises: [
        exercise(
          "Seated Row",
          "Latissimus dorsi, rhomboids, mid trapezius, biceps",
          "https://liftmanual.com/band-seated-row/",
        ),
        exercise(
          "Bent-Over Row",
          "Latissimus dorsi, rhomboids, rear deltoids, biceps",
          "https://liftmanual.com/band-bent-over-row/",
        ),
        exercise(
          "Band Lat Pulldown",
          "Latissimus dorsi, teres major, biceps",
          "https://liftmanual.com/band-kneeling-pulldown/",
        ),
        exercise(
          "Face Pull",
          "Rear deltoids, rhomboids, mid trapezius",
          "https://liftmanual.com/band-face-pull/",
        ),
      ],
    },
  },
  {
    name: "Biceps",
    push: null,
    pull: {
      day: "Wednesday",
      exercises: [
        exercise(
          "Bicep Curl",
          "Biceps brachii, brachialis",
          "https://liftmanual.com/band-biceps-curl/",
        ),
        exercise(
          "Hammer Curl",
          "Brachialis, brachioradialis, biceps brachii",
          "https://liftmanual.com/band-hammer-curl/",
        ),
        exercise(
          "Concentration Curl",
          "Biceps brachii (short head)",
          "https://liftmanual.com/band-concentration-curl/",
        ),
      ],
    },
  },
  {
    name: "Chest",
    push: {
      day: "Monday",
      exercises: [
        exercise(
          "Chest Press",
          "Pectoralis major, anterior deltoids, triceps",
          "https://liftmanual.com/band-standing-chest-press/",
        ),
        exercise(
          "Standing Chest Fly",
          "Pectoralis major, anterior deltoids",
          "https://liftmanual.com/band-chest-fly/",
        ),
        exercise(
          "Incline Press",
          "Upper pectoralis major (clavicular head), anterior deltoids, triceps",
          "https://liftmanual.com/band-standing-incline-chest-press/",
        ),
      ],
    },
    pull: null,
  },
  {
    name: "Forearms",
    push: {
      day: "Friday",
      exercises: [
        exercise(
          "Reverse Wrist Curl",
          "Wrist extensors (extensor carpi radialis/ulnaris)",
          "https://liftmanual.com/band-reverse-wrist-curl/",
        ),
      ],
    },
    pull: {
      day: "Friday",
      exercises: [
        exercise(
          "Wrist Curl",
          "Wrist flexors (flexor carpi radialis/ulnaris)",
          "https://liftmanual.com/band-wrist-curl/",
        ),
      ],
    },
  },
  {
    name: "Shoulders",
    push: {
      day: "Monday",
      exercises: [
        exercise(
          "Overhead Press",
          "Deltoids (all heads), triceps, upper trapezius",
          "https://liftmanual.com/band-shoulder-press/",
        ),
        exercise(
          "Lateral Raise",
          "Medial (lateral) deltoid",
          "https://liftmanual.com/band-lateral-raise/",
        ),
      ],
    },
    pull: {
      day: "Wednesday",
      exercises: [
        exercise(
          "Face Pull",
          "Rear deltoids, rotator cuff (infraspinatus, teres minor), mid trapezius",
          "https://liftmanual.com/band-face-pull/",
        ),
        exercise(
          "Rear Delt Fly",
          "Posterior deltoid, rhomboids",
          "https://liftmanual.com/band-reverse-fly/",
        ),
        exercise(
          "Upright Row",
          "Lateral deltoid, upper trapezius",
          "https://liftmanual.com/band-upright-row/",
        ),
      ],
    },
  },
  {
    name: "Triceps",
    push: {
      day: "Monday",
      exercises: [
        exercise(
          "Tricep Pushdown",
          "Triceps brachii (all heads)",
          "https://liftmanual.com/band-pushdown/",
        ),
        exercise(
          "Overhead Tricep Extension",
          "Triceps brachii (long head)",
          "https://liftmanual.com/band-overhead-triceps-extension/",
        ),
        exercise(
          "Kickback",
          "Triceps brachii",
          "https://liftmanual.com/band-triceps-kickback/",
        ),
      ],
    },
    pull: null,
  },
];
