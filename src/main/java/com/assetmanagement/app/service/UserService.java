package com.assetmanagement.app.service;

import com.assetmanagement.app.model.User;
import com.assetmanagement.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private UserDirectoryService userDirectoryService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Transactional
    public User registerUser(String username, String email, String password) throws Exception {
        // Check if user already exists
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Username already exists");
        }
        
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists");
        }
        
        // Create user directory first
        String userDirectory = userDirectoryService.createUserDirectoryForNewUser(username);
        
        // Create user entity
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setUserDirectory(userDirectory);
        user.setCreatedAt(LocalDateTime.now());
        
        // Save user to get ID
        User savedUser = userRepository.save(user);
        
        // Update directory name with actual user ID
        String finalDirectory = userDirectoryService.createUserDirectory(savedUser);
        savedUser.setUserDirectory(finalDirectory);
        
        return userRepository.save(savedUser);
    }
    
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    @Transactional
    public void updateLastLogin(User user) {
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
    }
    
    @Transactional
    public boolean deleteUser(Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Delete user directory
            userDirectoryService.deleteUserDirectory(user);
            // Delete user from database
            userRepository.delete(user);
            return true;
        }
        return false;
    }
    
    public long getUserDirectorySize(User user) {
        return userDirectoryService.getUserDirectorySize(user);
    }
}
