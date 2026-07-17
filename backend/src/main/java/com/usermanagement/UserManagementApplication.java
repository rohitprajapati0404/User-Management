package com.usermanagement;

import com.usermanagement.entity.User;
import com.usermanagement.enums.Role;
import com.usermanagement.repository.UserRepository;
import com.usermanagement.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;

import java.time.LocalDateTime;

@SpringBootApplication
public class UserManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserManagementApplication.class, args);
    }

    @Bean
    @Order(1)
    CommandLineRunner seedUsers(UserRepository repository) {

        return args -> {

            // Prevent duplicate inserts if data already exists
            if (repository.count() > 0) {
                return;
            }

            for (int i = 1; i <= 10; i++) {

                User user = new User();

                user.setFirstName("User");
                user.setLastName(String.valueOf(i));
                user.setEmail("user" + i + "@example.com");
                user.setRole(i == 1 ? Role.ADMIN : Role.USER);
                user.setActive(true);
                user.setCreatedAt(LocalDateTime.now());

                repository.save(user);
            }

            System.out.println("10 sample users inserted successfully.");

        };

    }

    @Bean
    @Order(2)
    CommandLineRunner test(UserService service) {

        return args -> {

            System.out.println("All Users");

            service.getAllUsers()
                    .forEach(System.out::println);

            System.out.println("----------------");

            System.out.println(service.getUserById(1L));

        };

    }

}
