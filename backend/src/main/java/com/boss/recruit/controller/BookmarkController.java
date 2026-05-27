package com.boss.recruit.controller;

import com.boss.recruit.entity.Bookmark;
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
@RequestMapping("/api/bookmarks")
public class BookmarkController {

    @Autowired
    private JobService jobService;

    // Toggle bookmark status (Add or Remove collection)
    @PostMapping("/{jobId}")
    public ResponseEntity<Map<String, Object>> toggleBookmark(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long jobId) {
        Bookmark bookmark = jobService.toggleBookmark(userDetails.getUsername(), jobId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("message", bookmark == null ? "已取消收藏该岗位" : "职位已成功加入您的收藏夹");
        response.put("data", bookmark);
        return ResponseEntity.ok(response);
    }

    // Get current user's collected list
    @GetMapping
    public ResponseEntity<Map<String, Object>> getMyBookmarks(@AuthenticationPrincipal UserDetails userDetails) {
        List<Bookmark> list = jobService.getUserBookmarks(userDetails.getUsername());
        
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("data", list);
        return ResponseEntity.ok(response);
    }

    // Remove collection directly (supporting Swipe Delete call requested in Stitch design document)
    @DeleteMapping("/{jobId}")
    public ResponseEntity<Map<String, Object>> removeBookmark(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long jobId) {
        jobService.deleteBookmark(userDetails.getUsername(), jobId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("message", "对应收藏职位已从列表删除");
        return ResponseEntity.ok(response);
    }
}
