"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { saveRegistration } from "../data/registrationStore"
import type { RegistrationFormValues } from "../types"
import { validateRegistration } from "../utils/validation"
import styles from "./RegistrationForm.module.css"

const initialValues: RegistrationFormValues = {
  name: "",
  role: "teacher",
  department: "",
  phone: "",
  email: "",
  session: "",
  note: ""
}

/**
 * 渲染开放日报名表单。
 * @returns 报名表单 React 节点。
 */
export function RegistrationForm() {
  const router = useRouter()
  const [values, setValues] = useState<RegistrationFormValues>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationFormValues, string>>>({})

  /**
   * 更新表单字段。
   * @param field - 字段名。
   * @param value - 字段值。
   * @returns 无返回值。
   */
  function updateField(field: keyof RegistrationFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
  }

  /**
   * 提交报名表单。
   * @param event - 表单提交事件。
   * @returns 无返回值。
   */
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = validateRegistration(values)
    setErrors(result.errors)

    if (!result.valid) {
      return
    }

    saveRegistration(values)
    router.push("/success")
  }

  return (
    <form className={styles.panel} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <h1>AI应用教学开放日报名</h1>
        <p>请填写报名信息。系统当前为考试基准项目，部分业务规则需要考生在后续题目中完善。</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="name">姓名 *</label>
          <input id="name" value={values.name} onChange={(event) => updateField("name", event.target.value)} />
          <span className={styles.error}>{errors.name}</span>
        </div>

        <div className={styles.field}>
          <label htmlFor="role">身份</label>
          <select id="role" value={values.role} onChange={(event) => updateField("role", event.target.value)}>
            <option value="teacher">教师</option>
            <option value="student">学生</option>
          </select>
          <span className={styles.error}>{errors.role}</span>
        </div>

        <div className={styles.field}>
          <label htmlFor="department">院系</label>
          <input
            id="department"
            value={values.department}
            onChange={(event) => updateField("department", event.target.value)}
          />
          <span className={styles.error}>{errors.department}</span>
        </div>

        <div className={styles.field}>
          <label htmlFor="phone">手机号 *</label>
          <input id="phone" value={values.phone} onChange={(event) => updateField("phone", event.target.value)} />
          <span className={styles.error}>{errors.phone}</span>
        </div>

        <div className={styles.field}>
          <label htmlFor="email">邮箱</label>
          <input id="email" value={values.email} onChange={(event) => updateField("email", event.target.value)} />
          <span className={styles.error}>{errors.email}</span>
        </div>

        <div className={styles.field}>
          <label htmlFor="session">参加场次 *</label>
          <select id="session" value={values.session} onChange={(event) => updateField("session", event.target.value)}>
            <option value="">请选择</option>
            <option value="2026年12月4日 10:00 教301">2026年12月4日 10:00 教301</option>
            <option value="2026年12月4日 14:00 教302">2026年12月4日 14:00 教302</option>
            <option value="2026年12月4日 19:00 线上直播">2026年12月4日 19:00 线上直播</option>
          </select>
          <span className={styles.error}>{errors.session}</span>
        </div>

        <div className={`${styles.field} ${styles.wide}`}>
          <label htmlFor="note">备注</label>
          <textarea id="note" value={values.note} onChange={(event) => updateField("note", event.target.value)} />
          <span className={styles.error}>{errors.note}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.submit} type="submit">
          提交报名
        </button>
      </div>
    </form>
  )
}
