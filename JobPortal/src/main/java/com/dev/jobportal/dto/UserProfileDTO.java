package com.dev.jobportal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDTO {
    private Long id;
    private String name;
    private String email;
    private String role;
    private String phone;
    private String skills;
    private String company;
}
