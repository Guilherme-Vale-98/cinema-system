package com.gui.cinemabackend.repositories;

import com.gui.cinemabackend.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
