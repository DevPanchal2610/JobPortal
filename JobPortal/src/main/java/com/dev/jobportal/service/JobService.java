package com.dev.jobportal.service;

import com.dev.jobportal.dto.JobDTOs.*;
import com.dev.jobportal.model.Job;
import com.dev.jobportal.model.User;
import com.dev.jobportal.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public JobResponse postJob(JobRequest request, User recruiter) {
        Job job = new Job();
        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setCompany(request.getCompany());
        job.setLocation(request.getLocation());
        job.setSalary(request.getSalary());
        job.setRequiredSkills(request.getRequiredSkills());
        job.setJobType(request.getJobType());
        job.setRecruiter(recruiter);

        return mapToResponse(jobRepository.save(job));
    }

    public List<JobResponse> getAllActiveJobs() {
        return jobRepository.findByActiveTrue()
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public List<JobResponse> searchJobs(String keyword) {
        return jobRepository.findByTitleContainingIgnoreCaseAndActiveTrue(keyword)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public JobResponse getJobById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        return mapToResponse(job);
    }

    public List<JobResponse> getMyPostedJobs(User recruiter) {
        return jobRepository.findByRecruiter(recruiter)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public void deleteJob(Long id, User recruiter) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getRecruiter().getId().equals(recruiter.getId())) {
            throw new RuntimeException("Access denied: you can only delete your own jobs");
        }

        job.setActive(false);
        jobRepository.save(job);
    }

    private JobResponse mapToResponse(Job job) {
        JobResponse res = new JobResponse();
        res.setId(job.getId());
        res.setTitle(job.getTitle());
        res.setDescription(job.getDescription());
        res.setCompany(job.getCompany());
        res.setLocation(job.getLocation());
        res.setSalary(job.getSalary());
        res.setRequiredSkills(job.getRequiredSkills());
        res.setJobType(job.getJobType());
        res.setRecruiterName(job.getRecruiter().getName());
        res.setRecruiterEmail(job.getRecruiter().getEmail());
        res.setPostedAt(job.getPostedAt());
        res.setActive(job.isActive());
        return res;
    }
}
