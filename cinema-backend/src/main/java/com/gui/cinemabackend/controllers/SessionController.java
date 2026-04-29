package com.gui.cinemabackend.controllers;

import com.gui.cinemabackend.Utils.JwtUtil;
import com.gui.cinemabackend.entities.Movie;
import com.gui.cinemabackend.entities.Session;
import com.gui.cinemabackend.entities.Ticket;
import com.gui.cinemabackend.entities.User;
import com.gui.cinemabackend.model.Seat;
import com.gui.cinemabackend.model.SessionDTO;
import com.gui.cinemabackend.model.TicketDTO;
import com.gui.cinemabackend.repositories.MovieRepository;
import com.gui.cinemabackend.repositories.SessionRepository;
import com.gui.cinemabackend.repositories.TicketRepository;
import com.gui.cinemabackend.repositories.UserRepository;
import com.gui.cinemabackend.services.UserDetailsImpl;
import io.jsonwebtoken.Claims;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
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
    UserRepository userRepository;
    @Autowired
    SessionRepository sessionRepository;
    @Autowired
    TicketRepository ticketRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
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
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity createNewTicket(@PathVariable("sessionId") Long sessionId,
                                          @RequestBody List<TicketDTO> ticketsDTO,
                                          Authentication authentication){

        Optional<Session> sessionOptional = sessionRepository.findById(sessionId);
        if (sessionOptional.isEmpty()){
            String message = "Session id not found";
            return new ResponseEntity(message, HttpStatus.NOT_FOUND);
        }

        if (!(authentication.getPrincipal() instanceof UserDetailsImpl userDetails)) {
            return new ResponseEntity("User not authenticated", HttpStatus.UNAUTHORIZED);
        }

        Optional<User> userOptional = userRepository.findById(userDetails.getId());
        if (userOptional.isEmpty()){
            String message = "User id not found";
            return new ResponseEntity(message, HttpStatus.NOT_FOUND);
        }

        Date currentDate = new Date();
        Date sessionStartTime = sessionOptional.get().getStartTime();

        if(currentDate.after(sessionStartTime)){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Desculpe, sessão expirada.");
        }


        boolean ticketAlreadyInRepository = ticketsDTO.stream().anyMatch(
                ticket -> ticketRepository
                        .findBySessionAndSeat(sessionOptional.get(),
                                ticket.getSeat().getRow(),
                                ticket.getSeat().getColumn()).isPresent()
                );

        boolean notValidTicketSeats = ticketsDTO.stream().anyMatch(
                ticket -> !isSeatValid(ticket.getSeat().getRow(), ticket.getSeat().getColumn()));


        if(notValidTicketSeats){
            String message = "Invalid seats";
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        }


        if(ticketAlreadyInRepository){
            String message = "Seats already taken";
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        };

        List<Ticket> tickets = new ArrayList<>();

        for (TicketDTO ticketDTO : ticketsDTO) {
            Ticket ticket = new Ticket();

            ticket.setUser(userOptional.get());
            ticket.setSession(sessionOptional.get());
            ticket.setSeat(ticketDTO.getSeat());
            ticket.getSeat().setPrice();

            tickets.add(ticket);
        }


        ticketRepository.saveAll(tickets);
        sessionOptional.get().getTickets().addAll(tickets);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{sessionId}/tickets/{ticketId}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity getTicketById(@PathVariable("sessionId") Long sessionId,
                                        @PathVariable("ticketId") Long ticketId,
                                        Authentication authentication){
        Optional<Ticket> ticketOptional = ticketRepository.findById(ticketId);
        if (ticketOptional.isEmpty()){
            String message = "Session id not found";
            return new ResponseEntity(message, HttpStatus.NOT_FOUND);
        }
        Ticket ticket = ticketOptional.get();
        if (!ticket.getSession().getId().equals(sessionId)) {
            return new ResponseEntity("Ticket does not belong to session", HttpStatus.NOT_FOUND);
        }
        if (!ticketBelongsToAuthenticatedUserOrAdmin(ticket, authentication)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Forbidden");
        }
        return new ResponseEntity(toTicketDTO(ticket), HttpStatus.OK);
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
        if(Integer.parseInt(column) > 16 || Integer.parseInt(column) < 1){
            return false;
        }
        return row.matches("[A-J]");
    }
    @GetMapping("tickets/user")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity getUserTickets(
                                         @RequestHeader("Authorization") String authorizationHeader){
        String token = authorizationHeader.replace("Bearer ", "");

        if (!jwtUtil.validateJwtToken(token)) {
            return new ResponseEntity<>("Invalid token", HttpStatus.UNAUTHORIZED);
        }
        Long userId = jwtUtil.getUserIdFromJwtToken(token);

        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()){
            String message = "User id not found";
            return new ResponseEntity(message, HttpStatus.NOT_FOUND);
        }

        List<Ticket> tickets = ticketRepository.findByUser(userOptional.get());
        List<TicketDTO> ticketsDTO = tickets.stream()
                .map(ticket -> new TicketDTO( userOptional.get().getId(),
                        ticket.getSeat(),
                        ticket.getSession().getMovie().getTitle(),
                        ticket.getSession().getStartTime()
                        )).toList();
        return new ResponseEntity(ticketsDTO,HttpStatus.OK);
    }
    @GetMapping("/{sessionId}/tickets/user/{userId}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity getTicketsByUserAndSession(@PathVariable("sessionId") Long sessionId, @PathVariable("userId") Long userId){
        Authentication authentication = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (!isCurrentUserOrAdmin(authentication, userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Forbidden");
        }
        Optional<Session> sessionOptional = sessionRepository.findById(sessionId);

        if (sessionOptional.isEmpty()){
            String message = "Session id not found";
            return new ResponseEntity(message, HttpStatus.NOT_FOUND);
        }

        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()){
            String message = "User id not found";
            return new ResponseEntity(message, HttpStatus.NOT_FOUND);
        }

        List<Ticket> tickets = ticketRepository.findByUserAndSession(userOptional.get(), sessionOptional.get());
        List<TicketDTO> ticketsDTO = tickets.stream()
                .map(ticket -> new TicketDTO(
                        userOptional.get().getId(),
                        ticket.getSeat(),
                        ticket.getSession().getMovie().getTitle(),
                        ticket.getSession().getStartTime()
                        )).toList();
        return new ResponseEntity(ticketsDTO,HttpStatus.OK);
    }

    private TicketDTO toTicketDTO(Ticket ticket) {
        return new TicketDTO(
                ticket.getId(),
                ticket.getUser() == null ? null : ticket.getUser().getId(),
                ticket.getSeat(),
                ticket.getSession().getMovie().getTitle(),
                ticket.getSession().getStartTime()
        );
    }

    private boolean ticketBelongsToAuthenticatedUserOrAdmin(Ticket ticket, Authentication authentication) {
        if (isAdmin(authentication)) {
            return true;
        }
        if (!(authentication.getPrincipal() instanceof UserDetailsImpl userDetails)) {
            return false;
        }
        return ticket.getUser() != null && ticket.getUser().getId().equals(userDetails.getId());
    }

    private boolean isCurrentUserOrAdmin(Authentication authentication, Long userId) {
        if (isAdmin(authentication)) {
            return true;
        }
        if (!(authentication.getPrincipal() instanceof UserDetailsImpl userDetails)) {
            return false;
        }
        return userDetails.getId().equals(userId);
    }

    private boolean isAdmin(Authentication authentication) {
        return authentication != null && authentication.getAuthorities().stream()
                .anyMatch(authority -> "ROLE_ADMIN".equals(authority.getAuthority()));
    }
}
