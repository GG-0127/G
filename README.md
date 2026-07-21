# 考公助手

一站式公务员考试信息服务平台，整合知识题库、备考注意事项、地区竞争分析和岗位推荐四大核心模块，帮助考生高效决策、精准备考。

## 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite 6
- **样式方案**：Tailwind CSS 3
- **路由**：React Router v6
- **动画**：Framer Motion
- **图标**：Lucide React
- **状态管理**：Zustand

## 功能模块

| 模块 | 路由 | 说明 |
|------|------|------|
| 首页 | `/` | 考试倒计时、四大模块入口、数据统计 |
| 知识题库 | `/question-bank` | 行测 6 模块 + 申论 5 模块，130 道题目，即时判分与解析 |
| 注意事项 | `/tips` | 9 步报考流程、国考 vs 省考对比、15 条备考策略 |
| 地区推荐 | `/region` | 31 省市 4 大难度梯队、搜索筛选、省份详情弹窗 |
| 岗位推荐 | `/position` | 5 维条件筛选、智能匹配评分、10 类岗位推荐 |

## 数据规模

- **题库**：11 个模块、26 个知识点、130 道题目（含详细解析）
- **地区**：31 个省市完整数据（竞争比、进面分、难度梯队、薪资范围）
- **岗位**：10 类岗位推荐（国考 / 省考 / 选调生全覆盖）
- **攻略**：9 步报考流程、9 维国省考对比、15 条备考贴士

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview

# TypeScript 类型检查
npm run check
```

## 项目结构

```
src/
├── components/          # 共享组件
│   ├── Layout/          # 导航栏、页脚
│   ├── Card.tsx         # 通用卡片
│   ├── Badge.tsx        # 标签/徽章
│   └── Modal.tsx        # 弹窗
├── pages/               # 页面组件
│   ├── HomePage.tsx     # 首页
│   ├── QuestionBankPage.tsx  # 知识题库
│   ├── TipsPage.tsx     # 注意事项
│   ├── RegionPage.tsx   # 地区推荐
│   └── PositionPage.tsx # 岗位推荐
├── data/                # Mock 数据
│   ├── questionBank.ts  # 题库数据
│   ├── regions.ts       # 地区数据
│   ├── positions.ts     # 岗位数据
│   └── tips.ts          # 攻略数据
├── types/               # TypeScript 类型定义
├── hooks/               # 自定义 Hooks
├── App.tsx              # 路由配置
├── main.tsx             # 入口文件
└── index.css            # 全局样式
```

## 数据来源

所有数据来源于公开的官方考试大纲、历年招录公告及权威公考机构分析，以静态 Mock 数据形式内嵌于前端项目中。

## License

MIT
