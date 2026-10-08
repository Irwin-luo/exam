import Link from "next/link"
import styles from "./page.module.css"

/**
 * 渲染系统入口页。
 * @returns 首页 React 节点。
 */
export default function HomePage() {
  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <p className={styles.kicker}>TRAE Code Exam Project</p>
        <h1>AI应用教学开放日报名系统</h1>
        <p className={styles.summary}>
          这是用于 Trae Code 实操认证的基准项目。项目可运行，但保留了若干需求、编码、重构、调试和测试考点。
        </p>
        <div className={styles.actions}>
          <Link href="/registration">进入报名</Link>
          <Link href="/admin">管理员查看</Link>
        </div>
      </section>
    </main>
  )
}
