package com.dev.jobportal.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;

public class JobDTOs {

    @Data
    public static class JobRequest {
        @NotBlank(message = "Title is required")
        private String title;

        @NotBlank(message = "Description is required")
        private String description;

        @NotBlank(message = "Company is required")
        private String company;

        @NotBlank(message = "Location is required")
        private String location;

        private String salary;
        private String requiredSkills;
        private String jobType;
    }

    @Data
    @lombok.AllArgsConstructor
    @lombok.NoArgsConstructor
    public static class JobResponse {
        private Long id;
        private String title;
        private String description;
        private String company;
        private String location;
        private String salary;
        private String requiredSkills;
        private String jobType;
        private String recruiterName;
        private String recruiterEmail;
        private LocalDateTime postedAt;
        private boolean active;
    }
}
