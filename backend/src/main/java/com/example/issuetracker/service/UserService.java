package com.example.issuetracker.service;

import com.example.issuetracker.dto.UserDTO;
import com.example.issuetracker.model.User;
import com.example.issuetracker.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }

    public UserDTO createUser(User user) {
        return new UserDTO(userRepository.save(user));
    }
}
