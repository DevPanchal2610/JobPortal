package com.dev.jobportal.controller;

import com.dev.jobportal.dto.ApiResponse;
import com.dev.jobportal.dto.UserProfileDTO;
import com.dev.jobportal.model.User;
import com.dev.jobportal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // GET /api/users/profile
    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserProfileDTO>> getProfile(
            @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(ApiResponse.ok("Profile fetched",
                userService.getProfile(currentUser)));
    }

    // PUT /api/users/profile
    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<UserProfileDTO>> updateProfile(
            @AuthenticationPrincipal User currentUser,
            @RequestBody UserProfileDTO dto) {
        return ResponseEntity.ok(ApiResponse.ok("Profile updated",
                userService.updateProfile(currentUser, dto)));
    }
}
