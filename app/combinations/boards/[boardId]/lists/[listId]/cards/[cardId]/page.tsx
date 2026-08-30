import { notFound } from 'next/navigation'

import { CardPresentation } from './card-presentation'

export default async function Page({
  params,
}: PageProps<'/combinations/boards/[boardId]/lists/[listId]/cards/[cardId]'>) {
  const { boardId, listId, cardId } = await params

  const key = process.env.TRELLO_API_KEY
  const token = process.env.TRELLO_TOKEN
  if (!key || !token) {
    throw new Error('Missing environment variable TRELLO_API_KEY or TRELLO_TOKEN')
  }

  const response = await fetch(
    `https://api.trello.com/1/cards/${encodeURIComponent(cardId)}?fields=id,name,desc`,
    {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        Authorization: `OAuth oauth_consumer_key="${key}", oauth_token="${token}"`,
      },
    },
  )
  if (response.status === 400 || response.status === 404) {
    notFound()
  }
  if (!response.ok) {
    throw new Error(`Trello API ${response.status}: ${await response.text()}`)
  }

  const card = (await response.json()) as { name: string; desc: string }

  return <CardPresentation boardId={boardId} listId={listId} cardId={cardId} card={card} />
}
