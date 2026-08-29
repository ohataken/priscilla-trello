import 'server-only'

import { cookies } from 'next/headers'

export const COMBINATIONS_COOKIE = 'combinations'

export async function readLists(): Promise<string[]> {
  const cookieStore = await cookies()
  const value = cookieStore.get(COMBINATIONS_COOKIE)?.value ?? ''
  return value.split(',').filter((listId) => listId.length > 0)
}
