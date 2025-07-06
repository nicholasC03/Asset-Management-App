package com.nick.assetmanagementapp.ui;

import javafx.fxml.FXML;
import javafx.scene.control.TextArea;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public class MainController {

    private final RestTemplate restTemplate = new RestTemplate();

    @FXML
    private TextArea outputArea;

    @FXML
    private void loadAssets() {
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(
                    "http://localhost:8080/api/assets", String.class);
            outputArea.setText(response.getBody());
        } catch (Exception e) {
            outputArea.setText("Failed to load assets: " + e.getMessage());
        }
    }
}
