package com.boss.recruit.serviceImpl;

import com.boss.recruit.entity.Bookmark;
import com.boss.recruit.entity.Delivery;
import com.boss.recruit.entity.Job;
import com.boss.recruit.entity.User;
import com.boss.recruit.repository.BookmarkRepository;
import com.boss.recruit.repository.DeliveryRepository;
import com.boss.recruit.repository.JobRepository;
import com.boss.recruit.repository.UserRepository;
import com.boss.recruit.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Job> queryAndFilterJobs(String keyword, String city, String education, Integer salaryMin, Integer salaryMax) {
        // Enforce null conversion for empty/default filter parameters
        String searchCity = "不限".equals(city) ? null : city;
        String searchEdu = "不限".equals(education) ? null : education;
        return jobRepository.filterJobs(keyword, searchCity, searchEdu, salaryMin, salaryMax);
    }

    @Override
    @Transactional(readOnly = true)
    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("该职位招聘信息已关闭"));
    }

    @Override
    public Bookmark toggleBookmark(String phone, Long jobId) {
        User user = userRepository.findByPhone(phone)
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        Job job = getJobById(jobId);

        Optional<Bookmark> existing = bookmarkRepository.findByUserIdAndJobId(user.getId(), jobId);
        if (existing.isPresent()) {
            bookmarkRepository.delete(existing.get());
            return null; // Return null representing bookmark was untoggled
        } else {
            Bookmark bookmark = Bookmark.builder()
                    .user(user)
                    .job(job)
                    .build();
            return bookmarkRepository.save(bookmark);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Bookmark> getUserBookmarks(String phone) {
        User user = userRepository.findByPhone(phone)
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        return bookmarkRepository.findByUserId(user.getId());
    }

    @Override
    public void deleteBookmark(String phone, Long jobId) {
        User user = userRepository.findByPhone(phone)
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        Bookmark bookmark = bookmarkRepository.findByUserIdAndJobId(user.getId(), jobId)
                .orElseThrow(() -> new RuntimeException("收藏夹中查找不到此项"));
        bookmarkRepository.delete(bookmark);
    }

    @Override
    public Delivery deliverResume(String phone, Long jobId) {
        User user = userRepository.findByPhone(phone)
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        Job job = getJobById(jobId);

        // Enforce anti-duplication constraints requested in core doc
        if (deliveryRepository.existsByUserIdAndJobId(user.getId(), jobId)) {
            throw new RuntimeException("抱歉！您已经向该职位主投递过简历，无需重复操作；可在后台详情查看面试邀请结果。");
        }

        Delivery delivery = Delivery.builder()
                .user(user)
                .job(job)
                .status("已投递") // Init delivery status tag
                .build();

        return deliveryRepository.save(delivery);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Delivery> getUserDeliveries(String phone) {
        User user = userRepository.findByPhone(phone)
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        return deliveryRepository.findByUserId(user.getId());
    }
}
