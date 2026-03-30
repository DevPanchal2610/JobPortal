package com.dev.jobportal.dto;

import com.dev.jobportal.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

public class AuthDTOs {

    @Data
    public static class RegisterRequest {
        @NotBlank(message = "Name is required")
        private String name;

        @Email(message = "Valid email is required")
        @NotBlank(message = "Email is required")
        private String email;

        @NotBlank(message = "Password is required")
        private String password;

        @NotNull(message = "Role is required")
        private Role role;

        private String phone;
        private String skills;   // for CANDIDATE
        private String company;  // for RECRUITER
    }

    @Data
    public static class LoginRequest {
        @Email
        @NotBlank
        private String email;

        @NotBlank
        private String password;
    }

    @Data
    @lombok.AllArgsConstructor
    public static class AuthResponse {
        private String token;
        private String name;
        private String email;
        private String role;
    }
}
