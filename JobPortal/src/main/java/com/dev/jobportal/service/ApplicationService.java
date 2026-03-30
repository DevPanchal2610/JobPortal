package com.dev.jobportal.service;

import com.dev.jobportal.dto.ApplicationDTOs.*;
import com.dev.jobportal.model.Job;
import com.dev.jobportal.model.JobApplication;
import com.dev.jobportal.model.User;
import com.dev.jobportal.repository.JobApplicationRepository;
import com.dev.jobportal.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    @Autowired private JobApplicationRepository applicationRepository;
    @Autowired private JobRepository jobRepository;

    public ApplicationResponse applyForJob(Long jobId, ApplyRequest request, User candidate) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.isActive()) {
            throw new RuntimeException("This job is no longer active");
        }

        if (applicationRepository.existsByJobAndCandidate(job, candidate)) {
            throw new RuntimeException("You have already applied for this job");
        }

        JobApplication application = new JobApplication();
        application.setJob(job);
        application.setCandidate(candidate);
        application.setCoverLetter(request.getCoverLetter());

        return mapToResponse(applicationRepository.save(application));
    }

    public List<ApplicationResponse> getMyApplications(User candidate) {
        return applicationRepository.findByCandidate(candidate)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public List<ApplicationResponse> getApplicationsForJob(Long jobId, User recruiter) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getRecruiter().getId().equals(recruiter.getId())) {
            throw new RuntimeException("Access denied: this job does not belong to you");
        }

        return applicationRepository.findByJob(job)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public ApplicationResponse updateApplicationStatus(Long applicationId, UpdateStatusRequest request, User recruiter) {
        JobApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        if (!application.getJob().getRecruiter().getId().equals(recruiter.getId())) {
            throw new RuntimeException("Access denied");
        }

        application.setStatus(request.getStatus());
        return mapToResponse(applicationRepository.save(application));
    }

    private ApplicationResponse mapToResponse(JobApplication app) {
        ApplicationResponse res = new ApplicationResponse();
        res.setId(app.getId());
        res.setJobId(app.getJob().getId());
        res.setJobTitle(app.getJob().getTitle());
        res.setCompany(app.getJob().getCompany());
        res.setCandidateName(app.getCandidate().getName());
        res.setCandidateEmail(app.getCandidate().getEmail());
        res.setCandidateSkills(app.getCandidate().getSkills());
        res.setCoverLetter(app.getCoverLetter());
        res.setStatus(app.getStatus());
        res.setAppliedAt(app.getAppliedAt());
        return res;
    }
}
