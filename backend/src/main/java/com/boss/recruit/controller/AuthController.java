package com.boss.recruit.controller;

import com.boss.recruit.dto.AuthResponseDto;
import com.boss.recruit.dto.UserLoginDto;
import com.boss.recruit.dto.UserRegisterDto;
import com.boss.recruit.entity.User;
import com.boss.recruit.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    // Mobile Phone + Password Code Signup registration
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody UserRegisterDto dto) {
        User user = userService.register(dto.getPhone(), dto.getPassword());
        
        // Auto sign in user after registration
        String token = userService.login(dto.getPhone(), dto.getPassword());
        
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("message", "用户创建注册成功");
        response.put("data", new AuthResponseDto(token, "Bearer", user.getPhone()));
        
        return ResponseEntity.ok(response);
    }

    // Password login validation endpoint
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody UserLoginDto dto) {
        String token = userService.login(dto.getPhone(), dto.getPassword());
        
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("message", "用户身份登录并核验成功");
        response.put("data", new AuthResponseDto(token, "Bearer", dto.getPhone()));
        
        return ResponseEntity.ok(response);
    }
}
