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

import java.io.IOException;
import java.net.ServerSocket;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;

@SpringBootApplication
public class UserManagementApplication {

    public static void main(String[] args) {
        configureServerPort();
        SpringApplication.run(UserManagementApplication.class, args);
    }

    private static void configureServerPort() {
        int selectedPort = resolveAvailablePort();
        System.setProperty("server.port", String.valueOf(selectedPort));
        writePortFile(selectedPort);
    }

    private static int resolveAvailablePort() {
        for (int port = 8080; port <= 8100; port++) {
            try (ServerSocket socket = new ServerSocket(port)) {
                return port;
            } catch (IOException ignored) {
                // Try the next port if this one is already in use.
            }
        }

        return 8080;
    }

    private static void writePortFile(int port) {
        try {
            Path portFile = Path.of("target", "backend-port.txt");
            Files.createDirectories(portFile.getParent());
            Files.writeString(portFile, String.valueOf(port));
        } catch (IOException ex) {
            System.err.println("Unable to write backend port file: " + ex.getMessage());
        }
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
