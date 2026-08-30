import { notFound } from 'next/navigation'

import { ListsPresentation } from './lists-presentation'

export default async function Page({
  params,
}: PageProps<'/combinations/boards/[boardId]/lists'>) {
  const { boardId } = await params

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
  const base = `https://api.trello.com/1/boards/${encodeURIComponent(boardId)}`

  const [boardResponse, listsResponse] = await Promise.all([
    fetch(`${base}?fields=id,name`, init),
    fetch(`${base}/lists?fields=id,name&filter=open`, init),
  ])
  for (const response of [boardResponse, listsResponse]) {
    if (response.status === 400 || response.status === 404) {
      notFound()
    }
    if (!response.ok) {
      throw new Error(`Trello API ${response.status}: ${await response.text()}`)
    }
  }

  const board = (await boardResponse.json()) as { name: string }
  const lists = (await listsResponse.json()) as { id: string; name: string }[]

  return <ListsPresentation boardId={boardId} board={board} lists={lists} />
}
