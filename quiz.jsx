import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const questions = [
  {
    question: "What is the best way to manage a budget?",
    options: ["Spend first, save later", "Save first, then spend", "Ignore budgeting"],
    answer: 1,
  },
  {
    question: "Which of these is a low-risk investment?",
    options: ["Stocks", "Bonds", "Cryptocurrency"],
    answer: 1,
  },
  {
    question: "which of these is an example of a good debt?",
    options: ["Credit card debt with high interest", "A payday loan", "A student loan for a degree with high earning potential"],
    answer: 2,
  },
  {
    question: "what data can AI use to customize learning paths in a financial education app?",
    options: ["User quiz performance and financial habits", "Random social media trends", "only user's age"],
    answer: 0,
  },
  {
    question: "which financial habit helps build a strong credit score?",
    options: [ "Taking multiple loans at once", "Never using a credit card", "Paying bills on time"],
    answer: 2,
  },
  {
    question: "What financial metric indicates a person's creditworthiness?",
    options: [ "Net worth", "Credit score", "Infaltion"]
    answer: 1,
  },
  {
    question: "What is the term for the rise in the price of goods and serivce over time?",
    options: [ "Inflation", "Deflation", "Recession"],
    answer: 0,
  },  
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleAnswer = (index) => {
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameOver(true);
    }
  };

  return (
    <View style={styles.container}>
      {gameOver ? (
        <Text style={styles.result}>Game Over! Score: {score}/{questions.length}</Text>
      ) : (
        <View>
          <Text style={styles.question}>{questions[currentQuestion].question}</Text>
          {questions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity key={index} style={styles.button} onPress={() => handleAnswer(index)}>
              <Text style={styles.buttonText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  question: { fontSize: 18, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  button: { backgroundColor: "blue", padding: 10, margin: 5, borderRadius: 5 },
  buttonText: { color: "white", fontSize: 16 },
  result: { fontSize: 20, fontWeight: "bold", color: "green" },
});
