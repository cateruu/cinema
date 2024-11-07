package com.pawelkrml.movies;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class MoviesApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();

		System.setProperty("DB_URL", dotenv.get("DB_URL"));
		System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
		System.setProperty("DB_PASSOWRD", dotenv.get("DB_PASSOWRD"));
		System.setProperty("SPRING_PROFILE", dotenv.get("SPRING_PROFILE"));

		SpringApplication.run(MoviesApplication.class, args);
	}

}
