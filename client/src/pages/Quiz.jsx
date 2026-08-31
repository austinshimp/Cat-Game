import { useState } from "react";
import { api } from "../lib/api";

const DIFFICULTIES = ["easy", "medium", "hard"];
const QUESTION_COUNT = 8;

export function Quiz() {
  const [phase, setPhase] = useState("setup"); // setup | playing | finished
  const [difficulty, setDifficulty] = useState("easy");
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); // { selectedIndex, correct, correctOptionIndex, explanation }
  const [loadError, setLoadError] = useState(null);

  async function startQuiz() {
    setLoadError(null);
    try {
      const data = await api.getRandomQuestions(difficulty, QUESTION_COUNT);
      if (!data.questions?.length) {
        setLoadError(
          "No questions found for that difficulty yet — try running the seed script."
        );
        return;
      }
      setQuestions(data.questions);
      setIndex(0);
      setScore(0);
      setFeedback(null);
      setPhase("playing");
    } catch (err) {
      setLoadError(err.message);
    }
  }

  async function selectAnswer(selectedIndex) {
    if (feedback) return; // already answered this question
    const question = questions[index];
    try {
      const result = await api.checkAnswer(question._id, selectedIndex);
      setFeedback({ selectedIndex, ...result });
      if (result.correct) setScore((s) => s + 1);
    } catch (err) {
      setLoadError(err.message);
    }
  }

  function nextQuestion() {
    setFeedback(null);
    if (index + 1 < questions.length) {
      setIndex((i) => i + 1);
    } else {
      setPhase("finished");
    }
  }

  if (phase === "setup") {
    return (
      <div className="quiz-setup">
        <span className="eyebrow">The Trivia Hall</span>
        <h2>Choose your difficulty</h2>
        <p>Eight questions drawn at random from the catalog.</p>
        <div className="difficulty-options">
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              className={d === difficulty ? "selected" : ""}
              onClick={() => setDifficulty(d)}
            >
              {d}
            </button>
          ))}
        </div>
        {loadError && <p className="state-message">{loadError}</p>}
        <button className="btn btn-solid" onClick={startQuiz}>
          Begin
        </button>
      </div>
    );
  }

  if (phase === "finished") {
    return (
      <div className="results-card">
        <span className="eyebrow">Results</span>
        <div className="results-score">
          {score} / {questions.length}
        </div>
        <p>
          {score === questions.length
            ? "A perfect specimen record."
            : "Nice work — the catalog awaits another pass."}
        </p>
        <button className="btn btn-solid" onClick={() => setPhase("setup")}>
          Try again
        </button>
      </div>
    );
  }

  const question = questions[index];

  return (
    <div className="question-card">
      <div className="question-meta">
        <span>
          Question {index + 1} / {questions.length}
        </span>
        <span>{difficulty}</span>
      </div>
      <p className="question-text">{question.questionText}</p>

      <div className="options-list">
        {question.options.map((option, i) => {
          let cls = "option-btn";
          if (feedback) {
            if (i === feedback.correctOptionIndex) cls += " correct";
            else if (i === feedback.selectedIndex) cls += " incorrect";
          }
          return (
            <button
              key={i}
              className={cls}
              disabled={!!feedback}
              onClick={() => selectAnswer(i)}
            >
              {option}
            </button>
          );
        })}
      </div>

      {feedback && (
        <div className="explanation">
          <span className="eyebrow">
            {feedback.correct ? "Correct" : "Not quite"}
          </span>
          <p>{feedback.explanation}</p>
        </div>
      )}

      {loadError && <p className="state-message">{loadError}</p>}

      <div className="quiz-footer">
        <span className="quiz-score">
          Score: {score} / {index + (feedback ? 1 : 0)}
        </span>
        {feedback && (
          <button className="btn btn-solid" onClick={nextQuestion}>
            {index + 1 < questions.length ? "Next question" : "See results"}
          </button>
        )}
      </div>
    </div>
  );
}
