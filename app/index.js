import { ScrollView, Text, View, Button } from "react-native";
import App from "../components/App.js";
import Styles from "../components/Styles.js";
import { StrictMode } from "react";

function Nav() {
  return(
    <View>
      <Text style={Styles.textStyle.subtitle}>Timothy Mwangi - 000937691</Text>
    </View>
  )
}

function Footer() {
  return (
    <View style={Styles.appStyles.footer}>
      <Text style={Styles.appStyles.text}>
        Source: 
      </Text>
      <View style={Styles.appStyles.buttonContainer}>
        <Button
          onPress={() => Linking.openURL('https://imdb.iamidiotareyoutoo.com/docs/index.html')}
          title="Free Movie DB"
          color="rgb(166, 77, 121)"
        />
      </View>
    </View>
  );
};


export default function Page() {
  return (
    <ScrollView style={Styles.indexStyles.container}>
      <StrictMode>
        <Nav />
        <Text style={Styles.textStyle.title}>Show Search</Text>
        <Text style={Styles.textStyle.subtitle}>This is to help you find movies</Text>
        <App />
        <Footer />
      </StrictMode>
    </ScrollView>
  );
}