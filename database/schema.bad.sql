-- AI应用教学开放日报名系统 SQLite 初始表结构
-- 说明：本文件用于 Trae Code 实操考试，表结构故意保留多处设计缺陷，供考生识别、重构和优化。

DROP TABLE IF EXISTS registrations;

CREATE TABLE registrations (
  id TEXT,
  userName TEXT,
  role TEXT,
  dept TEXT,
  phone_no TEXT,
  emailAddress TEXT,
  sessionName TEXT,
  session_time TEXT,
  note TEXT,
  status TEXT,
  createdTime TEXT,
  updated_at TEXT,
  export_label TEXT
);

-- 已知缺陷提示：
-- 1. 主键没有声明 PRIMARY KEY。
-- 2. 姓名、手机号、场次等必填字段没有 NOT NULL。
-- 3. role、status、sessionName 都是自由文本，缺少枚举或关联表约束。
-- 4. phone_no 和 sessionName 没有唯一约束，无法阻止同一手机号重复报名同一场次。
-- 5. 字段命名混杂 userName / phone_no / emailAddress / createdTime / updated_at。
-- 6. 时间使用 TEXT 且格式不统一，后续排序与范围筛选不稳定。
-- 7. note 字段混入结构化信息，不利于统计。
-- 8. 缺少按手机号、场次、状态、创建时间查询所需的索引。
