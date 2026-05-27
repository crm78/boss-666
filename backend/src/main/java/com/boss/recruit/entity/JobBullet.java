package com.boss.recruit.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "job_bullets")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "job")
public class JobBullet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    @JsonIgnore
    private Job job;

    @Enumerated(EnumType.STRING)
    @Column(name = "bullet_type", nullable = false, length = 30)
    private BulletType bulletType;

    @Column(name = "bullet_text", nullable = false, columnDefinition = "TEXT")
    private String bulletText;

    public enum BulletType {
        DUTY, REQUIREMENT
    }
}
