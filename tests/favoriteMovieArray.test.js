import { itActsAsFavoriteMovieModel } from "./contracts/favoriteMovieContract";
import { afterEach, describe } from "@jest/globals";
let favoriteMovies = [];

const FavoriteMovieArray = {
  getMovie(id) {
    if (!id) {
      return;
    }

    return favoriteMovies.find((movie) => movie.id == id);
  },

  getAllMovies() {
    return favoriteMovies;
  },

  putMovie(movie) {
    if (!movie.hasOwnProperty("id")) {
      return;
    }

    // pastikan id belum ada dalam daftar favoriteMovies
    if (this.getMovie(movie.id)) {
      return;
    }

    favoriteMovies.push(movie);
  },
  deleteMovie(id) {
    favoriteMovies = favoriteMovies.filter((movie) => movie.id != id);
  },

  searchMovies(query) {
    return this.getAllMovies().filter((movie) => {
      const loweredCaseMovieTitle = (movie.title || "-").toLowerCase();
      const jammedMovieTitle = loweredCaseMovieTitle.replace(/\s/g, "");

      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, "");

      return jammedMovieTitle.indexOf(jammedQuery) !== -1;
    });
  },
};

describe("Favorite movie array contract test implementation", () => {
  afterEach(() => {
    favoriteMovies = [];
  });

  itActsAsFavoriteMovieModel(FavoriteMovieArray);
});
