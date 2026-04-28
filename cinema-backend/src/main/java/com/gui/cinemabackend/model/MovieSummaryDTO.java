package com.gui.cinemabackend.model;

import com.gui.cinemabackend.entities.Movie;

public class MovieSummaryDTO {
    private Long id;
    private String title;
    private String genre;
    private String description;
    private int runtime;
    private String posterPath;
    private String trailerPath;
    private boolean isFeatured;

    public MovieSummaryDTO(Movie movie) {
        this.id = movie.getId();
        this.title = movie.getTitle();
        this.genre = movie.getGenre();
        this.description = movie.getDescription();
        this.runtime = movie.getRuntime();
        this.posterPath = movie.getPosterPath();
        this.trailerPath = movie.getTrailerPath();
        this.isFeatured = movie.isFeatured();
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getGenre() {
        return genre;
    }

    public String getDescription() {
        return description;
    }

    public int getRuntime() {
        return runtime;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public String getTrailerPath() {
        return trailerPath;
    }

    public boolean getIsFeatured() {
        return isFeatured;
    }
}
