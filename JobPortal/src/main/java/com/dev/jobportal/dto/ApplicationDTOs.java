package com.dev.jobportal.dto;

import com.dev.jobportal.enums.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class ApplicationDTOs {

    @Data
    public static class ApplyRequest {
        private String coverLetter;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ApplicationResponse {
        private Long id;
        private Long jobId;
        private String jobTitle;
        private String company;
        private String candidateName;
        private String candidateEmail;
        private String candidateSkills;
        private String coverLetter;
        private ApplicationStatus status;
        private LocalDateTime appliedAt;
    }

    @Data
    public static class UpdateStatusRequest {
        private ApplicationStatus status;
    }
}
