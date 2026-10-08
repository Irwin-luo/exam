import { describe, expect, it } from "vitest"
import type { RegistrationFormValues } from "../types"
import { validateRegistration } from "../utils/validation"

const validForm: RegistrationFormValues = {
  name: "张三",
  role: "teacher",
  department: "计算机学院",
  phone: "13800138000",
  email: "zhangsan@example.com",
  session: "2026年12月4日 10:00 教301",
  note: ""
}

describe("validateRegistration", () => {
  it("returns valid result for complete form", () => {
    expect(validateRegistration(validForm)).toEqual({ valid: true, errors: {} })
  })

  it("requires participant name", () => {
    const result = validateRegistration({ ...validForm, name: "" })

    expect(result.valid).toBe(false)
    expect(result.errors.name).toBe("请输入姓名")
  })

  it("rejects invalid phone format when phone is provided", () => {
    const result = validateRegistration({ ...validForm, phone: "123" })

    expect(result.valid).toBe(false)
    expect(result.errors.phone).toBe("请输入 11 位手机号")
  })
})
