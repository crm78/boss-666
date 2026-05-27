-- MySQL 8.0 Schema Build Script for Boss Recruit App
-- Character Set: utf8mb4, Engine: InnoDB

CREATE DATABASE IF NOT EXISTS `boss_recruit_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `boss_recruit_db`;

SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Primary Key ID',
  `phone` VARCHAR(20) NOT NULL COMMENT 'Unique phone number for auth',
  `password` VARCHAR(100) NOT NULL COMMENT 'BCrypt encrypted password hash',
  `name` VARCHAR(50) DEFAULT NULL COMMENT 'Candidate Name',
  `avatar` VARCHAR(255) DEFAULT NULL COMMENT 'Profile photo url',
  `expect_job` VARCHAR(100) DEFAULT NULL COMMENT 'Target occupation expectation',
  `city` VARCHAR(55) DEFAULT NULL COMMENT 'Desired employment city',
  `salary_expectation` VARCHAR(50) DEFAULT NULL COMMENT 'Salary range expectations (eg. 25k-35k)',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation stamp',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update stamp',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_phone_unique` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Core user authentication and profile storage table';

-- -----------------------------------------------------
-- Table `education_records`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `education_records`;
CREATE TABLE `education_records` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `user_id` BIGINT NOT NULL COMMENT 'Foreign key connecting to users',
  `school` VARCHAR(100) NOT NULL COMMENT 'Academy or University name',
  `major` VARCHAR(100) NOT NULL COMMENT 'Major field of study',
  `degree` VARCHAR(50) NOT NULL COMMENT 'Academic degree (eg. Bachelor, Master)',
  `start_year` VARCHAR(10) NOT NULL COMMENT 'Start year of enrollment',
  `end_year` VARCHAR(10) NOT NULL COMMENT 'End year of graduation',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_education_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Education entries linked to a candidate';

-- -----------------------------------------------------
-- Table `work_experience_records`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `work_experience_records`;
CREATE TABLE `work_experience_records` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `user_id` BIGINT NOT NULL COMMENT 'Foriegn key link to user identity',
  `company` VARCHAR(100) NOT NULL COMMENT 'Employer enterprise name',
  `role` VARCHAR(100) NOT NULL COMMENT 'Candidate role or title in firm',
  `description` TEXT NOT NULL COMMENT 'Detailed job duties and accomplishments',
  `start_date` VARCHAR(20) NOT NULL COMMENT 'Job start month/year',
  `end_date` VARCHAR(20) NOT NULL COMMENT 'Job end date or Present indicator',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_work_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Work experience records linked to a candidate';

-- -----------------------------------------------------
-- Table `jobs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL COMMENT 'Job Title name',
  `company` VARCHAR(100) NOT NULL COMMENT 'Hiring corporate body',
  `company_logo` VARCHAR(255) DEFAULT NULL COMMENT 'Corporate branding URL',
  `salary` VARCHAR(50) NOT NULL COMMENT 'Salary text string (eg: 25-45K·14薪)',
  `salary_min` INT NOT NULL COMMENT 'Min boundaries for queries',
  `salary_max` INT NOT NULL COMMENT 'Max boundaries for queries',
  `experience` VARCHAR(50) NOT NULL COMMENT 'Experience duration expectations',
  `education` VARCHAR(50) NOT NULL COMMENT 'Strict degree qualifications limits',
  `city` VARCHAR(50) NOT NULL,
  `district` VARCHAR(50) NOT NULL,
  `recruiter_name` VARCHAR(50) NOT NULL,
  `recruiter_title` VARCHAR(50) NOT NULL,
  `recruiter_avatar` VARCHAR(255) DEFAULT NULL,
  `company_detail` VARCHAR(150) NOT NULL COMMENT 'Scale and sector category text',
  `work_hours` VARCHAR(50) NOT NULL COMMENT 'Working schedule constraints',
  `location_details` VARCHAR(255) NOT NULL COMMENT 'Map coordinate readable address text',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Job postings database index';

-- -----------------------------------------------------
-- Table `job_bullets`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `job_bullets`;
CREATE TABLE `job_bullets` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `job_id` BIGINT NOT NULL,
  `bullet_type` ENUM('DUTY', 'REQUIREMENT') NOT NULL COMMENT 'Bullet point classification',
  `bullet_text` TEXT NOT NULL COMMENT 'The bullet entry row detail text content',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_bullet_job` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Granular task bullets for job specifications';

-- -----------------------------------------------------
-- Table `job_tags`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `job_tags`;
CREATE TABLE `job_tags` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `job_id` BIGINT NOT NULL,
  `tag` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_tag_job` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Dynamic benefits chips and tags list';

-- -----------------------------------------------------
-- Table `bookmarks_collections`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bookmarks_collections`;
CREATE TABLE `bookmarks_collections` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `job_id` BIGINT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_user_job_unique` (`user_id`, `job_id`), -- Composite unique constraint requested
  CONSTRAINT `fk_bookmark_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_bookmark_job` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='User job bookmarks collections table with unique constraint';

-- -----------------------------------------------------
-- Table `deliveries_records`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `deliveries_records`;
CREATE TABLE `deliveries_records` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `job_id` BIGINT NOT NULL,
  `status` VARCHAR(30) NOT NULL DEFAULT '已投递' COMMENT 'Status: 邀请面试, 已查看, 不合适, 已投递',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_user_apply_unique` (`user_id`, `job_id`), -- Prevent duplication as requested
  CONSTRAINT `fk_delivery_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_delivery_job` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Job delivery and progress tracking with unique constraints';

SET FOREIGN_KEY_CHECKS = 1;
