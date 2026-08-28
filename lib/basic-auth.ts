import { timingSafeEqual } from 'node:crypto'

function safeEqual(a: string, b: string): boolean {
  const bufferA = Buffer.from(a, 'utf8')
  const bufferB = Buffer.from(b, 'utf8')
  if (bufferA.length !== bufferB.length) {
    return false
  }
  return timingSafeEqual(bufferA, bufferB)
}

export function isAuthorized(
  header: string | null | undefined,
  secret: string,
): boolean {
  if (!header) {
    return false
  }

  const [scheme, encoded] = header.split(' ')
  if (scheme !== 'Basic' || !encoded) {
    return false
  }

  const decoded = Buffer.from(encoded, 'base64').toString('utf8')
  const separator = decoded.indexOf(':')
  if (separator === -1) {
    return false
  }

  return safeEqual(decoded.slice(separator + 1), secret)
}
