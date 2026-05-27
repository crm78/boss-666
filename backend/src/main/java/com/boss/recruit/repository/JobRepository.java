package com.boss.recruit.repository;

import com.boss.recruit.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    @Query("SELECT j FROM Job j WHERE " +
           "(:keyword IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(j.company) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "AND (:city IS NULL OR j.city = :city) " +
           "AND (:education IS NULL OR j.education = :education) " +
           "AND (:salaryMin IS NULL OR j.salaryMin >= :salaryMin) " +
           "AND (:salaryMax IS NULL OR j.salaryMax <= :salaryMax)")
    List<Job> filterJobs(
        @Param("keyword") String keyword,
        @Param("city") String city,
        @Param("education") String education,
        @Param("salaryMin") Integer salaryMin,
        @Param("salaryMax") Integer salaryMax
    );
}
