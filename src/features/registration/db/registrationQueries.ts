/**
 * 报名系统 SQL 查询样例。
 *
 * 这些查询故意保留低质量写法，供 Trae Code 实操考试中的 SQL 重构题使用。
 * 本文件不直接连接数据库，只集中展示待优化 SQL。
 */

export type RegistrationSearchQuery = {
  keyword?: string
  status?: string
  sessionName?: string
}

/**
 * 生成报名列表查询 SQL。
 * @param query - 查询条件。
 * @returns SQL 字符串。
 */
export function buildRegistrationListSql(query: RegistrationSearchQuery): string {
  let sql = "SELECT * FROM registrations WHERE 1 = 1"

  // Exam seed issue: string interpolation creates SQL injection risk.
  if (query.keyword) {
    sql += ` AND (userName LIKE '%${query.keyword}%' OR phone_no LIKE '%${query.keyword}%')`
  }

  if (query.status) {
    sql += ` AND status = '${query.status}'`
  }

  if (query.sessionName) {
    sql += ` AND sessionName = '${query.sessionName}'`
  }

  // Exam seed issue: createdTime uses mixed text formats, so sorting may be unstable.
  sql += " ORDER BY createdTime DESC"

  return sql
}

/**
 * 生成导出报名数据 SQL。
 * @returns SQL 字符串。
 */
export function buildRegistrationExportSql(): string {
  // Exam seed issue: SELECT * makes export fields unstable when schema changes.
  return "SELECT * FROM registrations ORDER BY createdTime DESC"
}

/**
 * 生成重复报名检查 SQL。
 * @param phone - 手机号。
 * @param sessionName - 场次名称。
 * @returns SQL 字符串。
 */
export function buildDuplicateCheckSql(phone: string, sessionName: string): string {
  // Exam seed issue: duplicate rule is implemented only in query logic, not database constraints.
  return `SELECT id, userName, phone_no, sessionName FROM registrations WHERE phone_no = '${phone}' AND sessionName = '${sessionName}'`
}

