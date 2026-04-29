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

    public MovieWithSessionsDTO(Movie movie, boolean includeMovieSessions) {
        super(movie);
        if (includeMovieSessions && movie.getSessions() != null) {
            this.sessions = movie.getSessions().stream()
                    .map(MovieSessionDTO::new)
                    .toList();
        }
    }

    public void addSession(Session session) {
        if (sessions.stream().noneMatch(movieSession -> movieSession.getId().equals(session.getId()))) {
            sessions.add(new MovieSessionDTO(session));
        }
    }

    public List<MovieSessionDTO> getSessions() {
        return sessions;
    }
}
