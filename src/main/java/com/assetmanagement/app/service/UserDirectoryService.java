package com.assetmanagement.app.service;

import com.assetmanagement.app.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class UserDirectoryService {
    
    @Value("${app.user.directories.base-path:user-data}")
    private String baseDirectory;
    
    public String createUserDirectory(User user) throws IOException {
        // Create base directory if it doesn't exist
        Path basePath = Paths.get(baseDirectory);
        if (!Files.exists(basePath)) {
            Files.createDirectories(basePath);
        }
        
        // Create user-specific directory
        String userDirName = sanitizeUsername(user.getUsername()) + "_" + user.getId();
        Path userPath = basePath.resolve(userDirName);
        
        if (!Files.exists(userPath)) {
            Files.createDirectories(userPath);
            
            // Create subdirectories for different asset types
            createSubdirectories(userPath);
            
            // Create a README file for the user
            createUserReadme(userPath, user);
        }
        
        return userPath.toString();
    }
    
    public String createUserDirectoryForNewUser(String username) throws IOException {
        // Create base directory if it doesn't exist
        Path basePath = Paths.get(baseDirectory);
        if (!Files.exists(basePath)) {
            Files.createDirectories(basePath);
        }
        
        // Create user-specific directory with timestamp for new users
        String timestamp = String.valueOf(System.currentTimeMillis());
        String userDirName = sanitizeUsername(username) + "_" + timestamp;
        Path userPath = basePath.resolve(userDirName);
        
        if (!Files.exists(userPath)) {
            Files.createDirectories(userPath);
            
            // Create subdirectories for different asset types
            createSubdirectories(userPath);
            
            // Create a README file for the user
            createUserReadmeForNewUser(userPath, username, timestamp);
        }
        
        return userPath.toString();
    }
    
    private void createSubdirectories(Path userPath) throws IOException {
        // Create common asset directories
        String[] subdirs = {
            "documents",
            "images", 
            "videos",
            "audio",
            "archives",
            "temp"
        };
        
        for (String subdir : subdirs) {
            Path subdirPath = userPath.resolve(subdir);
            if (!Files.exists(subdirPath)) {
                Files.createDirectories(subdirPath);
            }
        }
    }
    
    private void createUserReadme(Path userPath, User user) throws IOException {
        String readmeContent = String.format("""
            # User Directory for %s
            
            Created: %s
            User ID: %d
            
            ## Directory Structure
            - documents/     - Document files (PDF, DOC, etc.)
            - images/        - Image files (JPG, PNG, etc.)
            - videos/        - Video files (MP4, AVI, etc.)
            - audio/         - Audio files (MP3, WAV, etc.)
            - archives/      - Compressed files (ZIP, RAR, etc.)
            - temp/          - Temporary files
            
            ## Usage
            You can organize your assets by placing them in the appropriate subdirectories.
            The application will automatically track and manage your assets based on their location.
            
            ## Security
            This directory is private to your account. Only you can access your assets.
            """, 
            user.getUsername(),
            LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),
            user.getId()
        );
        
        Path readmePath = userPath.resolve("README.md");
        Files.write(readmePath, readmeContent.getBytes());
    }
    
    private void createUserReadmeForNewUser(Path userPath, String username, String timestamp) throws IOException {
        String readmeContent = String.format("""
            # User Directory for %s
            
            Created: %s
            Timestamp: %s
            
            ## Directory Structure
            - documents/     - Document files (PDF, DOC, etc.)
            - images/        - Image files (JPG, PNG, etc.)
            - videos/        - Video files (MP4, AVI, etc.)
            - audio/         - Audio files (MP3, WAV, etc.)
            - archives/      - Compressed files (ZIP, RAR, etc.)
            - temp/          - Temporary files
            
            ## Usage
            You can organize your assets by placing them in the appropriate subdirectories.
            The application will automatically track and manage your assets based on their location.
            
            ## Security
            This directory is private to your account. Only you can access your assets.
            """, 
            username,
            LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),
            timestamp
        );
        
        Path readmePath = userPath.resolve("README.md");
        Files.write(readmePath, readmeContent.getBytes());
    }
    
    private String sanitizeUsername(String username) {
        // Remove special characters and replace spaces with underscores
        return username.replaceAll("[^a-zA-Z0-9]", "_").toLowerCase();
    }
    
    public boolean deleteUserDirectory(User user) {
        try {
            Path userPath = Paths.get(user.getUserDirectory());
            if (Files.exists(userPath)) {
                deleteDirectoryRecursively(userPath);
                return true;
            }
            return false;
        } catch (IOException e) {
            return false;
        }
    }
    
    private void deleteDirectoryRecursively(Path path) throws IOException {
        if (Files.isDirectory(path)) {
            Files.list(path).forEach(child -> {
                try {
                    deleteDirectoryRecursively(child);
                } catch (IOException e) {
                    // Log error but continue
                }
            });
        }
        Files.delete(path);
    }
    
    public long getUserDirectorySize(User user) {
        try {
            Path userPath = Paths.get(user.getUserDirectory());
            if (Files.exists(userPath)) {
                return Files.walk(userPath)
                    .filter(Files::isRegularFile)
                    .mapToLong(path -> {
                        try {
                            return Files.size(path);
                        } catch (IOException e) {
                            return 0L;
                        }
                    })
                    .sum();
            }
        } catch (IOException e) {
            // Log error
        }
        return 0L;
    }
}
