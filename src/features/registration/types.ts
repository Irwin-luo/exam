export type RegistrationRole = "teacher" | "student"

export type Registration = {
  id: string
  name: string
  role: RegistrationRole
  department: string
  phone: string
  email: string
  session: string
  note: string
  createdAt: string
}

export type RegistrationFormValues = Omit<Registration, "id" | "createdAt">

export type ValidationResult = {
  valid: boolean
  errors: Partial<Record<keyof RegistrationFormValues, string>>
}
