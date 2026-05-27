package com.boss.recruit.dto;

import lombok.Data;

@Data
public class ProfileUpdateDto {
    private String name;
    private String avatar;
    private String expectJob;
    private String city;
    private String salaryExpectation;
}
