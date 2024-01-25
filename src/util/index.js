import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export const getWidth = (percentage) => (width / 100) * percentage;

export const getHeight = (percentage) => (height / 100) * percentage;
