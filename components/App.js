import React, { StrictMode, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Linking, Button } from 'react-native';
import Styles from "./Styles.js";
import MovieDisplay from "./ShowAPI.js";


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
          color="rgb(166, 77, 121)"
        />
        <Button
          onPress={() => Linking.openURL('https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability')}
          title="Rapid API"
          color="rgb(166, 77, 121)"
        />
      </View>
    </View>
  );
};

export default function App() {
  return (
    <View>
      <View>
        <StrictMode>
          <MovieDisplay />
        </StrictMode>
      </View>
      <View style={Styles.appStyles.container}>
        <StatusBar style="auto" />
        <Footer />
      </View>
    </View>    
  );
}
