import AsyncStorage from "@react-native-async-storage/async-storage";

const saveProgress = async (userId, module, score) => {
  let progress = await AsyncStorage.getItem("userProgress");
  progress = progress ? JSON.parse(progress) : {};

  if (!progress[userId]) progress[userId] = {};
  progress[userId][module] = score;

  await AsyncStorage.setItem("userProgress", JSON.stringify(progress));
};

const getProgress = async (userId) => {
  let progress = await AsyncStorage.getItem("userProgress");
  progress = progress ? JSON.parse(progress) : {};
  return progress[userId] || {};
};

export { saveProgress, getProgress };
