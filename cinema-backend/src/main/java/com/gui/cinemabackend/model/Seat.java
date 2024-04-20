package com.gui.cinemabackend.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Embeddable
public class Seat {
    private Integer column;
    private String row;

    @Enumerated(EnumType.STRING)
    private SeatEnum seatType;
    private Integer price;

}
