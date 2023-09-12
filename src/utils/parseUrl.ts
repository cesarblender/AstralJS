import { posix } from 'path'
import { UrlPath } from '@types'

export function parseUrl(path: string, ...subpaths: string[]): UrlPath {
    const joinedPath = posix.join(path, ...subpaths)

    const urlPath = joinedPath.startsWith('/') ? joinedPath : `/${joinedPath}`

    return urlPath as UrlPath
}
