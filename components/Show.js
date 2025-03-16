export default class Show {
    #title;
    #overview;
    #genres;
    #imdb;
    #showType;
    #seasons;
    #episodes;
    #airDate;
    #runTime;
    #images = {};
    #stream = [];
    
    constructor(title, overview, genres, imdbid, showType, seasons, episodes, airDate, runTime, images, stream) {
        this.#title = title;
        this.#overview = overview;
        this.#genres = genres;
        this.#imdb = "https://www.imdb.com/title/" + imdbid;
        this.#showType = showType;
        this.#seasons = seasons;
        this.#episodes = episodes;
        this.#airDate = airDate;
        this.#runTime = runTime
        this.#images = images;
        this.#stream = stream;
    }

    getTitle() { return this.#title; }
    getOverview() { return this.#overview; }
    getGenre() { return this.#genres; }
    getImdb() { return this.#imdb; }
    getShowType() { return this.#showType; }
    getSeasons() { return this.#seasons; }
    getEpisodes() { return this.#episodes; }
    getAirDate() { return this.#airDate; }
    getRunTime() { return this.#runTime; }
    getImages() { return this.#images; }
    getStream() { return this.#stream; }
}