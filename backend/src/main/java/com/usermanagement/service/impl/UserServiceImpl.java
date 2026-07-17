package com.usermanagement.service.impl;

import com.usermanagement.entity.User;
import com.usermanagement.exception.DuplicateResourceException;
import com.usermanagement.exception.ResourceNotFoundException;
import com.usermanagement.repository.UserRepository;
import com.usermanagement.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repository;

    public UserServiceImpl(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<User> getAllUsers() {
        return repository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
    }

    @Override
    public User createUser(User user) {

        if (repository.existsByEmail(user.getEmail())) {
            throw new DuplicateResourceException("Email already exists");
        }

        return repository.save(user);
    }

    @Override
    public User updateUser(Long id, User user) {

        User existingUser = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        if (!existingUser.getEmail().equals(user.getEmail())
                && repository.existsByEmail(user.getEmail())) {

            throw new DuplicateResourceException("Email already exists");
        }

        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        existingUser.setEmail(user.getEmail());
        existingUser.setRole(user.getRole());
        existingUser.setActive(user.getActive());

        return repository.save(existingUser);
    }

    @Override
    public void deleteUser(Long id) {

        User existingUser = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        repository.delete(existingUser);
    }

}
