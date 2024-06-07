package com.gui.cinemabackend.controllers;

import com.gui.cinemabackend.entities.Movie;
import com.gui.cinemabackend.entities.Session;
import com.gui.cinemabackend.entities.Ticket;
import com.gui.cinemabackend.model.SessionDTO;
import com.gui.cinemabackend.repositories.MovieRepository;
import com.gui.cinemabackend.repositories.SessionRepository;
import com.gui.cinemabackend.repositories.TicketRepository;
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
        Movie movie = movieRepository.findByTitle(sessionDTO.getMovieTitle()).get();
        Session session = new Session(null, movie, new ArrayList<>(), sessionDTO.getStartTime());
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
        return new ResponseEntity(sessionDTO.getStartTime(), HttpStatus.OK);
    }

    @GetMapping("/date/{day}")
    public ResponseEntity<List<Session>> getSessionsByDate(
            @PathVariable("day") @DateTimeFormat(pattern = "dd-MM-yyyy") Date day){

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(day);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        Date startOfDay = calendar.getTime();

        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);
        Date endOfDay = calendar.getTime();


        List<Session> sessions = sessionRepository.findSessionsByDate(startOfDay, endOfDay);
        if (sessions.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhuma sessao neste dia.");
        }
        return new ResponseEntity<>(sessions, HttpStatus.OK);
    }



}
