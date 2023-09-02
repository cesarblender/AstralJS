export class EnvError extends Error {
  constructor (message: string) {
    super()
    this.name = 'Environment Variable Error'
    this.message = message
  }
}
