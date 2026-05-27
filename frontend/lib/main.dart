import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import 'models.dart';
import 'services.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AppStateProvider()),
      ],
      child: const BossRecruitApp(),
    ),
  );
}

// Global Application state manager
class AppStateProvider extends ChangeNotifier {
  final ApiService _api = ApiService();
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  bool _isLoggedIn = false;
  bool get isLoggedIn => _isLoggedIn;

  UserProfile? _profile;
  UserProfile? get profile => _profile;

  List<Job> _jobs = [];
  List<Job> get jobs => _jobs;

  List<Job> _bookmarks = [];
  List<Job> get bookmarks => _bookmarks;

  List<DeliveryRecord> _deliveries = [];
  List<DeliveryRecord> get deliveries => _deliveries;

  AppStateProvider() {
    _api.register401Callback(() {
      _isLoggedIn = false;
      _profile = null;
      notifyListeners();
    });
    checkLoginStatus();
  }

  Future<void> checkLoginStatus() async {
    final token = await _storage.read(key: 'jwt_token');
    _isLoggedIn = token != null;
    if (_isLoggedIn) {
      await fetchUserData();
    }
    notifyListeners();
  }

  Future<bool> login(String phone, String password) async {
    try {
      final res = await _api.login(phone, password);
      if (res.statusCode == 200) {
        final token = res.data['data']['token'];
        await _storage.write(key: 'jwt_token', value: token);
        _isLoggedIn = true;
        await fetchUserData();
        notifyListeners();
        return true;
      }
    } catch (e) {
      debugPrint("Login Failed: $e");
    }
    return false;
  }

  Future<bool> register(String phone, String password) async {
    try {
      final res = await _api.register(phone, password);
      if (res.statusCode == 200) {
        final token = res.data['data']['token'];
        await _storage.write(key: 'jwt_token', value: token);
        _isLoggedIn = true;
        await fetchUserData();
        notifyListeners();
        return true;
      }
    } catch (e) {
      debugPrint("Register Failed: $e");
    }
    return false;
  }

  Future<void> logout() async {
    await _storage.delete(key: 'jwt_token');
    _isLoggedIn = false;
    _profile = null;
    notifyListeners();
  }

  Future<void> fetchUserData() async {
    try {
      final profileRes = await _api.getProfile();
      if (profileRes.statusCode == 200) {
        _profile = UserProfile.fromJson(profileRes.data['data']);
      }
      final deliveriesRes = await _api.getDeliveries();
      if (deliveriesRes.statusCode == 200) {
        _deliveries = (deliveriesRes.data['data'] as List)
            .map((e) => DeliveryRecord.fromJson(e))
            .toList();
      }
    } catch (e) {
      debugPrint("Fetch User Data Fails: $e");
    }
  }

  Future<void> loadJobs({String? keyword, String city = '不限'}) async {
    try {
      final res = await _api.getJobs(keyword: keyword, city: city);
      if (res.statusCode == 200) {
        _jobs = (res.data['data'] as List).map((e) => Job.fromJson(e)).toList();
        notifyListeners();
      }
    } catch (e) {
      debugPrint("Fetch Jobs failed: $e");
    }
  }

  Future<void> apply(String jobId) async {
    try {
      final res = await _api.applyJob(jobId);
      if (res.statusCode == 200) {
        await fetchUserData();
      }
    } catch (e) {
      debugPrint("Apply job error: $e");
    }
  }
}

// Routes with Route Guards configuration (GoRouter)
class BossRecruitApp extends StatelessWidget {
  const BossRecruitApp({super.key});

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<AppStateProvider>(context, listen: false);

    final GoRouter router = GoRouter(
      initialLocation: '/',
      redirect: (context, routerState) async {
        final logged = state.isLoggedIn;
        final goingToAuth = routerState.matchedLocation == '/login' ||
            routerState.matchedLocation == '/register';

        if (!logged && !goingToAuth) {
          return '/login'; // Route Guard: Redirect to login if user tries to access internal pages
        }
        if (logged && goingToAuth) {
          return '/';
        }
        return null; // Continue as requested
      },
      routes: [
        GoRoute(
          path: '/',
          builder: (context, _) => const MainNavigationShell(),
        ),
        GoRoute(
          path: '/login',
          builder: (context, _) => const LoginView(),
        ),
        GoRoute(
          path: '/register',
          builder: (context, _) => const RegisterView(),
        ),
        GoRoute(
          path: '/job/:id',
          builder: (context, state) =>
              JobDetailView(jobId: state.pathParameters['id']!),
        ),
      ],
    );

    return MaterialApp.router(
      title: 'Boss Recruit',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        primaryColor: const Color(0xff1e88e5),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xff1e88e5),
          primary: const Color(0xff1e88e5),
        ),
        fontFamily: 'Inter',
      ),
      routerConfig: router,
    );
  }
}

// Bottom tab navigation shell
class MainNavigationShell extends StatefulWidget {
  const MainNavigationShell({super.key});

  @override
  State<MainNavigationShell> createState() => _MainNavigationShellState();
}

class _MainNavigationShellState extends State<MainNavigationShell> {
  int _currentIndex = 0;

  final List<Widget> _tabs = [
    const HomeViewTab(),
    const CollectionsViewTab(),
    const RecordsViewTab(),
    const ProfileViewTab(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(index: _currentIndex, children: _tabs),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        type: BottomNavigationBarType.fixed,
        selectedItemColor: const Color(0xff1e88e5),
        unselectedItemColor: Colors.grey,
        selectedLabelStyle: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold),
        unselectedLabelStyle: const TextStyle(fontSize: 10),
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.flash_on), label: '首页推荐'),
          BottomNavigationBarItem(icon: Icon(Icons.bookmark), label: '我的收藏'),
          BottomNavigationBarItem(icon: Icon(Icons.send), label: '投递记录'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: '个人中心'),
        ],
      ),
    );
  }
}

// Mock Subviews
class LoginView extends StatelessWidget {
  const LoginView({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text("手机号登录", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: () {
                  context.read<AppStateProvider>().login("13800000000", "123456");
                },
                child: const Text("一键登录 (13800000000)"),
              )
            ],
          ),
        ),
      ),
    );
  }
}

class RegisterView extends StatelessWidget {
  const RegisterView({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(body: const Center(child: Text("注册")));
  }
}

class HomeViewTab extends StatelessWidget {
  const HomeViewTab({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("热门推荐")),
      body: const Center(child: Text("主要职位列表")),
    );
  }
}

class CollectionsViewTab extends StatelessWidget {
  const CollectionsViewTab({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(body: const Center(child: Text("收藏夹")));
  }
}

class RecordsViewTab extends StatelessWidget {
  const RecordsViewTab({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(body: const Center(child: Text("投递记录列表")));
  }
}

class ProfileViewTab extends StatelessWidget {
  const ProfileViewTab({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            context.read<AppStateProvider>().logout();
          },
          child: const Text("退出"),
        ),
      ),
    );
  }
}

class JobDetailView extends StatelessWidget {
  final String jobId;
  const JobDetailView({super.key, required this.jobId});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("职位详情")),
      body: Center(child: Text("Job ID: $jobId")),
    );
  }
}
