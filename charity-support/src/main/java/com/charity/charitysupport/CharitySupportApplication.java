package com.charity.charitysupport;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class CharitySupportApplication {

	public static void main(String[] args) {
		SpringApplication.run(CharitySupportApplication.class, args);
	}

}
