package com.gui.cinemabackend.model;

public class TicketDTO {
    private Long userId;
    private Seat seat;

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


}
