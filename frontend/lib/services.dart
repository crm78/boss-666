import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

// Dio interceptor for responses and 401 redirects request
class ApiService {
  final Dio _dio = Dio(BaseOptions(
    baseUrl: 'http://localhost:8080/api', // Default local API base url
    connectTimeout: const Duration(seconds: 10),
    receiveTimeout: const Duration(seconds: 10),
  ));

  final FlutterSecureStorage _storage = const FlutterSecureStorage();
  
  // Singleton pattern
  static final ApiService _instance = ApiService._internal();
  factory ApiService() => _instance;

  ApiService._internal() {
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          // Read JWT token from secure storage and attach to request header
          final token = await _storage.read(key: 'jwt_token');
          if (token != null) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          options.headers['ContentType'] = 'application/json';
          return handler.next(options);
        },
        onResponse: (response, handler) {
          return handler.next(response);
        },
        onError: (DioException error, handler) async {
          if (error.response?.statusCode == 401) {
            // Global custom 401 redirect trigger
            await _storage.delete(key: 'jwt_token');
            _on401Callback?.call();
          }
          return handler.next(error);
        },
      ),
    );
  }

  // Hook to handle UI redirect to login screen on 401
  VoidCallback? _on401Callback;
  void register401Callback(VoidCallback callback) {
    _on401Callback = callback;
  }

  Future<Response> login(String phone, String password) async {
    return await _dio.post('/auth/login', data: {
      'phone': phone,
      'password': password,
    });
  }

  Future<Response> register(String phone, String password) async {
    return await _dio.post('/auth/register', data: {
      'phone': phone,
      'password': password,
    });
  }

  Future<Response> getProfile() async {
    return await _dio.get('/users/profile');
  }

  Future<Response> getJobs({
    String? keyword,
    String city = '不限',
    String education = '不限',
    int? salaryMin,
    int? salaryMax,
  }) async {
    final Map<String, dynamic> queryParams = {};
    if (keyword != null && keyword.isNotEmpty) queryParams['keyword'] = keyword;
    if (city != '不限') queryParams['city'] = city;
    if (education != '不限') queryParams['education'] = education;
    if (salaryMin != null) queryParams['salaryMin'] = salaryMin;
    if (salaryMax != null) queryParams['salaryMax'] = salaryMax;

    return await _dio.get('/jobs', queryParameters: queryParams);
  }

  Future<Response> getJobDetails(String jobId) async {
    return await _dio.get('/jobs/$jobId');
  }

  Future<Response> toggleBookmark(String jobId) async {
    return await _dio.post('/bookmarks/$jobId');
  }

  Future<Response> applyJob(String jobId) async {
    return await _dio.post('/deliveries/$jobId');
  }

  Future<Response> getDeliveries() async {
    return await _dio.get('/deliveries');
  }
}
