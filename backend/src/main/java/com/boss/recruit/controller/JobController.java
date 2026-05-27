package com.boss.recruit.controller;

import com.boss.recruit.entity.Job;
import com.boss.recruit.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    // Filter jobs with query parameters matching search queries
    @GetMapping
    public ResponseEntity<Map<String, Object>> getJobs(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "不限") String city,
            @RequestParam(required = false, defaultValue = "不限") String education,
            @RequestParam(required = false) Integer salaryMin,
            @RequestParam(required = false) Integer salaryMax) {
        
        List<Job> jobs = jobService.queryAndFilterJobs(keyword, city, education, salaryMin, salaryMax);
        
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("data", jobs);
        return ResponseEntity.ok(response);
    }

    // Grab details specs for select job boards ID
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getJobDetail(@PathVariable Long id) {
        Job job = jobService.getJobById(id);
        
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("data", job);
        return ResponseEntity.ok(response);
    }
}
