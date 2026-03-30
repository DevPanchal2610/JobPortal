package com.dev.jobportal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 2000)
    private String description;

    @Column(nullable = false)
    private String company;

    @Column(nullable = false)
    private String location;

    private String salary;
    private String requiredSkills;
    private String jobType; // Full-time, Part-time, Remote

    @ManyToOne
    @JoinColumn(name = "recruiter_id", nullable = false)
    private User recruiter;

    @Column(nullable = false)
    private LocalDateTime postedAt = LocalDateTime.now();

    private boolean active = true;
}
