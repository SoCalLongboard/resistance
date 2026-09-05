import ExerciseTable from "./components/ExerciseTable";
import "./App.css";

function App() {
  return (
    <main>
      <h1>Resistance Band Exercises</h1>
      <p className="subtitle">
        Tubular band exercises (handles or clips) for the major upper body
        muscle groups, split by push and pull.
      </p>
      <ExerciseTable />
    </main>
  );
}

export default App;
