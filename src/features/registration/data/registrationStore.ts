import type { Registration, RegistrationFormValues } from "../types"

const STORAGE_KEY = "exam_registration_records"
const LAST_REGISTRATION_KEY = "exam_last_registration"

/**
 * 读取本地报名记录。
 * @returns 报名记录数组。
 */
export function getRegistrations(): Registration[] {
  if (typeof window === "undefined") {
    return []
  }

  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return []
  }

  try {
    return JSON.parse(raw) as Registration[]
  } catch {
    return []
  }
}

/**
 * 保存一条报名记录。
 * @param values - 表单字段。
 * @returns 新保存的报名记录。
 */
export function saveRegistration(values: RegistrationFormValues): Registration {
  const next: Registration = {
    ...values,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  }
  const records = [...getRegistrations(), next]
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records))

  // Exam seed bug: success page expects this key, but only some fields are stored.
  window.localStorage.setItem(LAST_REGISTRATION_KEY, JSON.stringify({ session: next.session }))

  return next
}

/**
 * 读取最近一次报名记录摘要。
 * @returns 最近一次报名记录；不存在时返回 null。
 */
export function getLastRegistration(): Pick<Registration, "name" | "session"> | null {
  if (typeof window === "undefined") {
    return null
  }

  const raw = window.localStorage.getItem(LAST_REGISTRATION_KEY)
  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as Pick<Registration, "name" | "session">
  } catch {
    return null
  }
}
