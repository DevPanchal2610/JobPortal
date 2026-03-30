package com.dev.jobportal.model;

import com.dev.jobportal.enums.ApplicationStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "job_applications",
       uniqueConstraints = @UniqueConstraint(columnNames = {"job_id", "candidate_id"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @ManyToOne
    @JoinColumn(name = "candidate_id", nullable = false)
    private User candidate;

    private String coverLetter;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status = ApplicationStatus.APPLIED;

    @Column(nullable = false)
    private LocalDateTime appliedAt = LocalDateTime.now();
}
