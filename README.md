# AI应用教学开放日报名系统 · 考试基准项目

这是 Trae Code 实操认证的统一考试基准项目。考生需要在此项目基础上完成试卷中的需求分析、编码实现、重构、调试、测试、审查和交付准备任务。

## 技术栈

- Next.js App Router
- React
- TypeScript
- CSS Modules
- Vitest
- localStorage Mock 数据

## 本地运行

```bash
npm install
npm run dev
```

浏览器打开：

```text
http://localhost:3000
```

## 常用命令

```bash
npm run dev
npm run lint
npm test
npm run build
```

## 页面说明

| 路径 | 说明 |
|---|---|
| `/` | 项目入口页 |
| `/registration` | 报名信息填写页 |
| `/success` | 报名成功页 |
| `/admin` | 管理员报名列表与 CSV 导出页 |

## SQLite 素材说明

项目包含一组 SQLite 考试素材：

```text
database/schema.bad.sql
database/seed.sql
src/features/registration/db/registrationQueries.ts
```

这些文件用于 SQL 表结构分析、查询优化和数据访问层重构练习。初始设计并不完善，考试时请按题目要求识别问题并给出优化方案。

## 考生答题建议

每道题建议提交：

1. 使用的 Trae Code 能力；
2. 关键提示词；
3. 改动文件路径；
4. 核心实现说明；
5. 测试或运行验证截图；
6. 是否存在遗留问题。

## 答题顺序提示

请按试卷题号顺序完成。第 4 题只需要阅读 SQL 文件并提交分析与优化方案，不要实际改造项目代码；第 5 题需要基于项目中的预置缺陷完成复现、修复、测试和审查。

## 注意事项

- 本项目是考试用初始代码，不是完整生产系统。
- 请不要删除题目无关文件。
- 请优先小范围修改，避免无关重构。
- 涉及真实个人信息时请使用模拟数据。
- 所有改动都应能通过运行或测试验证。
