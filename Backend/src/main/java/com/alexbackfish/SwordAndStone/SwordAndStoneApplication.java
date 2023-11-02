package com.alexbackfish.SwordAndStone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(scanBasePackages={
		"com.alexbackfish.SwordAndStone.Entities",
		"com.alexbackfish.SwordAndStone.Repositories",
		"com.alexbackfish.SwordAndStone.DTOs",
		"com.alexbackfish.SwordAndStone.Controllers",
		"com.alexbackfish.SwordAndStone.Configurations"})
public class SwordAndStoneApplication {

	public static void main(String[] args) {
		SpringApplication.run(SwordAndStoneApplication.class, args);
	}

}
