import { StyleSheet } from "react-native";
/**
 * @author Timothy Mwangi
 * StAuth10244: I Timothy Mwangi, 000937691 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
*/

const Styles = {
    page: StyleSheet.create({
        body :{
            backgroundColor: 'rgb(26, 26, 29)'
        },
        nav: {
            marginTop: 40,
            marginStart: 20
        },
        footer: {
            padding: 10,
            backgroundColor: 'rgb(59, 28, 50)',
            alignItems: 'center',
            fontSize: 14,
            color: 'white',
        },
        heading: {
            fontSize: 30,
            color: "white"
        },
        subtitle: {
            fontSize: 20,
            color: "white"
        }
    }),
    textStyle: StyleSheet.create({
        title: {
            fontSize: 60,
            fontWeight: 'bold',
            color: 'white'
        },
        subtitle: {
            fontSize: 36,
            color: 'white',
        },
        text: {
            fontSize: 14,
            color: 'white',
        }
    }),
    card: StyleSheet.create({
        container: {
            maxWidth: 800,
            minWidth: 350,
            marginBottom: 20,
            padding: '20px',
            borderWidth: 1,
            borderRadius: 3,
            borderColor: 'white',
            alignItems: 'center',
        },
        image: {
            resizeMode: 'contain',
            width: '80vw', 
            height: '80vh',
            minWidth: 300
        },
        text: {
            color: 'white',
            fontSize: 15,
        },
        textContainer: {
            padding: '5%'
        }
    }),
    movieDisplay: StyleSheet.create({
        container: {
            width: "90hw",
            alignItems: 'center',
            padding: 20
        },
        textInput: {
            height: 40, 
            backgroundColor: 'white',
            width: "30vw", 
            minWidth: 200, 
            margin: 5, 
            textAlign: 'center',
            borderRadius: 3
        }
    })
};

export default Styles;