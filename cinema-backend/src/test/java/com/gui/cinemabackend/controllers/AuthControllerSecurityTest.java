package com.gui.cinemabackend.controllers;

import com.gui.cinemabackend.Utils.JwtUtil;
import com.gui.cinemabackend.entities.ERole;
import com.gui.cinemabackend.entities.Role;
import com.gui.cinemabackend.entities.User;
import com.gui.cinemabackend.payloads.requests.SignupRequest;
import com.gui.cinemabackend.payloads.requests.UpdateRequest;
import com.gui.cinemabackend.payloads.responses.JwtResponse;
import com.gui.cinemabackend.payloads.responses.MessageResponse;
import com.gui.cinemabackend.repositories.RoleRepository;
import com.gui.cinemabackend.repositories.UserRepository;
import com.gui.cinemabackend.services.UserDetailsImpl;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class AuthControllerSecurityTest {

    @Test
    void signupIgnoresRequestedAdminRole() {
        AuthController controller = new AuthController();
        AuthenticationManager authenticationManager = mock(AuthenticationManager.class);
        UserRepository userRepository = mock(UserRepository.class);
        RoleRepository roleRepository = mock(RoleRepository.class);
        PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
        JwtUtil jwtUtil = mock(JwtUtil.class);

        ReflectionTestUtils.setField(controller, "authenticationManager", authenticationManager);
        ReflectionTestUtils.setField(controller, "userRepository", userRepository);
        ReflectionTestUtils.setField(controller, "roleRepository", roleRepository);
        ReflectionTestUtils.setField(controller, "encoder", passwordEncoder);
        ReflectionTestUtils.setField(controller, "jwtUtil", jwtUtil);

        SignupRequest request = new SignupRequest();
        request.setUsername("newuser");
        request.setEmail("new@example.com");
        request.setPassword("secret");
        request.setRole(Set.of("ADMIN"));

        Role userRole = new Role(ERole.ROLE_USER);
        when(userRepository.existsByUsername("newuser")).thenReturn(false);
        when(userRepository.existsByEmail("new@example.com")).thenReturn(false);
        when(roleRepository.findByName(ERole.ROLE_USER)).thenReturn(Optional.of(userRole));
        when(passwordEncoder.encode("secret")).thenReturn("encoded");

        UserDetailsImpl principal = new UserDetailsImpl(7L, "newuser", "new@example.com", "encoded",
                List.of(new SimpleGrantedAuthority(ERole.ROLE_USER.name())));
        Authentication authentication = new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());
        when(authenticationManager.authenticate(any())).thenReturn(authentication);
        when(jwtUtil.generateJwtToken(authentication)).thenReturn("jwt");

        JwtResponse response = (JwtResponse) controller.registerUser(request).getBody();

        assertThat(response).isNotNull();
        assertThat(response.getRoles()).containsExactly("ROLE_USER");
        verify(roleRepository).findByName(ERole.ROLE_USER);
    }

    @Test
    void updateUserIgnoresBodyIdAndUpdatesAuthenticatedUser() {
        AuthController controller = new AuthController();
        UserRepository userRepository = mock(UserRepository.class);
        PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);

        ReflectionTestUtils.setField(controller, "userRepository", userRepository);
        ReflectionTestUtils.setField(controller, "encoder", passwordEncoder);

        UpdateRequest request = new UpdateRequest();
        request.setId(999L);
        request.setUsername("changed");
        request.setEmail("changed@example.com");
        request.setPassword("new-secret");

        User authenticatedUser = new User("old", "old@example.com", "old-password");
        authenticatedUser.setId(7L);
        when(userRepository.findById(7L)).thenReturn(Optional.of(authenticatedUser));
        when(passwordEncoder.encode("new-secret")).thenReturn("encoded-new-secret");

        Authentication authentication = authentication(7L, "old", "old@example.com", ERole.ROLE_USER);

        MessageResponse response = (MessageResponse) controller.updateUser(request, authentication).getBody();

        assertThat(response).isNotNull();
        assertThat(authenticatedUser.getUsername()).isEqualTo("changed");
        assertThat(authenticatedUser.getEmail()).isEqualTo("changed@example.com");
        assertThat(authenticatedUser.getPassword()).isEqualTo("encoded-new-secret");
        verify(userRepository).findById(7L);
    }

    private static Authentication authentication(Long id, String username, String email, ERole roleName) {
        UserDetailsImpl principal = new UserDetailsImpl(id, username, email, "encoded",
                List.of(new SimpleGrantedAuthority(roleName.name())));
        return new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());
    }
}
