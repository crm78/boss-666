package com.boss.recruit.controller;

import com.boss.recruit.entity.Delivery;
import com.boss.recruit.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/deliveries")
public class DeliveryController {

    @Autowired
    private JobService jobService;

    // Apply for a job and post a delivery record
    @PostMapping("/{jobId}")
    public ResponseEntity<Map<String, Object>> applyJob(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long jobId) {
        Delivery delivery = jobService.deliverResume(userDetails.getUsername(), jobId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("message", "求职简历投递成功");
        response.put("data", delivery);
        return ResponseEntity.ok(response);
    }

    // Get my delivery tracking history (including recruitment feedback status logs)
    @GetMapping
    public ResponseEntity<Map<String, Object>> getMyDeliveries(@AuthenticationPrincipal UserDetails userDetails) {
        List<Delivery> list = jobService.getUserDeliveries(userDetails.getUsername());
        
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("data", list);
        return ResponseEntity.ok(response);
    }
}
