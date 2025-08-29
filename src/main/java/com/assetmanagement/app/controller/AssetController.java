package com.assetmanagement.app.controller;

import com.assetmanagement.app.dto.UserRegistrationDto;
import com.assetmanagement.app.model.User;
import com.assetmanagement.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AssetController {

    @Autowired
    private UserService userService;

    @GetMapping("/health")
    public String health() {
        return "Asset Management Application is running!";
    }
    
    @PostMapping("/users/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegistrationDto registrationDto) {
        try {
            User user = userService.registerUser(
                registrationDto.getUsername(),
                registrationDto.getEmail(),
                registrationDto.getPassword()
            );
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User registered successfully");
            response.put("userId", user.getId());
            response.put("username", user.getUsername());
            response.put("userDirectory", user.getUserDirectory());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @GetMapping("/users/{username}")
    public ResponseEntity<?> getUserInfo(@PathVariable String username) {
        return userService.findByUsername(username)
            .map(user -> {
                Map<String, Object> response = new HashMap<>();
                response.put("id", user.getId());
                response.put("username", user.getUsername());
                response.put("email", user.getEmail());
                response.put("userDirectory", user.getUserDirectory());
                response.put("createdAt", user.getCreatedAt());
                response.put("lastLogin", user.getLastLogin());
                response.put("directorySize", userService.getUserDirectorySize(user));
                return ResponseEntity.ok(response);
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/users/{username}/directory-info")
    public ResponseEntity<?> getUserDirectoryInfo(@PathVariable String username) {
        return userService.findByUsername(username)
            .map(user -> {
                Map<String, Object> response = new HashMap<>();
                response.put("username", user.getUsername());
                response.put("userDirectory", user.getUserDirectory());
                response.put("directorySize", userService.getUserDirectorySize(user));
                return ResponseEntity.ok(response);
            })
            .orElse(ResponseEntity.notFound().build());
    }
}
