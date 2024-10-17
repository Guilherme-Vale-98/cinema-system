package com.gui.cinemabackend.controllers;


import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.gui.cinemabackend.Utils.JwtUtil;
import com.gui.cinemabackend.entities.ERole;
import com.gui.cinemabackend.entities.Role;
import com.gui.cinemabackend.entities.User;
import com.gui.cinemabackend.payloads.requests.LoginRequest;
import com.gui.cinemabackend.payloads.requests.SignupRequest;
import com.gui.cinemabackend.payloads.requests.UpdateRequest;
import com.gui.cinemabackend.payloads.responses.JwtResponse;
import com.gui.cinemabackend.payloads.responses.MessageResponse;
import com.gui.cinemabackend.repositories.RoleRepository;
import com.gui.cinemabackend.repositories.UserRepository;
import com.gui.cinemabackend.services.UserDetailsImpl;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;


import jakarta.validation.Valid;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;


    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtil.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();


        List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
                .collect(Collectors.toList());
        return ResponseEntity
                .ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role.toUpperCase()) {
                    case "ADMIN":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }


        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/updateUser")
    public ResponseEntity<?> updateUser(@Valid @RequestBody UpdateRequest updateRequest) {
           User user = userRepository.findById(updateRequest.getId())
                   .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"nenhum usuario com este id"));
           user.setUsername(updateRequest.getUsername());
           user.setEmail(updateRequest.getEmail());
           if(updateRequest.getPassword() != null && !updateRequest.getPassword().isEmpty()){
                user.setPassword(encoder.encode(updateRequest.getPassword()));
                userRepository.save(user);
                return ResponseEntity.ok(new MessageResponse("User updated successfully!"));
           }

           return ResponseEntity.badRequest().body("Bad request");
    }

    @GetMapping("/userRole")
    public ResponseEntity<?> checkUserRole(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        if(authorization == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Authorization header missing");
        }


        if((StringUtils.hasText(authorization) && authorization.startsWith("Bearer "))){
            String accessToken = authorization.substring(7);
            if(jwtUtil.validateJwtToken(accessToken)){
                Optional<User> user = userRepository.findByUsername(jwtUtil.getUserNameFromJwtToken(accessToken));
                if (user.isPresent()){
                    List<String> roles = user.get().getRoles().stream().map(item -> item.getName().name())
                            .collect(Collectors.toList());
                    return ResponseEntity.ok().body(new JwtResponse(accessToken, user.get().getId(), user.get().getUsername(), user.get().getEmail(), roles));
                }
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
    }

}