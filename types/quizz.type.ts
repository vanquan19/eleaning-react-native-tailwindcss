export type Quiz = {
  id: number;
  title: string;
  description: string;
  lessonId: number;
  questions: QuizQuestions[];
};

export type QuizAttempt = {
  attemptId: number;
  quiz: Quiz;
  userId: number;
  startAt: string;
  questions: QuizQuestions[];
};

export type QuizQuestions = {
  id: number;
  content: string;
  type: string;
  quizId: number;
  choices: Choice[];
};

export type Choice = {
  id: number;
  content: string;
  isCorrect: boolean;
};

export type SubmitQuizAnswer = {
  questionId: number;
  choiceId: number;
};

export type Answer = {
  questionId: number;
  choiceId: number;
  isCorrect: boolean;
};

export type QuizAttemptResult = {
  attemptId: number;
  quiz: Quiz;
  userId: number;
  score: number;
  startedAt: string;
  submittedAt: string;
  answers: Answer[];
};

export type HistoryAttempt = {
  attemptId: number;
  quizId: number;
  score: number;
  startedAt: string;
  submittedAt: string | null;
};

export type AnswerExplanation = {
  questionId: number;
  choiceId: number;
  isCorrect: boolean;
  reasoning: string;
  tip: string;
};
