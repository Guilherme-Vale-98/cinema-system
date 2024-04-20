package com.gui.cinemabackend.controllers;

import jakarta.annotation.security.RolesAllowed;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class TestController {


    @GetMapping("/all")
    public ResponseEntity testAll(){
        Map<String, String> body = new HashMap<>();
        body.put("message", "TESTING ALL");
        return new ResponseEntity(body, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/user")
    public ResponseEntity testuser(){
        Map<String, String> body = new HashMap<>();
        body.put("message", "TESTING USER");
        return new ResponseEntity(body, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin")
    public ResponseEntity testadmin(){
        Map<String, String> body = new HashMap<>();
        body.put("message", "TESTING ADMIN");
        return new ResponseEntity(body, HttpStatus.OK);
    }
}
