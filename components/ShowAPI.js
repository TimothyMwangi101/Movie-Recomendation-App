import React, { useState, useEffect } from "react";
import { ActivityIndicator, Image, View, Text, Button, Linking } from 'react-native';
import axios from 'axios';
import Show from "./Show.js";
import Styles from './Styles.js';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


async function fetchShowAPI() {
    const options = {
        method: 'GET',
        url: "https://imdb.iamidiotareyoutoo.com/search",
        params: {
            q: "12",
            tt: ""
        }
    };

    try {
        const json = await axios.request(options);
        return (json.status == 200) ? json.data : { description: null };
    } catch (error) {
        console.error("Error from Rapid API: " + error);
        return {};
    }
}



export default function MovieDisplay() {
    const [Shows, SetShows] = useState([]);
    const [Isloading, SetLoading] = useState(true);

    async function createShow() {
        try {
            const fetchShows = await fetchShowAPI();
            const shows = fetchShows.description;
            const AllShows = [];

            for (let i = 0; i < shows.length; i++) {
                const show = shows[i];
                if (show["#IMG_POSTER"] == undefined) continue;

                const poster = {
                    image: show["#IMG_POSTER"],
                    width: show["photo_width"],
                    height: show["photo_height"]
                };

                AllShows.push(
                    new Show(show["#TITLE"], show["#YEAR"], show["#IMDB_ID"], show["#RANK"], show["#ACTORS"], poster)
                );
            }

            SetShows(AllShows);
            console.log(AllShows);
        } catch (error) {
            console.error(error);
        } finally {
            SetLoading(false);
        }
    }

    useEffect(() => {
        createShow();
    }, []);

    return (
        <View>
            <Image source={{ uri: Shows[0].getPoster().image }} alt={`${Shows[0].getTitle()} Poster`}
                style={{ resizeMode: 'center', width: 500, height: 500 }}
            />
        </View>
    );
}