package com.gui.cinemabackend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gui.cinemabackend.entities.Session;

import java.util.Date;
import java.util.List;

public class MovieSessionDTO {
    private Long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm")
    private Date startTime;
    private List<TicketDTO> tickets;

    public MovieSessionDTO(Session session) {
        this.id = session.getId();
        this.startTime = session.getStartTime();
        this.tickets = session.getTickets() == null ? List.of() : session.getTickets().stream()
                .map(ticket -> new TicketDTO(
                        ticket.getId(),
                        ticket.getUser() == null ? null : ticket.getUser().getId(),
                        ticket.getSeat(),
                        session.getMovie().getTitle(),
                        session.getStartTime()
                ))
                .toList();
    }

    public Long getId() {
        return id;
    }

    public Date getStartTime() {
        return startTime;
    }

    public List<TicketDTO> getTickets() {
        return tickets;
    }
}
