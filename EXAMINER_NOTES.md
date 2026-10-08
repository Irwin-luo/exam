# 考官说明 · exam-registration-app

> 本文件仅供命题人与阅卷人员使用，不建议发给考生。

## 一、项目定位

`exam-registration-app` 是 Trae Code 实操认证的统一基准项目。项目能运行，但故意保留若干缺陷、重复代码和测试缺口，用于支撑试卷中的编码、重构、调试、测试和审查题。

## 二、对应题目

| 题目 | 项目支撑点 |
|---|---|
| 实操题1 | 可打开项目、配置索引、规则、记忆、斜杠命令 |
| 实操题2 | 可基于报名系统背景编写 PRD、UI 方案和开发计划 |
| 实操题3 | 可扩展报名页、成功页、管理员页 |
| 实操题4 | SQLite 表结构、种子数据和低质量 SQL 查询可用于数据库重构题 |
| 实操题5 | 预置手机号空值、成功页姓名、CSV 转义等问题 |
| 实操题6 | 可查看 Git 变更、生成 commit message、执行发布前校验 |

## 三、预置缺陷

### 1. 手机号为空仍可提交

文件：

```text
src/features/registration/utils/validation.ts
```

当前逻辑只在 `values.phone` 有值时检查格式，未对空手机号进行必填校验。对应实操题5。

预期修复：

- 手机号为空时返回错误；
- 手机号格式错误时返回格式错误；
- 测试覆盖空手机号。

### 2. 成功页无法显示报名人姓名

文件：

```text
src/features/registration/data/registrationStore.ts
src/app/success/page.tsx
```

`saveRegistration` 保存最近一次报名摘要时只写入了 `session`，没有写入 `name`。成功页读取 `name` 时会显示“未读取到姓名”。

预期修复：

- 最近一次报名摘要应包含 `name` 和 `session`；
- 或通过路由参数/状态传递；
- 用“张三”报名后成功页应展示“张三”。

### 3. CSV 特殊字符未转义

文件：

```text
src/features/registration/utils/exportCsv.ts
```

当前 `exportRegistrationsToCsv` 直接 `join(",")`，未处理逗号、换行和双引号。

预期修复：

- 单元格统一转字符串；
- 包含逗号、换行、双引号时用双引号包裹；
- 内部双引号替换为 `""`。

### 4. 可重构点

文件：

```text
src/features/registration/components/RegistrationForm.tsx
src/app/admin/page.tsx
```

可重构方向：

- 抽取报名字段配置；
- 抽取身份、场次选项；
- 抽取类型、常量、校验函数；
- 拆分 `RegistrationField` 子组件；
- 让页面只负责编排。

### 5. 测试缺口

文件：

```text
src/features/registration/__tests__/validation.test.ts
```

已有测试只覆盖了完整表单、姓名为空、手机号格式错误。考生可补充：

- 手机号为空；
- 邮箱格式错误；
- 场次为空；
- 正常数据；
- CSV 特殊字符；
- 成功页摘要。

### 6. SQLite 表结构与查询缺陷

文件：

```text
database/schema.bad.sql
database/seed.sql
src/features/registration/db/registrationQueries.ts
```

预置缺陷：

- `registrations.id` 未声明 `PRIMARY KEY`；
- 姓名、手机号、场次等关键字段缺少 `NOT NULL`；
- `role`、`status`、`sessionName` 使用自由文本，值域不稳定；
- 手机号 + 场次缺少唯一约束，无法从数据库层阻止重复报名；
- 字段命名混乱，混用 `userName`、`phone_no`、`emailAddress`、`createdTime`、`updated_at`；
- 时间字段格式不统一；
- 缺少高频查询索引；
- `registrationQueries.ts` 使用 `SELECT *`；
- 查询条件通过字符串拼接生成，存在 SQL 注入风险；
- 重复报名检查只依赖查询逻辑，没有数据库约束兜底。

建议优化方向：

- 设计 `sessions` 表，将场次拆出；
- 统一字段命名为 snake_case 或项目约定格式；
- 使用 `PRIMARY KEY`、`NOT NULL`、`CHECK`、`UNIQUE` 约束；
- 增加 `idx_registrations_phone`、`idx_registrations_session_id`、`idx_registrations_created_at` 等索引；
- 明确导出字段，避免 `SELECT *`；
- 使用参数化查询；
- 给出数据迁移与脏数据清洗策略。

## 四、建议验收命令

```bash
npm install
npm run lint
npm test
npm run build
npm run dev
```

若阅卷现场网络不可用，可提前在考试机上完成依赖安装或提供 `node_modules` 缓存。

## 五、阅卷提醒

- 不要求所有考生采用完全相同实现路径；
- 只要功能满足题干、测试或截图能证明结果，即可按计分点给分；
- 若考生修复了预置缺陷但引入明显无关大改，可酌情扣分；
- 若考生只提交 AI 生成文本，没有代码和运行证据，不应给功能实现分；
- 若考生发现并修复了本说明以外的合理问题，可在不超过题目总分的前提下计入相关计分点。
