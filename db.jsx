import { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { auth, db } from "./fb"; // Import Firebase instances
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const DashboardScreen = () => {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(false); // Prevents multiple API calls

  // Listen for user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch user data from Firestore when `user` changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setPoints(data.points || 0);
        setStreak(data.streak || 0);
      } else {
        await setDoc(userRef, { points: 0, streak: 0, lastCompleted: null });
      }
    };
    fetchUserData();
  }, [user]);

  const earnPointsAndUpdateStreak = async () => {
    if (!user || loading) return;
    setLoading(true);

    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) return;

      const data = userSnap.data();
      const today = new Date().toISOString().split("T")[0];

      if (data.lastCompleted === today) {
        Alert.alert("Info", "You already completed a quiz today! ✅");
        return;
      }

      let newStreak = data.streak || 0;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      if (data.lastCompleted === yesterdayStr) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }

      await updateDoc(userRef, {
        points: data.points + 10,
        streak: newStreak,
        lastCompleted: today,
      });

      setPoints(data.points + 10);
      setStreak(newStreak);
    } catch (error) {
      Alert.alert("Error", "Failed to update points. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome, {user ? user.email : "Loading..."}
      </Text>
      <Text style={styles.points}>Your Points: {points}</Text>
      <Text style={styles.streak}>🔥 Streak: {streak} days</Text>
      <Button
        title={loading ? "Processing..." : "Complete Quiz (Earn 10 Points)"}
        onPress={earnPointsAndUpdateStreak}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  points: { fontSize: 18, marginBottom: 10 },
  streak: { fontSize: 20, fontWeight: "bold", color: "orange", marginBottom: 20 },
});

export default DashboardScreen;

