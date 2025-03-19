import React, { useState, useEffect } from "react"; 
import { ActivityIndicator, Image, View, Text } from 'react-native';
import axios, { HttpStatusCode } from 'axios';
import Show from "./Show.js";
import Styles from './Styles.js';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


async function fetchShowAPI() {
    const options = {
        method: 'GET',
        url: "https://imdb.iamidiotareyoutoo.com/search",
        params: {
            q: "Smile2",
            tt: ""
        }
    };

    try {
        const json = await axios.request(options);
        return (json.status == 200) ? json.data : { description : null };
    } catch (error) {
        console.error("Error from Rapid API: " + error);
        return {};
    }
}

export default function MovieDisplay() {
    const [Shows, SetShows] = useState([]);
    const [isloading, setLoading] = useState(true);

    async function createShow() {
        const fetchShows = await fetchShowAPI();
        console.log(fetchShows);
        const shows = fetchShows.description;
        const AllShows = [];
    
        shows.forEach(show => {
            const poster = {
                image : show["#IMG_POSTER"],
                width : show["photo_width"],
                height : show["photo_height"]
            };
    
            AllShows.push(
                new Show(show["#TITLE"], show["#YEAR"], show["#IMDB_ID"], show["#RANK"], show["#ACTORS"], poster)
            );
        });
        return AllShows;
    }

    useEffect(() => {
        SetShows(createShow());
    }, []);

    console.log(Shows)
    
    return (
        <View>
            <Text style={Styles.textStyle.text}>
                Test
            </Text>
        </View>
    );
}