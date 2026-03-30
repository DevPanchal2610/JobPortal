package com.dev.jobportal.controller;

import com.dev.jobportal.dto.ApiResponse;
import com.dev.jobportal.dto.ApplicationDTOs.*;
import com.dev.jobportal.model.User;
import com.dev.jobportal.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    // POST /api/applications/apply/{jobId} — CANDIDATE only
    @PostMapping("/apply/{jobId}")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<ApiResponse<ApplicationResponse>> applyForJob(
            @PathVariable Long jobId,
            @RequestBody ApplyRequest request,
            @AuthenticationPrincipal User currentUser) {
        ApplicationResponse response = applicationService.applyForJob(jobId, request, currentUser);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Application submitted successfully", response));
    }

    // GET /api/applications/my — CANDIDATE only
    @GetMapping("/my")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<ApiResponse<List<ApplicationResponse>>> getMyApplications(
            @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(ApiResponse.ok("Your applications",
                applicationService.getMyApplications(currentUser)));
    }

    // GET /api/applications/job/{jobId} — RECRUITER only
    @GetMapping("/job/{jobId}")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<ApiResponse<List<ApplicationResponse>>> getApplicationsForJob(
            @PathVariable Long jobId,
            @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(ApiResponse.ok("Applications for job",
                applicationService.getApplicationsForJob(jobId, currentUser)));
    }

    // PUT /api/applications/{id}/status — RECRUITER only
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<ApiResponse<ApplicationResponse>> updateStatus(
            @PathVariable Long id,
            @RequestBody UpdateStatusRequest request,
            @AuthenticationPrincipal User currentUser) {
        ApplicationResponse response = applicationService.updateApplicationStatus(id, request, currentUser);
        return ResponseEntity.ok(ApiResponse.ok("Status updated", response));
    }
}
