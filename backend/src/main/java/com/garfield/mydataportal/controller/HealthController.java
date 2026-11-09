package com.garfield.mydataportal.controller;

import com.garfield.mydataportal.mapper.SystemHealthMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
@RequiredArgsConstructor
public class HealthController {

    private final SystemHealthMapper systemHealthMapper;

    @GetMapping
    public Map<String, Object> checkHealth() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", "UP");
        response.put("service", "my-data-portal-backend");
        response.put("javaVersion", System.getProperty("java.version"));
        response.put("timestamp", OffsetDateTime.now().toString());

        try {
            String dbVersion = systemHealthMapper.selectDatabaseVersion();
            response.put("databaseStatus", "CONNECTED");
            response.put("databaseInfo", dbVersion);
        } catch (Exception e) {
            response.put("databaseStatus", "DISCONNECTED");
            response.put("databaseError", e.getMessage());
        }

        return response;
    }
}
