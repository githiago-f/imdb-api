declare namespace Express {
  export interface Request {
    user?: import('../domain/entity/Profile').Profile
  }
}
