package com.usermanagement;

import com.usermanagement.entity.User;
import com.usermanagement.enums.Role;
import com.usermanagement.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;

@SpringBootApplication
public class UserManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserManagementApplication.class, args);
    }

    @Bean
    CommandLineRunner testRepository(UserRepository repository) {

        return args -> {

            User user = new User();

            user.setFirstName("admin");
            user.setLastName("admin");
            user.setEmail("admin@mail.com");
            user.setRole(Role.ADMIN);
            user.setActive(true);
            user.setCreatedAt(LocalDateTime.now());

            repository.save(user);

            System.out.println("User Saved");

            System.out.println(repository.findAll());

            System.out.println(repository.existsByEmail("admin@mail.com"));

            System.out.println(repository.findByEmail("admin@mail.com"));

        };

    }

}
