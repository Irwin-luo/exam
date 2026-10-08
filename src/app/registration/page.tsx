import { RegistrationForm } from "@/features/registration/components/RegistrationForm"
import styles from "./registration.module.css"

/**
 * 渲染报名页面。
 * @returns 报名页 React 节点。
 */
export default function RegistrationPage() {
  return (
    <main className={styles.page}>
      <RegistrationForm />
    </main>
  )
}
