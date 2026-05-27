package com.boss.recruit.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@Slf4j
public class RequestLogInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        long startTime = System.currentTimeMillis();
        request.setAttribute("startTime", startTime);
        
        log.info(">>>> [REQUEST] Method: {} | URL: {} | ClientIP: {}", 
                request.getMethod(), request.getRequestURI(), request.getRemoteAddr());
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        Long startTime = (Long) request.getAttribute("startTime");
        long duration = 0;
        if (startTime != null) {
            duration = System.currentTimeMillis() - startTime;
        }
        
        log.info("<<<< [RESPONSE] URL: {} | Status: {} | Duration: {}ms | Exception: {}", 
                request.getRequestURI(), response.getStatus(), duration, ex != null ? ex.getMessage() : "None");
    }
}
