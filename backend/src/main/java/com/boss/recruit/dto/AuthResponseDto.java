package com.boss.recruit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponseDto {
    private String token;
    private String tokenType; // Bearer constant
    private String phone;
}
