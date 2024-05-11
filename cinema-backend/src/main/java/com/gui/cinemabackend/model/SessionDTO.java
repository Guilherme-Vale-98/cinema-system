package com.gui.cinemabackend.model;

import com.gui.cinemabackend.entities.Movie;
import com.gui.cinemabackend.entities.Session;
import com.gui.cinemabackend.entities.Ticket;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

public class SessionDTO {

    private Long id;
    private String movieTitle;
    private List<Ticket> tickets;
    private Date startTime;

    public SessionDTO (Session session){
        this.id = session.getId();
        this.movieTitle = session.getMovie().getTitle();
        this.tickets = session.getTickets();
        this.startTime = session.getStartTime();
    }

    public SessionDTO(){}


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMovieTitle() {
        return movieTitle;
    }

    public void setMovieTitle(String movieTitle) {
        this.movieTitle = movieTitle;
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }
}
