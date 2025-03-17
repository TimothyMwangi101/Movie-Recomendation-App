import { Text, View } from "react-native";
import App from "../components/App.js";
import Styles from "../components/Styles.js";
import { StrictMode } from "react";


export default function Page() {
  return (
    <View style={Styles.indexStyles.container}>
      <View>
        <Text style={Styles.indexStyles.title}>Show Search</Text>
        <Text style={Styles.indexStyles.subtitle}>This is to help you find movies</Text>
      </View>
      <StrictMode>
        <App />
      </StrictMode>
    </View>
  );
}