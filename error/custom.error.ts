export class CustomError extends Error {
  constructor(message: string, name: string) {
    super(message)
    this.message = message
    this.name = name
  }
  public static validationError(message: string) {
    return new CustomError(message, 'VALIDATAION_ERROR')
  }
  public static dataNotFoundError(message: string) {
    return new CustomError(message, 'DATA_NOT_FOUND')
  }
  public static mongooseError(message: string) {
    return new CustomError(message, 'MONGOOSE_ERROR')
  }
  public static invalidRouteError(message: string) {
    return new CustomError(message, 'INVALID_ROUTE_ERROR')
  }
}
