package com.gui.cinemabackend.repositories;

import com.gui.cinemabackend.entities.Session;
import com.gui.cinemabackend.entities.Ticket;
import com.gui.cinemabackend.entities.User;
import com.gui.cinemabackend.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    @Query("SELECT t from Ticket t WHERE t.session = :session AND t.seat.row = :row AND t.seat.column = :column")
    Optional<Ticket> findBySessionAndSeat(@Param("session") Session session, @Param("row") String row, @Param("column") String column);

    List<Ticket> findByUserAndSession(User user, Session session);
    List<Ticket> findByUser(User user);
    boolean existsTicketBySessionAndSeat(Session session, Seat seat);
}
