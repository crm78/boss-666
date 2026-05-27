// Flutter recruit application models matching backend schema contracts

class UserProfile {
  final int id;
  final String phone;
  final String name;
  final String avatar;
  final String expectJob;
  final String city;
  final String salaryExpectation;
  final List<EducationRecord> educationList;
  final List<WorkExperienceRecord> workList;

  UserProfile({
    required this.id,
    required this.phone,
    required this.name,
    required this.avatar,
    required this.expectJob,
    required this.city,
    required this.salaryExpectation,
    required this.educationList,
    required this.workList,
  });

  factory UserProfile.fromJson(Map<String, dynamic> json) {
    return UserProfile(
      id: json['id'] ?? 0,
      phone: json['phone'] ?? '',
      name: json['name'] ?? '',
      avatar: json['avatar'] ?? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      expectJob: json['expectJob'] ?? '',
      city: json['city'] ?? '',
      salaryExpectation: json['salaryExpectation'] ?? '',
      educationList: (json['educationList'] as List? ?? [])
          .map((e) => EducationRecord.fromJson(e))
          .toList(),
      workList: (json['workList'] as List? ?? [])
          .map((e) => WorkExperienceRecord.fromJson(e))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'phone': phone,
    'name': name,
    'avatar': avatar,
    'expectJob': expectJob,
    'city': city,
    'salaryExpectation': salaryExpectation,
    'educationList': educationList.map((e) => e.toJson()).toList(),
    'workList': workList.map((e) => e.toJson()).toList(),
  };
}

class EducationRecord {
  final String id;
  final String school;
  final String major;
  final String degree;
  final String startYear;
  final String endYear;

  EducationRecord({
    required this.id,
    required this.school,
    required this.major,
    required this.degree,
    required this.startYear,
    required this.endYear,
  });

  factory EducationRecord.fromJson(Map<String, dynamic> json) {
    return EducationRecord(
      id: json['id']?.toString() ?? '',
      school: json['school'] ?? '',
      major: json['major'] ?? '',
      degree: json['degree'] ?? '',
      startYear: json['startYear'] ?? '',
      endYear: json['endYear'] ?? '',
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'school': school,
    'major': major,
    'degree': degree,
    'startYear': startYear,
    'endYear': endYear,
  };
}

class WorkExperienceRecord {
  final String id;
  final String company;
  final String role;
  final String description;
  final String startDate;
  final String endDate;

  WorkExperienceRecord({
    required this.id,
    required this.company,
    required this.role,
    required this.description,
    required this.startDate,
    required this.endDate,
  });

  factory WorkExperienceRecord.fromJson(Map<String, dynamic> json) {
    return WorkExperienceRecord(
      id: json['id']?.toString() ?? '',
      company: json['company'] ?? '',
      role: json['role'] ?? '',
      description: json['description'] ?? '',
      startDate: json['startDate'] ?? '',
      endDate: json['endDate'] ?? '',
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'company': company,
    'role': role,
    'description': description,
    'startDate': startDate,
    'endDate': endDate,
  };
}

class Job {
  final String id;
  final String title;
  final String company;
  final String companyLogo;
  final String salary;
  final String experience;
  final String education;
  final String city;
  final String district;
  final String recruiterName;
  final String recruiterTitle;
  final String recruiterAvatar;
  final String companyDetail;
  final String workHours;
  final String locationDetails;
  final List<String> tags;
  final List<String> duties;
  final List<String> requirements;

  Job({
    required this.id,
    required this.title,
    required this.company,
    required this.companyLogo,
    required this.salary,
    required this.experience,
    required this.education,
    required this.city,
    required this.district,
    required this.recruiterName,
    required this.recruiterTitle,
    required this.recruiterAvatar,
    required this.companyDetail,
    required this.workHours,
    required this.locationDetails,
    required this.tags,
    required this.duties,
    required this.requirements,
  });

  factory Job.fromJson(Map<String, dynamic> json) {
    return Job(
      id: json['id']?.toString() ?? '',
      title: json['title'] ?? '',
      company: json['company'] ?? '',
      companyLogo: json['companyLogo'] ?? '',
      salary: json['salary'] ?? '',
      experience: json['experience'] ?? '',
      education: json['education'] ?? '',
      city: json['city'] ?? '',
      district: json['district'] ?? '',
      recruiterName: json['recruiterName'] ?? '',
      recruiterTitle: json['recruiterTitle'] ?? '',
      recruiterAvatar: json['recruiterAvatar'] ?? '',
      companyDetail: json['companyDetail'] ?? '',
      workHours: json['workHours'] ?? '',
      locationDetails: json['locationDetails'] ?? '',
      tags: List<String>.from(json['tags'] ?? []),
      duties: List<String>.from(json['duties'] ?? []),
      requirements: List<String>.from(json['requirements'] ?? []),
    );
  }
}

class DeliveryRecord {
  final String id;
  final String jobId;
  final String jobTitle;
  final String company;
  final String companyLogo;
  final String city;
  final String status;
  final String appliedDate;

  DeliveryRecord({
    required this.id,
    required this.jobId,
    required this.jobTitle,
    required this.company,
    required this.companyLogo,
    required this.city,
    required this.status,
    required this.appliedDate,
  });

  factory DeliveryRecord.fromJson(Map<String, dynamic> json) {
    return DeliveryRecord(
      id: json['id']?.toString() ?? '',
      jobId: json['jobId']?.toString() ?? '',
      jobTitle: json['jobTitle'] ?? '',
      company: json['company'] ?? '',
      companyLogo: json['companyLogo'] ?? '',
      city: json['city'] ?? '',
      status: json['status'] ?? '已投递',
      appliedDate: json['appliedDate'] ?? '',
    );
  }
}
