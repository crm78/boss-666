import { Job, UserProfile, DeliveryRecord } from './types';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: "张小明",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
  expectJob: "高级产品经理",
  city: "北京",
  salaryExpectation: "20k-30k",
  educationList: [
    {
      id: "1",
      school: "清华大学",
      major: "计算机科学与技术",
      degree: "本科",
      startYear: "2016",
      endYear: "2020"
    }
  ],
  workList: [
    {
      id: "1",
      company: "腾讯科技",
      role: "高级产品经理想象",
      description: "负责微信支付核心业务系统的架构设计与性能优化，主导双十一期间高并发场景下的容量规划。",
      startDate: "2020.07",
      endDate: "至今"
    }
  ]
};

export const MOCK_JOBS: Job[] = [
  {
    id: "job-1",
    title: "高级产品经理",
    company: "字节跳动",
    companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=100",
    salary: "25-45K·14薪",
    salaryMin: 25,
    salaryMax: 45,
    experience: "5-10年",
    education: "本科及以上",
    tags: ["五险一金", "年底双薪", "大牛带队"],
    city: "北京",
    district: "朝阳区",
    recruiterName: "李经理",
    recruiterTitle: "招聘者",
    recruiterAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
    companyDetail: "D轮及以上 · 10000人以上 · 互联网/AI",
    jobDuties: [
      "负责招聘产品的核心流程设计与优化，提升求职者与招聘方的撮合效率；",
      "通过数据驱动策略，制定产品发展规划，并落地跨部门协同项目；",
      "深入调研行业趋势，挖掘AI在人力资源领域的应用场景，并进行方案验证。"
    ],
    requirements: [
      "5年以上互联网产品经验，有招聘、撮合或社交类产品背景优先；",
      "具备极强的数据敏感度及逻辑分析能力，能够从复杂业务中抽象核心逻辑；",
      "良好的沟通能力与抗压能力，能适应高强度、快速迭代的互联网环境。"
    ],
    workHours: "周末双休",
    locationDetails: "北京市朝阳区北三环西路"
  },
  {
    id: "job-2",
    title: "资深前端开发",
    company: "蚂蚁集团",
    companyLogo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=100",
    salary: "30k-50k",
    salaryMin: 30,
    salaryMax: 50,
    experience: "3-5年",
    education: "硕士",
    tags: ["股票期权", "餐补", "技术氛围浓"],
    city: "杭州",
    district: "西湖区",
    recruiterName: "韩老师",
    recruiterTitle: "前端专家",
    recruiterAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    companyDetail: "已上市 · 10000人以上 · 金融科技",
    jobDuties: [
      "负责基础平台及中后台系统的技术方案落地和性能调优；",
      "推动前端工程化体系建设，实现高效协作及组件库沉淀；",
      "与产品、UI及后端开发通力配合，实现卓越流畅的用户交互。"
    ],
    requirements: [
      "3-5年及以上高质量前端研发经验，精通React等主流技术栈；",
      "熟悉前端构建化工具（Vite、Webpack）及现代CSS规范（Tailwind）；",
      "拥有良好的团队协作能力，注重研发质量与代码规范。"
    ],
    workHours: "双休",
    locationDetails: "浙江省杭州市西湖区蚂蚁Z空间"
  },
  {
    id: "job-3",
    title: "视觉设计师",
    company: "小红书",
    companyLogo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=100",
    salary: "15k-25k",
    salaryMin: 15,
    salaryMax: 25,
    experience: "1-3年",
    education: "本科",
    tags: ["下午茶", "弹性工作", "帅哥美女多"],
    city: "上海",
    district: "黄浦区",
    recruiterName: "王女士",
    recruiterTitle: "设计招聘BP",
    recruiterAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    companyDetail: "D轮及以上 · 1000-9999人 · 潮流社区",
    jobDuties: [
      "负责小红书核心产品页面的精细化视觉表现与广告KV主视觉研究；",
      "协同UI交互团队输出具备视觉穿透力的设计物料，配合活动运营转化。"
    ],
    requirements: [
      "1-3年移动APP界面的视觉设计经验，极佳的视觉审美品位；",
      "熟练掌握Figma, C4D等次世代设计及3D建模渲染软件。"
    ],
    workHours: "周末双休",
    locationDetails: "上海市黄浦区马当路SOHO"
  },
  {
    id: "job-4",
    title: "高级交互设计师",
    company: "腾讯科技",
    companyLogo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=100",
    salary: "35k-50k",
    salaryMin: 35,
    salaryMax: 50,
    experience: "5-10年",
    education: "本科",
    tags: ["十五薪", "交通补贴", "公积金足额"],
    city: "深圳",
    district: "南山区",
    recruiterName: "林先生",
    recruiterTitle: "交互招聘负责人",
    recruiterAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
    companyDetail: "自建大楼 · 10000人以上 · 互联网航母",
    jobDuties: [
      "主导社交及产业互联网方向核心链路交互体验设计；",
      "输出高质量的原型、业务流程图和交互架构规范文档。"
    ],
    requirements: [
      "5年以上中大型产品端设计履历，系统化的方法论支撑；",
      "擅长复杂B端或移动端交易流程简化，高强度的抗压力。"
    ],
    workHours: "双休",
    locationDetails: "深圳市南山区腾讯滨海大厦"
  },
  {
    id: "job-5",
    title: "产品经理 (搜索)",
    company: "阿里巴巴",
    companyLogo: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=100",
    salary: "30k-60k",
    salaryMin: 30,
    salaryMax: 60,
    experience: "5-10年",
    education: "硕士",
    tags: ["大厂资源", "技术重镇", "核心BU"],
    city: "杭州",
    district: "余杭区",
    recruiterName: "刘总监",
    recruiterTitle: "搜索事业部负责人",
    recruiterAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    companyDetail: "电商航母 · 10000人以上 · 知名巨头",
    jobDuties: [
      "负责天猫/淘宝全局电商内容精准搜索与商品分流撮合；",
      "基于实时热点数据及动态召回模型制定商业流量分配策略。"
    ],
    requirements: [
      "5年以上大流量推荐或搜索排序产品经验；",
      "精通AB测试策略，具备强大的跨部门沟通和抗压能力。"
    ],
    workHours: "周末双休",
    locationDetails: "杭州市余杭区阿里巴巴西溪园区"
  },
  {
    id: "job-6",
    title: "AI算法专家",
    company: "顺丰科技",
    companyLogo: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=80&w=100",
    salary: "40k-70k",
    salaryMin: 40,
    salaryMax: 70,
    experience: "3-5年",
    education: "硕士",
    tags: ["物流黑科技", "算法前沿", "弹性管理"],
    city: "深圳",
    district: "南山区",
    recruiterName: "周部长",
    recruiterTitle: "智慧供应链负责人",
    recruiterAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    companyDetail: "顺丰上市 · 5000人以上 · 物流高精尖",
    jobDuties: [
      "主导无人车配送调度和动态规划算法的高可靠度模型优化；",
      "搭建百亿级智慧路网时空计算底座以及包裹全局路由算法体系。"
    ],
    requirements: [
      "计算机/数学等硕士学位，3年以上CV、NLP或时空建模研究底蕴；",
      "精通Python/C++，熟悉深度学习主流架构平台。"
    ],
    workHours: "双休",
    locationDetails: "深圳市南山区顺丰科技总部大厦"
  }
];

export const INITIAL_DELIVERY_RECORDS: DeliveryRecord[] = [
  {
    id: "rec-1",
    jobId: "job-4",
    jobTitle: "高级交互设计师",
    company: "腾讯科技",
    companyLogo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=100",
    city: "深圳",
    status: "邀请面试",
    appliedDate: "2026-05-20"
  },
  {
    id: "rec-2",
    jobId: "job-5",
    jobTitle: "产品经理 (搜索)",
    company: "阿里巴巴",
    companyLogo: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=100",
    city: "杭州",
    status: "已查看",
    appliedDate: "2026-05-18"
  },
  {
    id: "rec-3",
    jobId: "job-6",
    jobTitle: "AI算法专家",
    company: "顺丰科技",
    companyLogo: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=80&w=100",
    city: "深圳",
    status: "不合适",
    appliedDate: "2026-05-15"
  }
];
