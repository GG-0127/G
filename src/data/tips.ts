import { ExamTip, ProcessStep, ExamComparison } from '@/types';

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: '查询职位',
    description: '登录官网下载《招考简章》，按学历、专业、政治面貌等筛选职位',
    icon: 'Search',
  },
  {
    step: 2,
    title: '网上报名',
    description: '填写个人信息、上传照片、选择职位提交申请',
    icon: 'FileText',
  },
  {
    step: 3,
    title: '资格审查',
    description: '提交后1-2天查询审核结果，未通过可改报',
    icon: 'CheckCircle',
  },
  {
    step: 4,
    title: '网上缴费',
    description: '通过审查后完成缴费，逾期视为放弃',
    icon: 'CreditCard',
  },
  {
    step: 5,
    title: '打印准考证',
    description: '笔试前1周登录系统下载打印',
    icon: 'Printer',
  },
  {
    step: 6,
    title: '参加笔试',
    description: '行测(上午9:00-11:00) + 申论(下午14:00-17:00)',
    icon: 'Edit3',
  },
  {
    step: 7,
    title: '资格复审与面试',
    description: '笔试成绩公布后按比例确定面试人选',
    icon: 'Users',
  },
  {
    step: 8,
    title: '体检与考察',
    description: '面试通过后进入体检和考察环节',
    icon: 'Heart',
  },
  {
    step: 9,
    title: '公示与录用',
    description: '拟录用人员名单公示后办理录用手续',
    icon: 'Award',
  },
];

export const examComparison: ExamComparison[] = [
  {
    category: '组织单位',
    guokao: '国家公务员局',
    shengkao: '各省公务员主管部门',
  },
  {
    category: '招录单位',
    guokao: '中央机关及直属机构(税务、海关、海事等)',
    shengkao: '省/市/县/乡镇级地方政府机关',
  },
  {
    category: '考试时间',
    guokao: '每年11月底笔试，一年1次',
    shengkao: '联考3-4月，部分省份单独招考',
  },
  {
    category: '户籍限制',
    guokao: '绝大多数岗位不限户籍',
    shengkao: '部分省份有户籍限制',
  },
  {
    category: '平均竞争比',
    guokao: '约98:1',
    shengkao: '约20-50:1',
  },
  {
    category: '行测题量',
    guokao: '135-140题，120分钟',
    shengkao: '约120题，120分钟',
  },
  {
    category: '薪资待遇',
    guokao: '较高，福利完善',
    shengkao: '因地区差异大',
  },
  {
    category: '发展空间',
    guokao: '平台高，晋升周期长',
    shengkao: '晋升相对灵活',
  },
  {
    category: '适合人群',
    guokao: '想进中央部委、去大城市、专业对口的考生',
    shengkao: '想留家乡、求稳上岸、冷门专业的考生',
  },
];

export const examTips: ExamTip[] = [
  {
    id: 'registration-time',
    category: '报名须知',
    title: '报名时间',
    content: '国考10月中旬，省考联考年初，注意官网公告',
    icon: 'Calendar',
  },
  {
    id: 'age-condition',
    category: '报名须知',
    title: '年龄条件',
    content: '18-38周岁，应届硕博可放宽至43周岁',
    icon: 'User',
  },
  {
    id: 'major-match',
    category: '报名须知',
    title: '专业匹配',
    content: '严格按专业目录对照，冷门专业关注"三不限"岗位',
    icon: 'BookOpen',
  },
  {
    id: 'xingce-order',
    category: '笔试策略',
    title: '行测做题顺序',
    content: '资料分析→判断推理→言语理解→数量关系→常识判断（优先拿高分模块）',
    icon: 'ListOrdered',
  },
  {
    id: 'time-management',
    category: '笔试策略',
    title: '时间管理',
    content: '行测120分钟，平均每题不到1分钟，遇到难题果断跳过',
    icon: 'Clock',
  },
  {
    id: 'shenlun-tips',
    category: '笔试策略',
    title: '申论要点',
    content: '字迹工整、分条清晰，答案90%来自材料，少自创内容',
    icon: 'PenTool',
  },
  {
    id: 'interview-format',
    category: '面试技巧',
    title: '面试形式',
    content: '国考多采用结构化面试，省考可能有无领导小组讨论',
    icon: 'MessageSquare',
  },
  {
    id: 'interview-prep',
    category: '面试技巧',
    title: '面试准备',
    content: '关注时政热点，练习表达逻辑，模拟真实场景',
    icon: 'Mic',
  },
  {
    id: 'interview-materials',
    category: '面试技巧',
    title: '面试材料',
    content: '需准备身份证、报名推荐表、同意报考证明等',
    icon: 'FileCheck',
  },
  {
    id: 'restriction-strategy',
    category: '选岗策略',
    title: '限制条件',
    content: '限制条件越多竞争越小，"三不限"岗位是"万人坑"',
    icon: 'Filter',
  },
  {
    id: 'fresh-grad-advantage',
    category: '选岗策略',
    title: '应届优势',
    content: '国考市(地)级及以下主要招应届生，务必珍惜应届身份',
    icon: 'GraduationCap',
  },
  {
    id: 'dual-prep',
    category: '选岗策略',
    title: '双线备考',
    content: '国考和省考时间不冲突，同时备考增加上岸机会',
    icon: 'GitBranch',
  },
  {
    id: 'remote-caution',
    category: '避坑指南',
    title: '异地慎重',
    content: '异地基层岗位慎重考虑，尤其是偏远地区，最低服务年限5年',
    icon: 'MapPin',
  },
  {
    id: 'multi-channel',
    category: '避坑指南',
    title: '多渠道',
    content: '除国考省考，还有选调生、人才引进等渠道',
    icon: 'Layers',
  },
  {
    id: 'no-naked-exam',
    category: '避坑指南',
    title: '不要裸考',
    content: '公务员考试竞争激烈，系统备考至少需要3-6个月',
    icon: 'AlertTriangle',
  },
];