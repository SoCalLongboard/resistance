import { useMemo, useState } from "react";
import { muscleGroups } from "../data/exercises";

const DIRECTION_ORDER = { Push: 0, Pull: 1 };
const DAY_ORDER = { Monday: 0, Wednesday: 1, Friday: 2 };

const SORT_OPTIONS = [
  { key: "group", label: "Muscle Group" },
  { key: "direction", label: "Direction" },
  { key: "day", label: "Day" },
];

function exerciseTarget(name) {
  return `exercise-demo-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

function buildRows() {
  const rows = [];
  for (const group of muscleGroups) {
    for (const [label, direction] of [
      ["Push", group.push],
      ["Pull", group.pull],
    ]) {
      if (direction) {
        rows.push({
          group: group.name,
          direction: label,
          day: direction.day,
          exercises: direction.exercises,
        });
      }
    }
  }
  return rows;
}

const ROWS = buildRows();

function compareRows(a, b, sortKey) {
  switch (sortKey) {
    case "direction":
      return (
        DIRECTION_ORDER[a.direction] - DIRECTION_ORDER[b.direction] ||
        a.group.localeCompare(b.group)
      );
    case "day":
      return DAY_ORDER[a.day] - DAY_ORDER[b.day] || a.group.localeCompare(b.group);
    case "group":
    default:
      return (
        a.group.localeCompare(b.group) ||
        DIRECTION_ORDER[a.direction] - DIRECTION_ORDER[b.direction]
      );
  }
}

function ExerciseList({ exercises }) {
  return (
    <ul className="exercise-list">
      {exercises.map((exercise) => (
        <li key={exercise.name}>
          {exercise.url ? (
            <a href={exercise.url} target={exerciseTarget(exercise.name)}>
              {exercise.name}
            </a>
          ) : (
            exercise.name
          )}
          <span className="exercise-muscles">{exercise.muscles}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ExerciseTable() {
  const [sortKey, setSortKey] = useState("group");

  const rows = useMemo(
    () => [...ROWS].sort((a, b) => compareRows(a, b, sortKey)),
    [sortKey],
  );

  return (
    <table className="exercise-table">
      <thead>
        <tr>
          {SORT_OPTIONS.map(({ key, label }) => (
            <th key={key}>
              <button
                type="button"
                className={`sort-button${sortKey === key ? " active" : ""}`}
                onClick={() => setSortKey(key)}
                aria-pressed={sortKey === key}
              >
                {label}
                <span className="sort-indicator" aria-hidden="true">
                  {sortKey === key ? "▾" : ""}
                </span>
              </button>
            </th>
          ))}
          <th>Exercises</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={`${row.group}-${row.direction}`}
            className={i % 2 === 0 ? "row-even" : "row-odd"}
          >
            <td className="muscle-group-cell">{row.group}</td>
            <td>{row.direction}</td>
            <td>{row.day}</td>
            <td>
              <ExerciseList exercises={row.exercises} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
