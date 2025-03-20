import React, { useState, useEffect } from "react";
import { ActivityIndicator, Image, View, Text, Button, Linking, FlatList } from 'react-native';
import axios from 'axios';
import Show from "./Show.js";
import Styles from './Styles.js';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


async function fetchShowAPI() {
    const options = {
        method: 'GET',
        url: "https://imdb.iamidiotareyoutoo.com/search",
        params: {
            q: "korra",
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

function SearchShow() {
    cosnt [Search, SetSearch] = useState("");
    return(
        <View>

        </View>
    );
}

function MovieCard({ props }) {
    const [showCards, setShowCards] = useState(false);

    function toggleView() {
        setShowCards(!showCards);
    }
    // https://www.geeksforgeeks.org/react-native-flatlist-component/
    const renderItem = ({ item }) => (
        <View>
            <Image
                source={{ uri: item.getPoster().image }}
                alt={`${item.getTitle()} Poster`}
                style={{resizeMode: 'center', width: 500, height: 500}} 
            />
            <Text>{item.getTitle()} - {item.getYear()}</Text>
            <Text>Ranked #{item.getRank()}</Text>
            <Text>Actors: {item.getActors()}</Text>
            <Button
                title={`${item.getTitle()} on IMDB`}
                onPress={() => Linking.openURL(`https://imdb.com/title/${item.getImdbId()}`)}
                color={"rgb(166, 77, 121)"}
            />
        </View>
    );

    return (
        <View>
            <Button title={showCards ? "Hide Movie Cards" : "Show Movie Cards"} onPress={toggleView} color={"rgb(166, 77, 121)"} />
            {showCards && (
                <FlatList
                    data={props}
                    renderItem={renderItem}
                />
            )}
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