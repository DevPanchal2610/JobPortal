package com.dev.jobportal.service;

import com.dev.jobportal.dto.UserProfileDTO;
import com.dev.jobportal.model.User;
import com.dev.jobportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    public UserProfileDTO getProfile(User user) {
        return new UserProfileDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name(),
                user.getPhone(),
                user.getSkills(),
                user.getCompany()
        );
    }

    public UserProfileDTO updateProfile(User user, UserProfileDTO dto) {
        user.setName(dto.getName());
        user.setPhone(dto.getPhone());
        user.setSkills(dto.getSkills());
        user.setCompany(dto.getCompany());
        userRepository.save(user);
        return getProfile(user);
    }
}
