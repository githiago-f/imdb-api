declare namespace Express {
  export interface Request {
    user?: import('../domain/entity/Profiles').Profile
  }
}
