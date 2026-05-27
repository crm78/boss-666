-- Sample Mock Seed Data Dump for Boss Recruit database
USE `boss_recruit_db`;

-- Insert Initial Mock User
-- Password Hash below is pre-encrypted BCrypt for plaintext "123456"
INSERT INTO `users` (`id`, `phone`, `password`, `name`, `avatar`, `expect_job`, `city`, `salary_expectation`) 
VALUES (1, '13800000000', '$2a$10$C8lUnQZ216p6F66pP.vXvOhbeRE7G600E267.i.S1w6v6XvOnXOh5', '张小明', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', '高级产品经理', '北京', '20k-30k');

-- Seed Educational entries
INSERT INTO `education_records` (`user_id`, `school`, `major`, `degree`, `start_year`, `end_year`)
VALUES (1, '清华大学', '计算机科学与技术', '本科', '2016', '2020');

-- Seed Work Experience entries
INSERT INTO `work_experience_records` (`user_id`, `company`, `role`, `description`, `start_date`, `end_date`)
VALUES (1, '腾讯科技', '高级产品经理助理', '负责微信支付核心业务系统的架构设计与性能优化，主导双十一期间高并发场景下的容量规划。', '2020.07', '至今');

-- Seed Job Postings
-- Posting 1: ByteDance
INSERT INTO `jobs` (`id`, `title`, `company`, `company_logo`, `salary`, `salary_min`, `salary_max`, `experience`, `education`, `city`, `district`, `recruiter_name`, `recruiter_title`, `recruiter_avatar`, `company_detail`, `work_hours`, `location_details`)
VALUES (
  1, '高级产品经理', '字节跳动', 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=100', 
  '25-45K·14薪', 25, 45, '5-10年', '本科及以上', '北京', '朝阳区', 
  '李经理', '招聘者', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
  'D轮及以上 · 10000人以上 · 互联网/AI', '周末双休', '北京市朝阳区北三环西路'
);

-- Posting 2: Ant Group
INSERT INTO `jobs` (`id`, `title`, `company`, `company_logo`, `salary`, `salary_min`, `salary_max`, `experience`, `education`, `city`, `district`, `recruiter_name`, `recruiter_title`, `recruiter_avatar`, `company_detail`, `work_hours`, `location_details`)
VALUES (
  2, '资深前端开发', '蚂蚁集团', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=100', 
  '30k-50k', 30, 50, '3-5年', '硕士', '杭州', '西湖区', 
  '韩老师', '前端专家', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
  '已上市 · 10000人以上 · 金融科技', '周末双休', '浙江省杭州市西湖区蚂蚁Z空间'
);

-- Posting 3: RED
INSERT INTO `jobs` (`id`, `title`, `company`, `company_logo`, `salary`, `salary_min`, `salary_max`, `experience`, `education`, `city`, `district`, `recruiter_name`, `recruiter_title`, `recruiter_avatar`, `company_detail`, `work_hours`, `location_details`)
VALUES (
  3, '视觉设计师', '小红书', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=100', 
  '15k-25k', 15, 25, '1-3年', '本科', '上海', '黄浦区', 
  '王女士', '设计招聘BP', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
  'D轮及以上 · 1000-9999人 · 潮流社区', '周末双休', '上海市黄浦区马当路SOHO'
);

-- Tag Seedings for Job Postings
-- Job 1
INSERT INTO `job_tags` (`job_id`, `tag`) VALUES (1, '五险一金');
INSERT INTO `job_tags` (`job_id`, `tag`) VALUES (1, '年底双薪');
INSERT INTO `job_tags` (`job_id`, `tag`) VALUES (1, '大牛带队');
-- Job 2
INSERT INTO `job_tags` (`job_id`, `tag`) VALUES (2, '股票期权');
INSERT INTO `job_tags` (`job_id`, `tag`) VALUES (2, '餐补');
INSERT INTO `job_tags` (`job_id`, `tag`) VALUES (2, '技术氛围浓');
-- Job 3
INSERT INTO `job_tags` (`job_id`, `tag`) VALUES (3, '下午茶');
INSERT INTO `job_tags` (`job_id`, `tag`) VALUES (3, '弹性工作');
INSERT INTO `job_tags` (`job_id`, `tag`) VALUES (3, '帅哥美女多');

-- Bullet descriptions mapping (DUTY and REQUIREMENTS)
-- Job 1
INSERT INTO `job_bullets` (`job_id`, `bullet_type`, `bullet_text`) VALUES (1, 'DUTY', '负责招聘产品的核心流程设计与优化，提升求职者与招聘方的撮合效率；');
INSERT INTO `job_bullets` (`job_id`, `bullet_type`, `bullet_text`) VALUES (1, 'DUTY', '通过数据驱动策略，制定产品发展规划，并落地跨部门协同项目；');
INSERT INTO `job_bullets` (`job_id`, `bullet_type`, `bullet_text`) VALUES (1, 'DUTY', '深入调研行业趋势，挖掘AI在人力资源领域的应用场景，并进行方案验证。');
INSERT INTO `job_bullets` (`job_id`, `bullet_type`, `bullet_text`) VALUES (1, 'REQUIREMENT', '5年以上互联网产品经验，有招聘、撮合或社交类产品背景优先；');
INSERT INTO `job_bullets` (`job_id`, `bullet_type`, `bullet_text`) VALUES (1, 'REQUIREMENT', '具备极强的数据敏感度及逻辑分析能力，能够从复杂业务中抽象核心逻辑；');
INSERT INTO `job_bullets` (`job_id`, `bullet_type`, `bullet_text`) VALUES (1, 'REQUIREMENT', '良好的沟通能力与抗压能力，能适应高强度、快速迭代的互联网环境。');

-- Job 2
INSERT INTO `job_bullets` (`job_id`, `bullet_type`, `bullet_text`) VALUES (2, 'DUTY', '负责基础平台及中后台系统的技术方案落地和性能调优；');
INSERT INTO `job_bullets` (`job_id`, `bullet_type`, `bullet_text`) VALUES (2, 'DUTY', '推动前端工程化体系建设，实现高效协作及组件库沉淀。');
INSERT INTO `job_bullets` (`job_id`, `bullet_type`, `bullet_text`) VALUES (2, 'REQUIREMENT', '3-5年及以上高质量前端研发经验，精通React等主流技术栈；');
INSERT INTO `job_bullets` (`job_id`, `bullet_type`, `bullet_text`) VALUES (2, 'REQUIREMENT', '熟悉前端构建化工具（Vite、Webpack）及现代CSS规范（Tailwind）。');

-- Feed Seed Bookmarks
INSERT INTO `bookmarks_collections` (`user_id`, `job_id`) VALUES (1, 1);

-- Feed Seeding Deliveries
INSERT INTO `deliveries_records` (`user_id`, `job_id`, `status`) VALUES (1, 2, '已查看');
