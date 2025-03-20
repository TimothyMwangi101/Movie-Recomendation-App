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

function MovieCard({ props }) {
    const [showCards, setShowCards] = useState(false);

    function toggleView() {
        setShowCards(!showCards);
    }
    return (
        <View>
            <Button title={showCards ? "Hide Movie Cards" : "Show Movie Cards"} onPress={toggleView} color={"rgb(166, 77, 121)"} />
                {
                    showCards &&
                    <View>
                    {
                        props.map((show, index) => (
                            <View key={index}>
                                <Image source={{uri: show.getPoster().image}} alt={`${show.getTitle()} Poster`}
                                    style={{resizeMode: 'center', width: 500, height: 500}}
                                />
                                <Text>{show.getTitle()} - {show.getYear()}</Text>
                                <Text>Ranked #{show.getRank()}</Text>
                                <Text>Actors: {show.getActors()}</Text>
                                <Button
                                    title={`${show.getTitle()} on IMDB`}
                                    onPress={() => Linking.openURL(`https://imdb.com/title/${show.getImdbId()}`)}
                                    color={"rgb(166, 77, 121)"}
                                    
                                />
                            </View>
                        )) 
                    }
                </View>
                }
        </View>
    );
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
            {
                Isloading ? <ActivityIndicator /> :
                    (
                        <MovieCard props={Shows} />  
                    )
            }
        </View>
    );
}