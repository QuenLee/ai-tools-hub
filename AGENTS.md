# ai-tools-hub — 项目文档四件套

## 项目定位

AI工具站（导航站 + 在线工具箱），聚合 AI 工具资讯、评测、导航，同时内置多种 AI 驱动的在线生产力工具（自媒体文案/职场办公/开发工具等）。

## 关键路径（Code→Build→Deploy）

1. **Code**: Next.js `app/` + `src/` → `next dev`
2. **Build**: `next build` → standalone 输出（`output: 'standalone'`）
3. **Deploy**: Standalone build → 目标平台（Vercel/自有服务器等）

## 核心规则

1. **架构约束**:
   - 使用 Next.js App Router（`app/`），非 Pages Router
   - 国际化路由：`app/[locale]/`，支持 `zh`/`en`/`zh-HK`
   - 数据/工具注册表/提示词均放 `src/lib/`

2. **AI 安全**:
   - `src/lib/prompts.js` 包含系统提示词核心资产（`GUARD_PREFIX`/`GUARD_SUFFIX`），**绝不可暴露到前端**
   - API 端点 `app/api/generate/route.js` 负责流式 SSE 输出，需保持越狱/泄露检测逻辑

3. **使用限制**:
   - AI 工具（apiTool: true）有每日免费次数限制
   - 开发者工具/粘性工具（apiTool: false / unlimited: true）无限免费

4. **环境要求**:
   - `NVIDIA_API_KEY` 必须配置，否则 AI 工具不可用（接口用 NVIDIA `deepseek-v3.2`）
   - `NEXT_PUBLIC_GA_ID` 可选，默认 `G-6PLRJ5Z0Q3`

5. **运行方式**:
   - Dev: `npm run dev`
   - Build: `npm run build`
   - Start: `npm run start`

6. **新增工具流程**:
   - `src/lib/tools-registry.js`: 添加工具元数据
   - `src/lib/usage.js`: 添加使用限制
   - `src/lib/prompts.js`: 添加系统提示词（AI 驱动时）
   - `src/components/tools/`: 添加前端组件
   - 创建/更新对应路由 `app/[locale]/` 下的 pages

## 文件结构速览

```
app/                    # Next.js App Router
├── [locale]/           # 国际化页面路由
│   ├── tools/          # 工具列表页
│   ├── tools/[slug]/   # 工具详情页（含 tool client）
│   ├── faq/            # FAQ 页
│   ├── privacy/        # 隐私政策
│   ├── terms/          # 服务条款
│   └── page.js         # 根页，redirect 到 /zh/tools
├── api/generate/       # AI 生成 API (SSE)
├── layout.js           # 根布局
└── ...
src/
├── components/         # 可复用组件（TopNav, ThemeToggle 等）
├── components/tools/   # 各工具的前端组件
├── lib/                # 核心数据/逻辑库
│   ├── data.js         # 工具分类+详情（评测/介绍类）
│   ├── topics.js       # 热门专题/教程数据
│   ├── prompts.js      # 系统提示词库（安全！）
│   ├── prompts.js      # 工具使用次数限制
│   ├── tool-configs.js # 工具配置
│   ├── tool-details.js # 工具详情表
│   └── tools-registry.js # 全部工具元数据
└── messages/           # 国际化翻译（zh/en/zh-HK）
```

## 运行方式

```bash
cd /data/projects/ai-tools-hub
npm install   # 安装依赖
npm run dev   # 开发模式 http://localhost:3000
npm run build # 生产构建
npm run start # 生产启动
```
