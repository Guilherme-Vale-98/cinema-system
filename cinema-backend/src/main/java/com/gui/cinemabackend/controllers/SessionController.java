package com.gui.cinemabackend.controllers;

import com.gui.cinemabackend.entities.Movie;
import com.gui.cinemabackend.entities.Session;
import com.gui.cinemabackend.entities.Ticket;
import com.gui.cinemabackend.model.Seat;
import com.gui.cinemabackend.model.SessionDTO;
import com.gui.cinemabackend.repositories.MovieRepository;
import com.gui.cinemabackend.repositories.SessionRepository;
import com.gui.cinemabackend.repositories.TicketRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

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
        Optional<Movie> movie = movieRepository.findByTitle(sessionDTO.getMovieTitle());

        if(movie.isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No movie with such title.");
        }
        Session session = new Session(null, movie.get(), new ArrayList<>(), sessionDTO.getStartTime());
        System.out.println(sessionDTO.getStartTime());

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
        Date currentDate = new Date();
        Date sessionStartTime = sessionOptional.get().getStartTime();

        if(currentDate.after(sessionStartTime)){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Desculpe, sessão expirada.");
        }


        boolean ticketAlreadyInRepository = tickets.stream().anyMatch(
                ticket -> ticketRepository
                        .findBySessionAndSeat(sessionOptional.get(),
                                ticket.getSeat().getRow(), ticket.getSeat().getColumn()).isPresent()
                );

        boolean notValidTicketSeats = tickets.stream().anyMatch(
                ticket -> !isSeatValid(ticket.getSeat().getRow(), ticket.getSeat().getColumn()));


        if(notValidTicketSeats){
            String message = "Invalid seats";
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        }


        if(ticketAlreadyInRepository){
            String message = "Seats already taken";
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        };

        tickets.forEach(ticket -> ticket.setSession(sessionOptional.get()));
        tickets.forEach(ticket -> ticket.getSeat().setPrice());

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
        return new ResponseEntity(sessionDTO.getStartTime(), HttpStatus.OK);
    }


    private boolean isSeatValid(String row, String column){
        if(Integer.parseInt(column) > 16 && Integer.parseInt(column) < 1){
            return false;
        }
        return row.matches("[A-J]");
    }
}
