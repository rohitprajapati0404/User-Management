package com.usermanagement.controller;

import com.usermanagement.dto.LoginRequest;
import com.usermanagement.dto.LoginResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {

        if ("admin".equals(request.getUsername())
                && "admin123".equals(request.getPassword())) {

            String token = UUID.randomUUID().toString();

            LoginResponse response = new LoginResponse(
                    token,
                    "Login Successful"
            );

            return ResponseEntity.ok(response);
        }

        LoginResponse response = new LoginResponse(
                null,
                "Invalid Username or Password"
        );

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(response);
    }

}
