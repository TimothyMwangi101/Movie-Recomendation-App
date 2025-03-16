import { StatusBar } from 'expo-status-bar';
import { Text, View, Linking, Button } from 'react-native';
import Styles from "./Styles.js";
import API from "./ShowAPI.js";

const Footer = () => {
  return (
    <View style={Styles.appStyles.footer}>
      <Text style={Styles.appStyles.text}>
        I got the documentation from Movie of the night using a RapidApi key.
      </Text>
      <View style={Styles.appStyles.buttonContainer}>
        <Button
          onPress={() => Linking.openURL('https://docs.movieofthenight.com/')}
          title="Movie Of The Night"
          color="rgb(166, 77, 121) "
        />
        <Button
          onPress={() => Linking.openURL('https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability')}
          title="Rapid API"
          color="rgb(166, 77, 121)"
        />
        <Button 
          
          onPress={API}
          title='Test API'
        />
      </View>
    </View>
  );
};

export default function App() {
  return (
    <View style={Styles.appStyles.container}>
      <StatusBar style="auto" />
      <Footer />
    </View>
    
  );
}
