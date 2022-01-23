import React, { Component } from "react";
import Table from "./common/table.component";
import Rating from "./rating.component";
import getMovies from "../service/get-movies.service";
import getGenres from "../service/get-genres.service";
import _ from "lodash";
import Pagination from "./common/pagination.component";
import Filtering from "./common/filtering.component";

class Movies extends React.Component {
  state = {
    movies: [],
    genres: [],
    sortColumn: { path: "id", order: "asc" },
    activePage: 1,
    pageCount: 5,
    selectedGenres: "All Genres",
  };

  componentDidMount() {
    const movies = getMovies();
    const genres = ["All Genres", ...getGenres()];
    this.setState({ ...this.state, movies, genres });
  }

  handleToggleRating = (movieRank) => {
    const movies = [...this.state.movies];
    const movie = movies.find((movie) => movie.id === movieRank);
    movie.your_rating = !movie.your_rating;
    this.setState({ ...this.state, movies });
  };

  handleSort = (sortColumn) => {
    this.setState({ ...this.state, sortColumn });
  };

  onClickPage = (activePage) => {
    this.setState({ ...this.state, activePage });
  };

  paginateMovies = (movies) => {
    const { activePage, pageCount } = this.state;
    const start = (activePage - 1) * pageCount;
    const paginatedMoves = movies.slice(start, start + pageCount);
    return paginatedMoves;
  };

  filterMovies = () => {
    const { movies, selectedGenres } = this.state;
    const filteredMovies = movies.filter((movie) => {
      if (selectedGenres === "All Genres") return true;

      if (movie.genres.includes(selectedGenres)) return true;
      return false;
    });
    return filteredMovies;
  };

  sortMovies = (movies) => {
    const { sortColumn } = this.state;
    const sortedMovies = _.orderBy(
      movies,
      [sortColumn.path],
      [sortColumn.order]
    );
    return sortedMovies;
  };

  onClickFilter = (selectedGenres) => {
    this.setState({ ...this.state, selectedGenres });
  };

  render() {
    const filteredMovies = this.filterMovies();
    const paginaged = this.paginateMovies(filteredMovies);
    const movies = this.sortMovies(paginaged);
    const columns = [
      {
        label: "Rank",
        path: "id",
        sorting: true,
        content: (movie, key) => <td>{movie[key]}</td>,
      },
      {
        label: "Title",
        path: "title",
        sorting: true,
        content: (movie, key) => <td>{movie[key]}</td>,
      },
      {
        label: "Poster",
        path: "posterUrl",
        content: (movie, key) => (
          <td>
            <img src={movie[key]} style={{ height: "100px", width: "auto" }} />
          </td>
        ),
      },
      {
        label: "Your Rating",
        path: "your_rating",
        content: (movie, key) => (
          <td>
            <Rating
              isRated={movie[key]}
              rank={movie.id}
              handleToggleRating={this.handleToggleRating}
            />
          </td>
        ),
      },
      {
        label: "Action",
        path: "action",
        content: (movie, key) => <td>{movie[key]}</td>,
      },
    ];
    return (
      <>
        <div className="container">
          <div className="row">
            <Filtering
              item={this.state.genres}
              selectedGenres={this.state.selectedGenres}
              onClickFilter={this.onClickFilter}
            />
            <div className="col-lg-8">
              <Table
                items={movies}
                columns={columns}
                onSort={this.handleSort}
                sortColumn={this.state.sortColumn}
              />
              <Pagination
                totalItem={filteredMovies.length}
                pageCount={this.state.pageCount}
                activePage={this.state.activePage}
                onClickPage={this.onClickPage}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Movies;
