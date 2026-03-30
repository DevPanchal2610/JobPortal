package com.dev.jobportal.controller;

import com.dev.jobportal.dto.ApiResponse;
import com.dev.jobportal.dto.JobDTOs.*;
import com.dev.jobportal.model.User;
import com.dev.jobportal.service.JobService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    // POST /api/jobs/post — RECRUITER only
    @PostMapping("/post")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<ApiResponse<JobResponse>> postJob(
            @Valid @RequestBody JobRequest request,
            @AuthenticationPrincipal User currentUser) {
        JobResponse response = jobService.postJob(request, currentUser);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Job posted successfully", response));
    }

    // GET /api/jobs/all — Public
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<JobResponse>>> getAllJobs() {
        return ResponseEntity.ok(ApiResponse.ok("Jobs fetched", jobService.getAllActiveJobs()));
    }

    // GET /api/jobs/search?keyword= — Public
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<JobResponse>>> searchJobs(@RequestParam String keyword) {
        return ResponseEntity.ok(ApiResponse.ok("Search results", jobService.searchJobs(keyword)));
    }

    // GET /api/jobs/{id} — Public
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<JobResponse>> getJobById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("Job fetched", jobService.getJobById(id)));
    }

    // GET /api/jobs/my — RECRUITER only
    @GetMapping("/my")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<ApiResponse<List<JobResponse>>> getMyJobs(
            @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(ApiResponse.ok("Your jobs", jobService.getMyPostedJobs(currentUser)));
    }

    // DELETE /api/jobs/{id} — RECRUITER only
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<ApiResponse<Void>> deleteJob(
            @PathVariable Long id,
            @AuthenticationPrincipal User currentUser) {
        jobService.deleteJob(id, currentUser);
        return ResponseEntity.ok(ApiResponse.ok("Job deleted successfully"));
    }
}
