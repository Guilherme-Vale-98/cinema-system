package com.gui.cinemabackend.model;

import com.gui.cinemabackend.entities.Movie;
import com.gui.cinemabackend.entities.Session;

import java.util.ArrayList;
import java.util.List;

public class MovieWithSessionsDTO extends MovieSummaryDTO {
    private List<MovieSessionDTO> sessions = new ArrayList<>();

    public MovieWithSessionsDTO(Movie movie) {
        super(movie);
    }

    public void addSession(Session session) {
        sessions.add(new MovieSessionDTO(session));
    }

    public List<MovieSessionDTO> getSessions() {
        return sessions;
    }
}
