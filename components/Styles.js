import { StyleSheet } from "react-native";

const Styles = {
    
    appStyles: StyleSheet.create({
        container: {
            borderRadius: 8,
        },
        footer: {
            padding: 20,
            backgroundColor: 'rgb(59, 28, 50)',
            alignItems: 'center',
        },
        text: {
            fontSize: 14,
            color: 'white',
        },
        body: {
            maxWidth: 1000,
            alignItems: 'center',
        }
    }),

    indexStyles: StyleSheet.create({
        container: {
            backgroundColor: 'rgb(26, 26, 29)',
            
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
};

export default Styles;