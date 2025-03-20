import { ScrollView, Text, View, Button } from "react-native";
import Styles from "../components/Styles.js";
import { StrictMode } from "react";
import MovieDisplay from "../components/ShowAPI.js";
/**
 * @author Timothy Mwangi
 * StAuth10244: I Timothy Mwangi, 000937691 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
*/
function Nav() {
  return(
    <View style={Styles.page.nav}>
      <Text style={Styles.page.heading}>Show Search</Text>
      <Text style={Styles.page.subtitle}>This is to help you find movies</Text>
    </View>
  )
}

function Footer() {
  return (
    <View style={Styles.page.footer}>
      <Text style={Styles.page.footer}>
        Source: 
      </Text>
      <Button
        onPress={() => Linking.openURL('https://imdb.iamidiotareyoutoo.com/docs/index.html')}
        title="Free Movie DB"
        color="rgb(166, 77, 121)"
      />
    </View>
  );
}

export default function Page() {
  return (
    <ScrollView style={Styles.page.body}>
      <StrictMode>
        <Nav />
        <MovieDisplay />
        <Footer />
      </StrictMode>
    </ScrollView>
  );
}