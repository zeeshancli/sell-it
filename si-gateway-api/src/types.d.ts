export {}

declare global {
  interface NodeJS {
    ProcessEnv: {
      JWT_SECRET_KEY: string
      SERVICE_MAP: string
    }
  }
}