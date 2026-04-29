package com.gui.cinemabackend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gui.cinemabackend.Utils.JwtUtil;
import com.gui.cinemabackend.entities.ERole;
import com.gui.cinemabackend.entities.Movie;
import com.gui.cinemabackend.entities.Role;
import com.gui.cinemabackend.entities.Session;
import com.gui.cinemabackend.entities.Ticket;
import com.gui.cinemabackend.entities.User;
import com.gui.cinemabackend.model.Seat;
import com.gui.cinemabackend.repositories.MovieRepository;
import com.gui.cinemabackend.repositories.SessionRepository;
import com.gui.cinemabackend.repositories.TicketRepository;
import com.gui.cinemabackend.repositories.UserRepository;
import com.gui.cinemabackend.services.UserDetailsImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class SessionControllerSecurityTest {

    private SessionController controller;
    private TicketRepository ticketRepository;
    private SessionRepository sessionRepository;
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        controller = new SessionController();
        ticketRepository = mock(TicketRepository.class);
        sessionRepository = mock(SessionRepository.class);
        userRepository = mock(UserRepository.class);

        ReflectionTestUtils.setField(controller, "movieRepository", mock(MovieRepository.class));
        ReflectionTestUtils.setField(controller, "sessionRepository", sessionRepository);
        ReflectionTestUtils.setField(controller, "ticketRepository", ticketRepository);
        ReflectionTestUtils.setField(controller, "userRepository", userRepository);
        ReflectionTestUtils.setField(controller, "jwtUtil", mock(JwtUtil.class));
    }

    @Test
    void ticketSerializationDoesNotExposePassword() throws Exception {
        Ticket ticket = ticket(10L, user(1L, "owner", "owner@example.com", "encoded-password"), session(4L));

        String json = new ObjectMapper().writeValueAsString(ticket);

        assertThat(json).doesNotContain("password");
        assertThat(json).doesNotContain("encoded-password");
    }

    @Test
    void userCannotReadAnotherUsersTicket() {
        User owner = user(1L, "owner", "owner@example.com", "encoded");
        Ticket ticket = ticket(10L, owner, session(4L));
        when(ticketRepository.findById(10L)).thenReturn(Optional.of(ticket));

        Authentication otherUser = authentication(2L, "other", "other@example.com", ERole.ROLE_USER);

        assertThatThrownBy(() -> controller.getTicketById(4L, 10L, otherUser))
                .isInstanceOf(ResponseStatusException.class)
                .extracting("statusCode")
                .isEqualTo(HttpStatus.FORBIDDEN);
    }

    @Test
    void adminCanReadAnyUsersTicketAsSanitizedDto() {
        User owner = user(1L, "owner", "owner@example.com", "encoded");
        Ticket ticket = ticket(10L, owner, session(4L));
        when(ticketRepository.findById(10L)).thenReturn(Optional.of(ticket));

        Authentication admin = authentication(99L, "admin", "admin@example.com", ERole.ROLE_ADMIN);

        Object body = controller.getTicketById(4L, 10L, admin).getBody();

        assertThat(body).hasFieldOrPropertyWithValue("ticketId", 10L);
        assertThat(body).hasFieldOrPropertyWithValue("userId", 1L);
        assertThat(body).doesNotHaveToString("encoded");
    }

    private static Authentication authentication(Long id, String username, String email, ERole roleName) {
        UserDetailsImpl principal = new UserDetailsImpl(id, username, email, "encoded",
                List.of(new SimpleGrantedAuthority(roleName.name())));
        return new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());
    }

    private static User user(Long id, String username, String email, String password) {
        User user = new User(username, email, password);
        user.setId(id);
        user.setRoles(Set.of(new Role(ERole.ROLE_USER)));
        return user;
    }

    private static Session session(Long id) {
        Movie movie = new Movie();
        movie.setTitle("Inception");
        Session session = new Session(id, movie, List.of(), new Date());
        return session;
    }

    private static Ticket ticket(Long id, User user, Session session) {
        Seat seat = new Seat();
        seat.setRow("A");
        seat.setColumn("1");
        Ticket ticket = new Ticket(id, session, seat, user);
        return ticket;
    }
}
