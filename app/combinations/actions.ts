'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

import { COMBINATIONS_COOKIE, readLists } from './combinations-cookie'

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30

async function writeLists(listIds: string[]): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(COMBINATIONS_COOKIE, listIds.join(','), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE_SECONDS,
  })
}

export async function addList(formData: FormData): Promise<void> {
  const listId = String(formData.get('listId') ?? '')
  if (listId.length === 0) {
    return
  }

  const current = await readLists()
  if (!current.includes(listId)) {
    await writeLists([...current, listId])
  }
  revalidatePath('/', 'layout')
}

export async function removeList(formData: FormData): Promise<void> {
  const listId = String(formData.get('listId') ?? '')
  const current = await readLists()
  await writeLists(current.filter((id) => id !== listId))
  revalidatePath('/', 'layout')
}

export async function clearLists(): Promise<void> {
  await writeLists([])
  revalidatePath('/', 'layout')
}
