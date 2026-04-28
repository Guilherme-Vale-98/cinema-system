package com.gui.cinemabackend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gui.cinemabackend.entities.Session;

import java.util.Date;

public class MovieSessionDTO {
    private Long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm")
    private Date startTime;

    public MovieSessionDTO(Session session) {
        this.id = session.getId();
        this.startTime = session.getStartTime();
    }

    public Long getId() {
        return id;
    }

    public Date getStartTime() {
        return startTime;
    }
}
