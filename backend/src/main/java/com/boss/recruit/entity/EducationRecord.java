package com.boss.recruit.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "education_records")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "user")
public class EducationRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @Column(nullable = false, length = 100)
    private String school;

    @Column(nullable = false, length = 100)
    private String major;

    @Column(nullable = false, length = 50)
    private String degree;

    @Column(name = "start_year", nullable = false, length = 10)
    private String startYear;

    @Column(name = "end_year", nullable = false, length = 10)
    private String endYear;
}
