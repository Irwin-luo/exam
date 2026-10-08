-- AI应用教学开放日报名系统 SQLite 种子数据
-- 说明：本文件故意包含重复、空值、格式不统一等脏数据，供 SQL 重构与清洗题使用。

DELETE FROM registrations;

INSERT INTO registrations (
  id,
  userName,
  role,
  dept,
  phone_no,
  emailAddress,
  sessionName,
  session_time,
  note,
  status,
  createdTime,
  updated_at,
  export_label
) VALUES
  (
    'r-001',
    '张三',
    'teacher',
    '计算机学院',
    '13800138000',
    'zhangsan@example.com',
    '上午场 09:00-11:30',
    '2026/09/10 09:00',
    '需要纸质材料',
    'submitted',
    '2026-08-20 09:12:00',
    '2026-08-20T09:12:00',
    '张三-上午场'
  ),
  (
    'r-002',
    '李四',
    '学生',
    '软件学院',
    '13900139000',
    'lisi@example.com',
    '下午场 14:00-16:30',
    '2026-09-10 14:00',
    '班级=软件2301;来源=班主任推荐',
    '已提交',
    '2026/08/20 10:05',
    '2026-08-20T10:05:00',
    '李四-下午场'
  ),
  (
    'r-003',
    '王五',
    'student',
    '计算机学院',
    '',
    'wangwu@example.com',
    '上午场 09:00-11:30',
    '2026-09-10 09:00',
    '',
    'submitted',
    '2026-08-21',
    '',
    '王五-上午场'
  ),
  (
    'r-004',
    '张三',
    'teacher',
    '计算机学院',
    '13800138000',
    'zhangsan@example.com',
    '上午场 09:00-11:30',
    '2026-09-10 09:00',
    '重复报名记录',
    'submitted',
    '2026-08-21 11:30:00',
    '2026-08-21T11:30:00',
    '张三-上午场'
  ),
  (
    'r-005',
    '',
    'guest',
    '继续教育学院',
    'not-a-phone',
    'bad-email',
    '临时增加场次',
    '待定',
    '手机号和邮箱格式错误',
    'draft',
    '08-22-2026',
    '2026-08-22T15:12:00',
    ''
  );
