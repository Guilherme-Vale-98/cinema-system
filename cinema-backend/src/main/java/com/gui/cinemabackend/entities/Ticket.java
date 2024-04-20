package com.gui.cinemabackend.entities;

import com.gui.cinemabackend.model.Seat;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "session_id", nullable = false)
    private Session session;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride( name = "column", column = @Column(name = "seat_column")),
            @AttributeOverride( name = "row", column = @Column(name = "seat_row")),
            @AttributeOverride( name = "price", column = @Column(name = "seat_price")),
            @AttributeOverride( name = "type", column = @Column(name = "seat_type")),
    })
    private Seat seat;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }



    public Seat getSeat() {
        return seat;
    }

    public void setSeat(Seat seat) {
        this.seat = seat;
    }

    public Ticket() {
    }

    public Ticket(Long id, Session session, Seat seat) {
        this.id = id;
        this.session = session;
        this.seat = seat;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Ticket ticket = (Ticket) o;
        return Objects.equals(id, ticket.id) && Objects.equals(session, ticket.session) && Objects.equals(seat, ticket.seat);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, session, seat);
    }
}
