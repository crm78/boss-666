package com.boss.recruit.controller;

import com.boss.recruit.dto.ProfileUpdateDto;
import com.boss.recruit.entity.EducationRecord;
import com.boss.recruit.entity.User;
import com.boss.recruit.entity.WorkExperienceRecord;
import com.boss.recruit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Fetch unified logged-in Profile (with cascaded lists)
    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.getProfileByPhone(userDetails.getUsername());
        
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("data", user);
        return ResponseEntity.ok(response);
    }

    // Save Profile general info edits
    @PutMapping("/profile")
    public ResponseEntity<Map<String, Object>> updateProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody ProfileUpdateDto dto) {
        User user = userService.updateProfile(userDetails.getUsername(), dto);
        
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("message", "个人名片更新成功");
        response.put("data", user);
        return ResponseEntity.ok(response);
    }

    // Add school edu lists
    @PostMapping("/profile/education")
    public ResponseEntity<Map<String, Object>> addEducation(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody EducationRecord record) {
        EducationRecord saved = userService.addEducation(userDetails.getUsername(), record);
        
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("data", saved);
        return ResponseEntity.ok(response);
    }

    // Delete school edu element
    @DeleteMapping("/profile/education/{id}")
    public ResponseEntity<Map<String, Object>> deleteEducation(@PathVariable Long id) {
        userService.deleteEducation(id);
        
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("message", "对应教育经历记录删除成功");
        return ResponseEntity.ok(response);
    }

    // Add company work experience logs
    @PostMapping("/profile/work")
    public ResponseEntity<Map<String, Object>> addWork(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody WorkExperienceRecord record) {
        WorkExperienceRecord saved = userService.addWork(userDetails.getUsername(), record);
        
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("data", saved);
        return ResponseEntity.ok(response);
    }

    // Delete company work experience logs
    @DeleteMapping("/profile/work/{id}")
    public ResponseEntity<Map<String, Object>> deleteWork(@PathVariable Long id) {
        userService.deleteWork(id);
        
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("message", "对应工作履历已注销");
        return ResponseEntity.ok(response);
    }
}
