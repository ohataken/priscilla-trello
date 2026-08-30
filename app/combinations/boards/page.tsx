import { BoardsPresentation } from './boards-presentation'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const key = process.env.TRELLO_API_KEY
  const token = process.env.TRELLO_TOKEN
  if (!key || !token) {
    throw new Error('Missing environment variable TRELLO_API_KEY or TRELLO_TOKEN')
  }

  const response = await fetch(
    'https://api.trello.com/1/members/me/boards?fields=id,name&filter=open',
    {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        Authorization: `OAuth oauth_consumer_key="${key}", oauth_token="${token}"`,
      },
    },
  )
  if (!response.ok) {
    throw new Error(`Trello API ${response.status}: ${await response.text()}`)
  }

  const boards = (await response.json()) as { id: string; name: string }[]

  return <BoardsPresentation boards={boards} />
}
