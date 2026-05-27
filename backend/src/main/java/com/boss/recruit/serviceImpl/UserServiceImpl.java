package com.boss.recruit.serviceImpl;

import com.boss.recruit.dto.ProfileUpdateDto;
import com.boss.recruit.entity.EducationRecord;
import com.boss.recruit.entity.User;
import com.boss.recruit.entity.WorkExperienceRecord;
import com.boss.recruit.repository.EducationRecordRepository;
import com.boss.recruit.repository.UserRepository;
import com.boss.recruit.repository.WorkExperienceRecordRepository;
import com.boss.recruit.security.JwtTokenProvider;
import com.boss.recruit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EducationRecordRepository educationRecordRepository;

    @Autowired
    private WorkExperienceRecordRepository workExperienceRecordRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Override
    public User register(String phone, String plaintextPassword) {
        if (userRepository.existsByPhone(phone)) {
            throw new RuntimeException("该手机号码已被注册");
        }
        
        User user = User.builder()
                .phone(phone)
                .password(passwordEncoder.encode(plaintextPassword))
                .name("求职者_" + phone.substring(phone.length() - 4))
                .avatar("https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200") // Fallback avatar asset
                .build();
                
        return userRepository.save(user);
    }

    @Override
    public String login(String phone, String plaintextPassword) {
        User user = userRepository.findByPhone(phone)
                .orElseThrow(() -> new RuntimeException("手机号未注册或密码不正确"));

        if (!passwordEncoder.matches(plaintextPassword, user.getPassword())) {
            throw new RuntimeException("手机号未注册或密码不正确");
        }

        return jwtTokenProvider.generateToken(phone);
    }

    @Override
    @Transactional(readOnly = true)
    public User getProfileByPhone(String phone) {
        return userRepository.findByPhone(phone)
                .orElseThrow(() -> new RuntimeException("用户不存在"));
    }

    @Override
    public User updateProfile(String phone, ProfileUpdateDto dto) {
        User user = getProfileByPhone(phone);
        
        if (dto.getName() != null) user.setName(dto.getName());
        if (dto.getAvatar() != null) user.setAvatar(dto.getAvatar());
        if (dto.getExpectJob() != null) user.setExpectJob(dto.getExpectJob());
        if (dto.getCity() != null) user.setCity(dto.getCity());
        if (dto.getSalaryExpectation() != null) user.setSalaryExpectation(dto.getSalaryExpectation());
        
        return userRepository.save(user);
    }

    @Override
    public EducationRecord addEducation(String phone, EducationRecord record) {
        User user = getProfileByPhone(phone);
        record.setUser(user);
        return educationRecordRepository.save(record);
    }

    @Override
    public void deleteEducation(Long id) {
        educationRecordRepository.deleteById(id);
    }

    @Override
    public WorkExperienceRecord addWork(String phone, WorkExperienceRecord record) {
        User user = getProfileByPhone(phone);
        record.setUser(user);
        return workExperienceRecordRepository.save(record);
    }

    @Override
    public void deleteWork(Long id) {
        workExperienceRecordRepository.deleteById(id);
    }
}
