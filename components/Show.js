export default class Show {
    #title;
    #year;
    #imdbId;
    #rank;
    #actors;
    #poster;
    
    constructor(title, year, imdbId, rank, actors, poster) {
        this.#title = title;
        this.#year = year;
        this.#imdbId = imdbId;
        this.#rank = rank;
        this.#actors = actors;
        this.#poster = poster;
    }

    getTitle()   { return this.#title; }
    getYear()    { return this.#year; }
    getImdbId()  { return this.#imdbId; }
    getRank()    { return this.#rank; }
    getActors()  { return this.#actors; }
    getPoster()  { return this.#poster; }

    toString() {
        return `Title: ${this.#title}, Year: ${this.#year}, IMDb ID: ${this.#imdbId}, Rank: ${this.#rank}, Actors: ${this.#actors}, Poster: ${this.#poster}`;
    }
}