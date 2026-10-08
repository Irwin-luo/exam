# AI应用教学开放日报名系统 · 项目说明文档

## 1. 项目基本信息

| 项目 | 内容 |
|---|---|
| 项目名称 | AI应用教学开放日报名系统（exam-registration-app） |
| 当前版本 | v0.1.0 |
| 创建日期 | 2026-10-08 |
| 项目类型 | Web 应用（前后端一体，Next.js 全栈框架） |
| 适用场景 | 职业院校"AI应用教学开放日"活动的线上报名与报名数据管理 |
| 开发方式 | 基于 Trae Code（Agentic Coding 工具）的 AI 辅助开发 |
| 许可证 | 仅供教学与认证考试使用，未设置开源许可证 |

## 2. 项目概述

本系统面向某职业院校"AI 应用教学开放日"活动，为教师和学生提供线上报名入口，并为管理员提供报名数据的查看与导出能力。

主要功能与用途：

- **在线报名**：报名人填写姓名、身份（教师/学生）、院系、手机号、邮箱、参加场次与备注，系统校验通过后保存报名记录；
- **报名反馈**：提交成功后跳转成功页，展示本次报名的姓名与场次摘要；
- **数据管理**：管理员可查看全部报名列表，并将报名数据导出为 CSV 文件（带 BOM，Excel 可直接打开不乱码）；
- **教学与考试用途**：本项目同时是 Trae Code 实操认证的基准项目，代码中刻意保留部分需求缺口、待重构点与测试缺口，供考生完成需求分析、编码、重构、调试、测试与交付练习。

数据层说明：当前版本为无后端的演示形态，报名数据持久化在浏览器 `localStorage` 中（Mock 数据），同时附带一组 SQLite 素材用于数据库设计分析与重构练习。

## 3. 核心功能模块说明

### 3.1 页面模块（Next.js App Router，`src/app/`）

| 路由 | 文件 | 功能说明 |
|---|---|---|
| `/` | `src/app/page.tsx` | 系统入口页（Hero 区），提供"进入报名"与"管理员查看"两个导航入口 |
| `/registration` | `src/app/registration/page.tsx` | 报名信息填写页，承载核心业务组件 `RegistrationForm` |
| `/success` | `src/app/success/page.tsx` | 报名成功页，客户端组件；挂载后从本地存储读取最近一次报名摘要，展示姓名与场次 |
| `/admin` | `src/app/admin/page.tsx` | 管理员页面，客户端组件；读取全部报名记录渲染表格，支持一键导出 CSV |
| 根布局 | `src/app/layout.tsx` | 全局 HTML 结构与站点元信息（`lang="zh-CN"`、页面标题与描述） |

### 3.2 报名业务模块（`src/features/registration/`）

按功能域分层组织，是系统的核心业务代码：

**① 表单组件 `components/RegistrationForm.tsx`**

- 受控表单实现，包含 7 个字段：姓名（必填）、身份（下拉：教师/学生，默认教师）、院系、手机号（必填）、邮箱、参加场次（必填，3 个可选场次）、备注；
- 提交流程：`preventDefault` → 调用 `validateRegistration` 校验 → 校验失败就地展示字段级错误信息 → 校验通过调用 `saveRegistration` 持久化 → 路由跳转 `/success`。

**② 数据存储 `data/registrationStore.ts`**

- 基于 `localStorage` 的 Mock 数据层，存储键：`exam_registration_records`（报名记录数组）、`exam_last_registration`（最近一次报名摘要）；
- `getRegistrations()`：读取并 JSON 解析报名列表，服务端渲染环境或解析失败时安全返回空数组；
- `saveRegistration()`：为记录生成 `crypto.randomUUID()` 主键与 ISO 格式 `createdAt` 时间戳后追加保存；
- `getLastRegistration()`：读取最近一次报名摘要，供成功页展示。

**③ 表单校验 `utils/validation.ts`**

- `validateRegistration(values)` 返回 `{ valid, errors }` 结构，按字段给出中文错误提示；
- 现有规则：姓名非空、手机号有值时需匹配 `/^1\d{10}$/`（11 位、1 开头）、邮箱有值时校验基本格式、场次必选；
- 注意：手机号空值目前不报错（基准项目预留的需求缺口，待后续版本补全必填校验）。

**④ CSV 导出 `utils/exportCsv.ts`**

- `exportRegistrationsToCsv()`：将报名记录转换为中文表头的 CSV 文本（姓名、身份、院系、手机号、邮箱、参加场次、备注）；
- `downloadCsv()`：使用 Blob + 隐藏 `<a>` 标签触发浏览器下载，文件名 `ai-open-day-registrations.csv`，写入 UTF-8 BOM（`\ufeff`）保证 Excel 打开中文不乱码；
- 注意：当前单元格未对逗号、换行、双引号做转义处理（预留的待修复点）。

