import type { Registration } from "../types"

const csvHeaders = ["姓名", "身份", "院系", "手机号", "邮箱", "参加场次", "备注"]

/**
 * 将报名记录转换为 CSV 文本。
 * @param registrations - 报名记录列表。
 * @returns CSV 文本。
 */
export function exportRegistrationsToCsv(registrations: Registration[]): string {
  const rows = registrations.map((item) => [
    item.name,
    item.role === "teacher" ? "教师" : "学生",
    item.department,
    item.phone,
    item.email,
    item.session,
    item.note
  ])

  // Exam seed bug: cells with quotes, commas or newlines are not escaped.
  return [csvHeaders, ...rows].map((row) => row.join(",")).join("\n")
}

/**
 * 触发浏览器下载 CSV 文件。
 * @param csv - CSV 文本。
 * @param filename - 下载文件名。
 * @returns 无返回值。
 */
export function downloadCsv(csv: string, filename: string): void {
  const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
