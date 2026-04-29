package com.gui.cinemabackend.configs;

import com.gui.cinemabackend.Utils.JwtUtil;
import com.gui.cinemabackend.controllers.AuthController;
import com.gui.cinemabackend.controllers.MovieController;
import com.gui.cinemabackend.controllers.SessionController;
import com.gui.cinemabackend.jwt.AuthEntryPointJwt;
import com.gui.cinemabackend.jwt.AuthTokenFilter;
import com.gui.cinemabackend.repositories.DirectorRepository;
import com.gui.cinemabackend.repositories.MovieRepository;
import com.gui.cinemabackend.repositories.RoleRepository;
import com.gui.cinemabackend.repositories.SessionRepository;
import com.gui.cinemabackend.repositories.TicketRepository;
import com.gui.cinemabackend.repositories.UserRepository;
import com.gui.cinemabackend.services.UserDetailsServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.head;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.mockito.Mockito.when;

@WebMvcTest(controllers = {AuthController.class, SessionController.class, MovieController.class})
@Import({WebSecurityConfig.class, AuthEntryPointJwt.class, AuthTokenFilter.class})
class WebSecurityConfigTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthenticationManager authenticationManager;
    @MockBean
    private UserRepository userRepository;
    @MockBean
    private RoleRepository roleRepository;
    @MockBean
    private PasswordEncoder passwordEncoder;
    @MockBean
    private JwtUtil jwtUtil;
    @MockBean
    private UserDetailsServiceImpl userDetailsService;
    @MockBean
    private MovieRepository movieRepository;
    @MockBean
    private DirectorRepository directorRepository;
    @MockBean
    private SessionRepository sessionRepository;
    @MockBean
    private TicketRepository ticketRepository;

    @Test
    void unauthenticatedUserUpdateIsRejected() throws Exception {
        mockMvc.perform(post("/auth/updateUser")
                        .contentType("application/json")
                        .content("{\"id\":2,\"username\":\"changed\",\"email\":\"changed@example.com\",\"password\":\"secret\"}"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void unauthenticatedTicketLookupIsRejected() throws Exception {
        mockMvc.perform(get("/api/sessions/1/tickets/1"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void unauthenticatedMovieCreateIsRejected() throws Exception {
        mockMvc.perform(post("/api/movies")
                        .contentType("application/json")
                        .content("{}"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void unauthenticatedHeadToPublicFeaturedMoviesIsAllowedForUptimeMonitors() throws Exception {
        when(movieRepository.findByIsFeatured(true)).thenReturn(List.of());

        mockMvc.perform(head("/api/movies/featured"))
                .andExpect(status().isOk());
    }
}
