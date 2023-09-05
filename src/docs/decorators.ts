import 'reflect-metadata'

export interface SetupDocsSettings {
  title?: string
  description?: string
}

/**
 * SetupDocs decorator to add additional message and settings for automated docs.
 * @param {SetupDocsSettings} [settings] - Optional version number for the api controller.
 */
export function SetupDocs (settings: SetupDocsSettings) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (
    target: any,
    propertyKey?: string | symbol,
    descriptor?: PropertyDescriptor
  ) {
    Reflect.defineMetadata(
      'title',
      settings.title,
      descriptor !== undefined ? descriptor.value : target
    )
    Reflect.defineMetadata(
      'description',
      settings.description,
      descriptor !== undefined ? descriptor.value : target
    )
  }
}
