package com.gui.cinemabackend.model;

public class TicketDTO {
    private Long userId;

    private Long sessionId;
    private Seat seat;

    public TicketDTO() {
    }

    public TicketDTO(Long userId, Seat seat, Long sessionId) {
        this.userId = userId;
        this.sessionId = sessionId;
        this.seat = seat;
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

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(Long sessionId) {
        this.sessionId = sessionId;
    }
}
