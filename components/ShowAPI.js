import axios from "axios";
import Show from "./Show.js";

const AllShows = [];

function fetchAPIKEY() {
    try {
        // https://stackoverflow.com/a/30279672/29676214
        const json = require("./APIKEY.json");
        // console.log(json.KEY);
        return json.KEY;
    } catch (error) {
        console.error("Error Fethcing API Key from JSON: " + error);
        return;
    }
}

async function fetchShowAPI(url = "") {
    const options = {
        method: 'GET',
        url: "https://streaming-availability.p.rapidapi.com/shows/search/filters",
        params: {
            country: 'ca',
            output_language: 'en'
        },
        headers: {
            'x-rapidapi-key': fetchAPIKEY(),
            'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
        }
    };

    try {
        const json = await axios.request(options);
        const next = (json.data.hasMore) ? json.data.nextCursor : "";
        // console.log(next)
        // const pack = [json.show, next];
        return json.data.shows;

    } catch (error) {
        console.error("Error from Rapid API: " + error);
        return;
    }
}

export default async function createShow() {
    const shows = await fetchShowAPI();

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
            new Show(show.title, show.overwiew, genres, show.imdbId, show.showType, (show.seasonCount) ?? undefined, (show.episodeCount) ?? undefined, airDate, (show.runtime) ?? undefined, images, streamOpt)
        );
    });

    console.log(AllShows);
}