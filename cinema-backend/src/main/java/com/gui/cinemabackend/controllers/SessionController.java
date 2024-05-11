package com.gui.cinemabackend.controllers;

import com.gui.cinemabackend.entities.Movie;
import com.gui.cinemabackend.entities.Session;
import com.gui.cinemabackend.entities.Ticket;
import com.gui.cinemabackend.model.SessionDTO;
import com.gui.cinemabackend.repositories.MovieRepository;
import com.gui.cinemabackend.repositories.SessionRepository;
import com.gui.cinemabackend.repositories.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/sessions")
public class SessionController {
    @Autowired
    MovieRepository movieRepository;
    @Autowired
    SessionRepository sessionRepository;
    @Autowired
    TicketRepository ticketRepository;


    @PostMapping
    public ResponseEntity createNewSession(@RequestBody SessionDTO sessionDTO){
        Movie movie = movieRepository.findByTitle(sessionDTO.getMovieTitle()).get();
        Session session = new Session(null, movie,new ArrayList<>(), sessionDTO.getStartTime());
        sessionRepository.save(session);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/{sessionId}/tickets")
    public ResponseEntity createNewTicket(@PathVariable("sessionId") Long sessionId,
                                          @RequestBody List<Ticket> tickets){
        Optional<Session> sessionOptional = sessionRepository.findById(sessionId);
        if (sessionOptional.isEmpty()){
            String message = "Session id not found";
            return new ResponseEntity(message, HttpStatus.NOT_FOUND);
        }
        tickets.forEach(ticket -> ticket.setSession(sessionOptional.get()));
        ticketRepository.saveAll(tickets);
        sessionOptional.get().getTickets().addAll(tickets);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{sessionId}/tickets/{ticketId}")
    public ResponseEntity getTicketById(@PathVariable("ticketId") Long ticketId){
        Optional<Ticket> ticketOptional = ticketRepository.findById(ticketId);
        if (ticketOptional.isEmpty()){
            String message = "Session id not found";
            return new ResponseEntity(message, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(ticketOptional.get(), HttpStatus.OK);
    }


    @GetMapping("/{sessionId}")
    public ResponseEntity getSessionById(@PathVariable("sessionId") Long sessionId){
        Optional<Session> sessionOptional = sessionRepository.findById(sessionId);
        if (sessionOptional.isEmpty()){
            String message = "Session id not found";
            return new ResponseEntity(message, HttpStatus.NOT_FOUND);
        }
        SessionDTO sessionDTO = new SessionDTO(sessionOptional.get());
        return new ResponseEntity(sessionDTO, HttpStatus.OK);
    }


}