**⑤ 类型定义 `types.ts`**

- `Registration`：报名记录完整类型（含 `id`、`createdAt`）；
- `RegistrationRole`：身份枚举 `"teacher" | "student"`；
- `RegistrationFormValues`：表单值类型（`Omit<Registration, "id" | "createdAt">`）；
- `ValidationResult`：校验结果类型。

**⑥ 数据访问层素材 `db/registrationQueries.ts`**

- 提供 3 个 SQL 生成函数（列表查询、导出查询、重复报名检查），集中展示待优化的低质量写法：`SELECT *`、字符串拼接 SQL（存在注入风险）、仅靠查询逻辑而非数据库约束防重复，供数据库重构练习使用，不直接连接数据库。

### 3.3 数据库素材（`database/`）

| 文件 | 说明 |
|---|---|
| `schema.bad.sql` | SQLite 初始表结构，故意保留设计缺陷：无主键、必填字段缺 `NOT NULL`、`role`/`status`/`sessionName` 为自由文本、`phone_no + sessionName` 无唯一约束、字段命名混乱（`userName`/`phone_no`/`emailAddress`/`createdTime`/`updated_at` 混用）、时间格式不统一、缺少索引 |
| `seed.sql` | 种子数据，包含重复报名、空手机号、非法邮箱、状态值不统一等脏数据，用于数据清洗与迁移练习 |

### 3.4 测试模块（`src/features/registration/__tests__/`）

- 使用 Vitest 编写单元测试，现有 `validation.test.ts` 覆盖 3 个用例：完整表单校验通过、姓名为空报错、手机号格式错误报错；
- 待补充用例：手机号为空、邮箱格式错误、场次为空、CSV 特殊字符转义、成功页摘要读取等。

### 3.5 Trae Code 工程配置（`.trae/`）

| 文件 | 说明 |
|---|---|
| `.trae/rules/project_rules.md` | 项目级 AI 规则：模块化、保留测试、避免无关改动 |
| `.trae/commands/delivery-note.md` | 自定义斜杠命令 `/delivery-note`，一键生成结构化《开发交付说明》 |

## 4. 技术栈选型

| 层次 | 技术 | 版本 | 选型说明 |
|---|---|---|---|
| 前端框架 | React | 18.3.1 | 成熟稳定的组件化方案，生态完善 |
| 全栈框架 | Next.js（App Router） | 14.2.35 | 文件系统路由、内置构建与优化工具，前后端一体 |
| 开发语言 | TypeScript | 5.5.4 | 静态类型约束，提升可维护性与重构安全性 |
| 样式方案 | CSS Modules | — | 样式按组件隔离、无全局污染，零额外运行时依赖 |
| 数据层 | localStorage Mock | — | 免后端依赖，开箱即用，适合教学与考试场景 |
| 数据库素材 | SQLite（SQL 脚本） | — | 仅提供建表与种子数据脚本，用于 SQL 分析与重构练习，不强制本地运行 |
| 单元测试 | Vitest | 2.0.5 | 与 Vite/Next 生态契合，启动快、API 与 Jest 兼容 |
| 代码检查 | ESLint（eslint-config-next） | 8.57.0 | 官方 Next.js 规则集，统一代码风格 |
| 运行环境 | Node.js | ≥ 18.17（已在 v24.19 验证） | Next.js 14 最低要求 |

## 5. 安装与配置指南

### 5.1 环境要求

- Node.js ≥ 18.17（推荐 LTS 版本；本项目已在 Node v24.19.0 环境验证通过）
- npm ≥ 9（随 Node.js 附带）
- 现代浏览器（Chrome / Edge / Firefox，需支持 `localStorage`）
- 可选：SQLite CLI（仅在需要本地验证 `database/` 下 SQL 脚本时使用）

### 5.2 安装步骤

```bash
# 1. 克隆或下载项目代码后进入项目根目录
cd exam-registration-app

# 2. 安装依赖
npm install
```

### 5.3 本地运行

```bash
# 启动开发服务器（默认 http://localhost:3000）
npm run dev

# 生产构建
npm run build

# 启动生产服务器
npm start
```

### 5.4 常用命令

| 命令 | 说明 |
|---|---|
| `npm run dev` | 启动开发服务器（热更新） |
| `npm run build` | 生产环境构建 |
| `npm run lint` | 运行 ESLint 代码检查 |
| `npm test` | 运行 Vitest 单元测试（单次执行） |
| `npm run test:watch` | 以监听模式运行测试 |

### 5.5 配置说明

