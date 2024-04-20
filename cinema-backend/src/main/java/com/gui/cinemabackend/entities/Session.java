package com.gui.cinemabackend.entities;

import com.gui.cinemabackend.model.Seat;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Entity
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;

    @OneToMany(mappedBy = "session")
    private List<Ticket> tickets;
    private Date startTime;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
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

    public List<Seat> getSeats(){
        return this.tickets.stream().map(ticket -> ticket.getSeat()).collect(Collectors.toList());
    }

}
