package com.gui.cinemabackend.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class TicketDTO {
    private Long userId;
    private String movieTitle;
    private Seat seat;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm")
    private Date startTime;

    public TicketDTO() {
    }

    public TicketDTO(Long userId, Seat seat, String movieTitle, Date startTime) {
        this.userId = userId;
        this.movieTitle = movieTitle;
        this.seat = seat;
        this.startTime = startTime;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Seat getSeat() {
        return seat;
    }

    public void setSeat(Seat seat) {
        this.seat = seat;
    }

    public String getMovieTitle() {
        return movieTitle;
    }

    public void setMovieTitle(String movieTitle) {
        this.movieTitle = movieTitle;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }
}