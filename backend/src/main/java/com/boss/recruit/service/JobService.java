package com.boss.recruit.service;

import com.boss.recruit.entity.Job;
import com.boss.recruit.entity.Bookmark;
import com.boss.recruit.entity.Delivery;

import java.util.List;

public interface JobService {
    List<Job> queryAndFilterJobs(String keyword, String city, String education, Integer salaryMin, Integer salaryMax);
    Job getJobById(Long id);
    
    Bookmark toggleBookmark(String phone, Long jobId);
    List<Bookmark> getUserBookmarks(String phone);
    void deleteBookmark(String phone, Long jobId);
    
    Delivery deliverResume(String phone, Long jobId);
    List<Delivery> getUserDeliveries(String phone);
}
