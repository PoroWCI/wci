enum ROLE {
  CLIENT,
  ADMIN,
  FRONTEND_DEVELOPER,
  BACKEND_DEVELOPER
}

export interface Users {
  id: number
  firstname: string
  lastname: string
  email: string
  phone: string
  role: ROLE
  zipcode?: string
  country: string
  address: string
  company: string
}