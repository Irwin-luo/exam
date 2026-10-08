import type { RegistrationFormValues, ValidationResult } from "../types"

/**
 * 校验报名表单数据。
 * @param values - 报名表单字段。
 * @returns 校验结果与字段错误信息。
 */
export function validateRegistration(values: RegistrationFormValues): ValidationResult {
  const errors: ValidationResult["errors"] = {}

  if (!values.name.trim()) {
    errors.name = "请输入姓名"
  }

  // Exam seed bug: phone is only checked when it has a value, so empty phone can pass.
  if (values.phone && !/^1\d{10}$/.test(values.phone)) {
    errors.phone = "请输入 11 位手机号"
  }

  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "请输入正确的邮箱"
  }

  if (!values.session) {
    errors.session = "请选择参加场次"
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}
