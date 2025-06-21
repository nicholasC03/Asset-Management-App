package com.nick.assetmanagementapp;

import com.nick.assetmanagementapp.model.Asset;
import com.nick.assetmanagementapp.service.AssetService;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.sql.Date;

@SpringBootApplication
@AllArgsConstructor
public class AssetManagementAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(AssetManagementAppApplication.class, args);
    }

    @Bean
    public CommandLineRunner run(AssetService assetService) {
        return args -> {
            assetService.saveAsset(new Asset(0,
                    "Dell Laptop",
                    "Electronics",
                    1200.00,
                    true,
                    Date.valueOf("2024-06-19").toLocalDate()
            ));
        };
    }
}
