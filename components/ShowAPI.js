import React, { useState, useEffect } from "react"; 
import { ActivityIndicator, Image, View, Text } from 'react-native';
import axios from "axios";
import Show from "./Show.js";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function fetchAPIKEY() {
    try {
        // https://stackoverflow.com/a/30279672/29676214
        const json = require("./APIKEY.json");
        return json.KEY;
    } catch (error) {
        console.error("Error Fethcing API Key from JSON: " + error);
        return;
    }
}

async function fetchShowAPI() {
    const key = fetchAPIKEY();
    if (!key) {
        console.error("API Key not found.");
        return null;
    }
    const options = {
        method: 'GET',
        url: "https://streaming-availability.p.rapidapi.com/shows/search/filters",
        params: {
            country: 'ca',
            output_language: 'en'
        },
        headers: {
            'x-rapidapi-key': key,
            'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
        }
    };

    try {
        const json = await axios.request(options);
        // const next = (json.data.hasMore) ? json.data.nextCursor : "";
        // console.log(next)
        // const pack = [json.show, next];
        return json.data.shows;
    } catch (error) {
        console.error("Error from Rapid API: " + error);
        return;
    }
}

async function createShow() {
    const shows = await fetchShowAPI();
    if (!shows) return [];

    const AllShows = [];

    shows.forEach(show => {

        const genres = [];
        show.genres.forEach(g => {
            genres.push(g.name);
        });

        const airDate = (show.showType == "movie") ? show.releaseYear : `${show.firstAirYear} - ${show.lastAirYear}`;

        const images = {
            "VERTICAL" : show.imageSet.verticalPoster.w1080 ?? show.imageSet.verticalPoster.w720,
            "HORIZONTAL" : show.imageSet.horizontalPoster.w1440 ?? show.imageSet.horizontalPoster.w1080
        };

        const streamOpt = [];
        show.streamingOptions.ca.forEach(s => {
            streamOpt.push(s.link);
        });

        AllShows.push(
            new Show(show.title, show.overview, genres, show.imdbId, show.showType, (show.seasonCount) ?? undefined, (show.episodeCount) ?? undefined, airDate, (show.runtime) ?? undefined, images, streamOpt)
        );
    });
    return AllShows;
}

export default function MovieDisplay() {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedShows = await createShow();
                setShows(fetchedShows);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={"large"} />
            </View>
        );
    }

    if (error) {
        return(
            <View>
                <Text>Error: {error.message || "Something went wrong"}</Text>
            </View>
        )
    }

    if (shows.length === 0) {
        return(
            <View>
                <Text>No shows found.</Text>
            </View>
        );
    }

    const src = shows[0].getImages().HORIZONTAL;
    console.log(fetchedShows);
    console.log(src);

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Image source={{ uri: src }} style={{ width: 200, height: 100 }}/>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}