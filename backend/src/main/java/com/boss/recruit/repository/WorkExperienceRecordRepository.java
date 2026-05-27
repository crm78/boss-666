package com.boss.recruit.repository;

import com.boss.recruit.entity.WorkExperienceRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkExperienceRecordRepository extends JpaRepository<WorkExperienceRecord, Long> {
    List<WorkExperienceRecord> findByUserId(Long userId);
}
