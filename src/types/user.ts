/** An authenticated member. Kindred auth is username-only: no passwords, no email. */
type User = {
  id: string
  username: string
}

export type { User }
