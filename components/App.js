import React, { StrictMode, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Linking, Button } from 'react-native';
import Styles from "./Styles.js";
import MovieDisplay from "./ShowAPI.js";


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
      </View>
    </View>    
  );
}
