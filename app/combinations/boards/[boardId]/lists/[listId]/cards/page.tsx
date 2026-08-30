import { notFound } from 'next/navigation'

import { CardsPresentation } from './cards-presentation'

export default async function Page({
  params,
}: PageProps<'/combinations/boards/[boardId]/lists/[listId]/cards'>) {
  const { boardId, listId } = await params

  const key = process.env.TRELLO_API_KEY
  const token = process.env.TRELLO_TOKEN
  if (!key || !token) {
    throw new Error('Missing environment variable TRELLO_API_KEY or TRELLO_TOKEN')
  }

  const init = {
    cache: 'no-store' as const,
    headers: {
      Accept: 'application/json',
      Authorization: `OAuth oauth_consumer_key="${key}", oauth_token="${token}"`,
    },
  }
  const base = `https://api.trello.com/1/lists/${encodeURIComponent(listId)}`

  const [listResponse, cardsResponse] = await Promise.all([
    fetch(`${base}?fields=id,name`, init),
    fetch(`${base}/cards?fields=id,name&filter=open`, init),
  ])
  for (const response of [listResponse, cardsResponse]) {
    if (response.status === 400 || response.status === 404) {
      notFound()
    }
    if (!response.ok) {
      throw new Error(`Trello API ${response.status}: ${await response.text()}`)
    }
  }

  const list = (await listResponse.json()) as { name: string }
  const cards = (await cardsResponse.json()) as { id: string; name: string }[]

  return <CardsPresentation boardId={boardId} listId={listId} list={list} cards={cards} />
}