- **无环境变量**：项目当前不依赖任何环境变量或外部服务，安装依赖后即可运行；
- **数据存储位置**：报名数据保存在浏览器 `localStorage`（键 `exam_registration_records`、`exam_last_registration`），清除浏览器站点数据即可重置；同一浏览器的数据不会跨浏览器同步；
- **AI 开发配置**：`.trae/rules/` 下的项目规则会在 Trae Code 对话中自动生效；`.trae/commands/` 下的斜杠命令在对话框输入 `/` 调用。

## 6. 使用说明

### 6.1 基本操作流程

```text
打开首页 → 进入报名页 → 填写并提交报名表单 → 成功页查看报名摘要 → 管理员页查看列表 / 导出 CSV
```

### 6.2 操作步骤示例

1. **进入系统**：浏览器访问 `http://localhost:3000`，在首页点击"进入报名"；
2. **填写报名表单**（`/registration`）：
   - 填写姓名（如：张三）、选择身份（教师/学生）、填写院系；
   - 填写手机号（11 位、1 开头，如：13800138000）、邮箱（选填）；
   - 选择参加场次（三个场次任选其一，如：2026年12月4日 10:00 教301）；
   - 按需填写备注，点击"提交报名"；
   - 字段校验不通过时，对应字段下方会显示中文错误提示；
3. **查看报名结果**（`/success`）：提交成功后自动跳转，页面展示本次报名的姓名与场次摘要；可点击"继续报名"再次报名，或进入"查看报名列表"；
4. **管理报名数据**（`/admin`）：
   - 页面以表格展示全部报名记录（姓名、身份、手机号、场次、院系、邮箱）；
   - 点击"导出 CSV"下载 `ai-open-day-registrations.csv`，可用 Excel/WPS 直接打开；
   - 列表为空时页面提示"暂无报名数据，请先完成一次报名"。

### 6.3 演示数据建议

涉及真实个人信息时请使用模拟数据（如：张三/李四、13800138000 等），不要输入真实手机号与邮箱。

## 7. 版本历史记录

| 版本 | 日期 | 更新内容 |
|---|---|---|
| v0.1.0 | 2026-10-08 | 首个基准版本发布：包含首页、报名页、成功页、管理员页 4 个页面；报名表单与基础校验、localStorage 数据存储、CSV 导出；Vitest 单元测试 3 例；附带 SQLite 表结构与种子数据素材；新增 Trae Code 项目规则与 `/delivery-note` 斜杠命令 |

> 已知待完善项（预留考点，将在后续版本迭代）：手机号空值必填校验、CSV 特殊字符（逗号/换行/双引号）转义、成功页姓名摘要显示、`RegistrationForm` 与 `admin` 页面的模块化重构、测试用例补全、SQLite 表结构约束与索引优化、SQL 参数化查询改造。

## 8. 贡献指南

欢迎参与本项目开发与完善，请遵循以下流程与约定：

### 8.1 开发环境准备

1. Fork 仓库或创建个人开发分支；
2. 按"第 5 节 安装与配置指南"完成依赖安装与本地运行；
3. 熟悉项目结构与 `.trae/rules/project_rules.md` 中的项目规则。

### 8.2 开发流程

```bash
# 1. 从主分支拉出功能分支，命名建议：feat/xxx、fix/xxx、refactor/xxx
git checkout -b feat/phone-required-validation

# 2. 开发并自测，确保以下命令全部通过
npm run lint
npm test
npm run build

# 3. 提交代码（建议遵循 Conventional Commits 规范）
git commit -m "feat(validation): 手机号为空时增加必填校验"

# 4. 推送分支并发起 Pull Request，等待代码审查后合并
```

### 8.3 代码约定

- **模块化**：报名相关逻辑统一放在 `src/features/registration/` 下分层组织（components / data / utils / db / types），页面只负责编排，业务逻辑下沉到 feature 模块；
- **保留测试**：不得删除或弱化已有测试；修改功能必须同步更新或补充测试，保证 `npm test` 始终通过；
- **最小改动**：只修改与当前任务直接相关的文件，不做无关重构、格式化或依赖升级；
- **风格一致**：遵循项目现有代码风格（函数注释使用 JSDoc、中文注释）与 ESLint 规则；
- **数据安全**：涉及个人信息一律使用模拟数据，禁止提交真实个人信息与密钥。

### 8.4 提交信息规范

采用 Conventional Commits 格式：`<type>(<scope>): <subject>`

| type | 用途 |
|---|---|
| `feat` | 新功能 |
| `fix` | 缺陷修复 |
| `refactor` | 重构（不改变外部行为） |
| `test` | 测试补充或修改 |
| `docs` | 文档更新 |
| `chore` | 构建、配置等杂项 |

### 8.5 问题反馈

提交 Issue 时请附上：复现步骤、期望结果与实际结果、运行环境（Node 版本、浏览器）、相关截图或控制台报错信息。
