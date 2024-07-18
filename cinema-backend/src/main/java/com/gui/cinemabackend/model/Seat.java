package com.gui.cinemabackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.Objects;

@Embeddable
public class Seat {
    private String column;
    private String row;

    @Enumerated(EnumType.STRING)
    @NotNull
    private SeatEnum seatType;

    private BigDecimal price;

    public String getColumn() {
        return column;
    }

    public void setColumn(String column) {
        this.column = column;
    }

    public String getRow() {
        return row;
    }

    public void setRow(String row) {
        this.row = row.toUpperCase();
    }


    public SeatEnum getSeatType() {
        return seatType;
    }

    public void setSeatType(SeatEnum seatType) {
        this.seatType = seatType;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice() {
        if(this.seatType == SeatEnum.MEIA){
            this.price = new BigDecimal(15);
        }
        if(this.seatType == SeatEnum.INTEIRA){
            this.price = new BigDecimal(30);
        }
    }

    public Seat() {
    }

    public Seat(String column, String row, SeatEnum seatType) {
        this.column = column;
        this.row = row;
        this.seatType = seatType;
        this.setPrice();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Seat seat = (Seat) o;
        return Objects.equals(column, seat.column) && Objects.equals(row, seat.row);
    }

    @Override
    public int hashCode() {
        return Objects.hash(column, row, seatType, price);
    }
}
