package com.boss.recruit.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "jobs")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false, length = 100)
    private String company;

    @Column(name = "company_logo", length = 255)
    private String companyLogo;

    @Column(nullable = false, length = 50)
    private String salary;

    @Column(name = "salary_min", nullable = false)
    private Integer salaryMin;

    @Column(name = "salary_max", nullable = false)
    private Integer salaryMax;

    @Column(nullable = false, length = 50)
    private String experience;

    @Column(nullable = false, length = 50)
    private String education;

    @Column(nullable = false, length = 50)
    private String city;

    @Column(nullable = false, length = 50)
    private String district;

    @Column(name = "recruiter_name", nullable = false, length = 50)
    private String recruiterName;

    @Column(name = "recruiter_title", nullable = false, length = 50)
    private String recruiterTitle;

    @Column(name = "recruiter_avatar", length = 255)
    private String recruiterAvatar;

    @Column(name = "company_detail", nullable = false, length = 150)
    private String companyDetail;

    @Column(name = "work_hours", nullable = false, length = 50)
    private String workHours;

    @Column(name = "location_details", nullable = false, length = 255)
    private String locationDetails;

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Builder.Default
    private List<JobBullet> bullets = new ArrayList<>();

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Builder.Default
    private List<JobTag> tags = new ArrayList<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
