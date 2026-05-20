# ai-tools-hub 项目信息

## 基本信息
- **定位**: AI 工具站（导航 + 在线工具箱）—— 聚合 AI 工具有汇总导航和评测，同时内置多种 AI 驱动的在线生产力工具
- **技术栈**: Next.js (App Router), React, Tailwind CSS, Framer Motion
- **语言**: JavaScript (ES2023+), Node.js
- **架构**: Next.js App Router, 国际化路由 `app/[locale]/`, Standalone 输出

## 价值
- 为中文用户提供 AI 工具的聚合导航与深度评测
- 提供即用即走的在线 AI 工具箱（自媒体文案、职场办公、开发工具等）
- SEO 导向的长文专题增强搜索引擎收录和流量

## 核心文件
| 文件 | 作用 |
|------|------|
| `app/layout.js` | 根布局 |
| `app/page.js` | 根路由 → redirect 到 `/${locale}/tools` |
| `app/api/generate/route.js` | AI 生成 API，流式 SSE 输出 |
| `src/lib/data.js` | 工具分类与详情数据（评测模块） |
| `src/lib/topics.js` | 热门专题/SEO 长文数据 |
| `src/lib/prompts.js` | 系统提示词核心资产（安全！后端专用） |
| `src/lib/usage.js` | AI 工具每日免费使用次数限制 |
| `src/lib/tools-registry.js` | 全部工具元数据注册表 |
| `src/components/TopNav.js` | 顶部导航栏 |
| `src/components/ThemeToggle.js` | 主题切换（深色/亮色） |
| `src/components/CheckinWidget.js` | 每日签到挂件 |

## 关键设计
- **独立运行时 (Standalone 模式)**: `next.config.js` 中 `output: 'standalone'`，适合部署到自有服务器
- **流式 AI 输出**: API 通过 SSE 将 NVIDIA `deepseek-v3.2` 的流式响应返回给前端
- **越狱/泄露防护**: API 端点对用户输入和 AI 回复都做 `JAILBREAK_PATTERNS` 和 `LEAK_PATTERNS` 检测
- **本地化路由**: `app/[locale]/` 结构，支持 `zh`/`en`/`zh-HK`
- **上班签到机制**: 通过 `CheckinWidget` + bonus 机制奖励用户额外使用次数

## 运维
- Dev: `npm run dev`
- Build: `npm run build`
- Start: `npm run start`
- 环境变量:
  - `NVIDIA_API_KEY` — NVIDIA 平台 AI 服务调用密钥
  - `NEXT_PUBLIC_GA_ID` — Google Analytics ID（默认 `G-6PLRJ5Z0Q3`）

## 当前状态
- 项目代码在 `/data/projects/ai-tools-hub/`
- 工具注册表已包含 ~60 个 AI/开发/实用工具
- 已完成页签分类：📱 自媒体/💼 职场办公/🔧 专业工具/💻 开发者工具/🎁 免费粘性工具
- 支持多语言：`zh` (简体中文) / `en` (English) / `zh-HK` (繁体中文)
