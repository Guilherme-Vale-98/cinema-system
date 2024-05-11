package com.gui.cinemabackend.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.util.Objects;

@Embeddable
public class Seat {
    private Integer column;
    private String row;

    @Enumerated(EnumType.STRING)
    private SeatEnum seatType;
    private Integer price;

    public Integer getColumn() {
        return column;
    }

    public void setColumn(Integer column) {
        this.column = column;
    }

    public String getRow() {
        return row;
    }

    public void setRow(String row) {
        this.row = row;
    }

    public SeatEnum getSeatType() {
        return seatType;
    }

    public void setSeatType(SeatEnum seatType) {
        this.seatType = seatType;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Seat() {
    }

    public Seat(Integer column, String row, SeatEnum seatType, Integer price) {
        this.column = column;
        this.row = row;
        this.seatType = seatType;
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Seat seat = (Seat) o;
        return Objects.equals(column, seat.column) && Objects.equals(row, seat.row) && seatType == seat.seatType && Objects.equals(price, seat.price);
    }

    @Override
    public int hashCode() {
        return Objects.hash(column, row, seatType, price);
    }
}
