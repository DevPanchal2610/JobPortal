package com.dev.jobportal.repository;

import com.dev.jobportal.model.Job;
import com.dev.jobportal.model.JobApplication;
import com.dev.jobportal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByCandidate(User candidate);
    List<JobApplication> findByJob(Job job);
    Optional<JobApplication> findByJobAndCandidate(Job job, User candidate);
    boolean existsByJobAndCandidate(Job job, User candidate);
}
