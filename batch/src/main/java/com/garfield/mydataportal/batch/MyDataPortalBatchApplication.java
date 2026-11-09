package com.garfield.mydataportal.batch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class MyDataPortalBatchApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyDataPortalBatchApplication.class, args);
    }
}
