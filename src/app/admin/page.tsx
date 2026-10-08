"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { getRegistrations } from "@/features/registration/data/registrationStore"
import type { Registration } from "@/features/registration/types"
import { downloadCsv, exportRegistrationsToCsv } from "@/features/registration/utils/exportCsv"
import styles from "./admin.module.css"

/**
 * 渲染管理员报名列表页面。
 * @returns 管理员页面 React 节点。
 */
export default function AdminPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])

  useEffect(() => {
    setRegistrations(getRegistrations())
  }, [])

  /**
   * 导出当前报名数据。
   * @returns 无返回值。
   */
  function handleExport() {
    const csv = exportRegistrationsToCsv(registrations)
    downloadCsv(csv, "ai-open-day-registrations.csv")
  }

  return (
    <main className={styles.page}>
      <section className={styles.toolbar}>
        <div>
          <p className={styles.kicker}>Admin</p>
          <h1>报名数据管理</h1>
        </div>
        <div className={styles.actions}>
          <Link href="/registration">新增报名</Link>
          <button type="button" onClick={handleExport}>
            导出 CSV
          </button>
        </div>
      </section>

      <section className={styles.tableWrap}>
        {registrations.length === 0 ? (
          <p className={styles.empty}>暂无报名数据，请先完成一次报名。</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>姓名</th>
                <th>身份</th>
                <th>手机号</th>
                <th>参加场次</th>
                <th>院系</th>
                <th>邮箱</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.role === "teacher" ? "教师" : "学生"}</td>
                  <td>{item.phone}</td>
                  <td>{item.session}</td>
                  <td>{item.department}</td>
                  <td>{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  )
}
