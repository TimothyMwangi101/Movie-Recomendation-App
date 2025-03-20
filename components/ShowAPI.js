import React, { useState, useEffect } from "react";
import { ActivityIndicator, Image, View, Text, Button, Linking, FlatList, TextInput } from 'react-native';
import axios from 'axios';
import Show from "./Show.js";
import Styles from './Styles.js';
/**
 * @author Timothy Mwangi
 * StAuth10244: I Timothy Mwangi, 000937691 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
*/
async function fetchShowAPI(show) {
    const options = {
        method: 'GET',
        url: "https://imdb.iamidiotareyoutoo.com/search",
        params: {
            q: show,
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
    // https://www.geeksforgeeks.org/react-native-flatlist-component/
    const renderItem = ({ item }) => (
        <View style={Styles.card.container}>
            <Image
                source={{ uri: item.getPoster().image }}
                alt={`${item.getTitle()} Poster`}
                style={Styles.card.image}
            />
            <View style={Styles.card.textContainer}>
                <Text style={Styles.card.text}>{item.getTitle()} - {item.getYear()}</Text>
                <Text style={Styles.card.text}>Ranked #{item.getRank()}</Text>
                <Text style={Styles.card.text}>Actors: {item.getActors()}</Text>
            </View>
            <Button
                title={`${item.getTitle()} on IMDB`}
                onPress={() => Linking.openURL(`https://imdb.com/title/${item.getImdbId()}`)}
                color={"rgb(166, 77, 121)"}
            />
        </View>
    );

    return (
        <>
            <FlatList data={props} renderItem={renderItem} />
        </>
    );
}

export default function MovieDisplay() {
    const [Shows, SetShows] = useState([]);
    const [Isloading, SetLoading] = useState(true);
    const [Search, SetSearch] = useState("breaking bad");
    const [showCards, setShowCards] = useState(false);

    function toggleView() {
        setShowCards(!showCards);
    }

    async function createShow(show) {
        try {
            const fetchShows = await fetchShowAPI(show);
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
        createShow(Search);
    }, [Search]);

    return (
        <View style={Styles.movieDisplay.container}>
            <TextInput
                style={Styles.movieDisplay.textInput}
                placeholder="Type a movie/show name"
                onChangeText={newText => SetSearch(newText)}

            />
            <View style={{ width: "30vw", minWidth: 200, paddingBlock: 5 }}>
                <Button
                    title={showCards ? "Hide Movie Cards" : "Show Movie Cards"}
                    onPress={toggleView}
                    color={"rgb(166, 77, 121)"}
                />
            </View>
            {(Isloading) ? <ActivityIndicator /> : (showCards) ? <MovieCard props={Shows} /> : null}
        </View>
    );
}