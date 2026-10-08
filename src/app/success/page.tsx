"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { getLastRegistration } from "@/features/registration/data/registrationStore"
import styles from "./success.module.css"

type LastRegistration = {
  name?: string
  session?: string
}

/**
 * 渲染报名成功页面。
 * @returns 成功页 React 节点。
 */
export default function SuccessPage() {
  const [lastRegistration, setLastRegistration] = useState<LastRegistration | null>(null)

  useEffect(() => {
    setLastRegistration(getLastRegistration())
  }, [])

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.kicker}>报名已提交</p>
        <h1>欢迎参加 AI应用教学开放日</h1>
        <dl className={styles.summary}>
          <div>
            <dt>姓名</dt>
            <dd>{lastRegistration?.name || "未读取到姓名"}</dd>
          </div>
          <div>
            <dt>参加场次</dt>
            <dd>{lastRegistration?.session || "未读取到场次"}</dd>
          </div>
        </dl>
        <div className={styles.actions}>
          <Link href="/registration">继续报名</Link>
          <Link href="/admin">查看报名列表</Link>
        </div>
      </section>
    </main>
  )
}
