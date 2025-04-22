package com.example.InstruementMS;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class InstruementMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(InstruementMsApplication.class, args);
	}

}
