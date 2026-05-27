package com.boss.recruit.service;

import com.boss.recruit.dto.ProfileUpdateDto;
import com.boss.recruit.entity.EducationRecord;
import com.boss.recruit.entity.User;
import com.boss.recruit.entity.WorkExperienceRecord;

import java.util.List;

public interface UserService {
    User register(String phone, String plaintextPassword);
    String login(String phone, String plaintextPassword);
    User getProfileByPhone(String phone);
    User updateProfile(String phone, ProfileUpdateDto dto);
    
    EducationRecord addEducation(String phone, EducationRecord record);
    void deleteEducation(Long id);
    
    WorkExperienceRecord addWork(String phone, WorkExperienceRecord record);
    void deleteWork(Long id);
}
