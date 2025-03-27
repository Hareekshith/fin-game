import { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

const SimulationScreen = ({ navigation }) => {
  const [salary, setSalary] = useState(3000);
  const [savings, setSavings] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [investments, setInvestments] = useState(0);
  const [netWorth, setNetWorth] = useState(3000);

  const handleChoice = (choice) => {
    let newInvestments = investments;
    if (choice === "save") setSavings(savings + 500);
    if (choice === "spend") setExpenses(expenses + 500);
    if (choice === "invest") {
      const outcome = Math.random();
      if (outcome < 0.5) {
        newInvestments += 500 * 1.5; // 50% gain
        Alert.alert("📈 Stock Market Up!", "Your investment grew by 50%!");
      } else {
        newInvestments += 500 * 0.7; // 30% loss
        Alert.alert("📉 Stock Market Down!", "Your investment lost 30%.");
      }
      setInvestments(newInvestments);
    }
    setNetWorth(salary + savings + newInvestments - expenses);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏦 Financial Simulation</Text>
      <Text>💰 Salary: ${salary}</Text>
      <Text>💾 Savings: ${savings}</Text>
      <Text>📉 Expenses: ${expenses}</Text>
      <Text>📈 Investments: ${investments.toFixed(2)}</Text>
      <Text>💎 Net Worth: ${netWorth.toFixed(2)}</Text>
      <Button title="Save $500" onPress={() => handleChoice("save")} />
      <Button title="Spend $500" onPress={() => handleChoice("spend")} />
      <Button title="Invest $500" onPress={() => handleChoice("invest")} />
      <Button title="Next Month" onPress={() => navigation.navigate("Dashboard")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});

export default SimulationScreen;

