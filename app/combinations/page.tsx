import { readLists } from './combinations-cookie'
import { CombinationsPresentation } from './combinations-presentation'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const listIds = await readLists()
  if (listIds.length === 0) {
    return <CombinationsPresentation lists={[]} />
  }

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

  const fetched = await Promise.all(
    listIds.map(async (listId) => {
      const response = await fetch(
        `https://api.trello.com/1/lists/${encodeURIComponent(listId)}?fields=id,name`,
        init,
      )
      if (!response.ok) {
        return null
      }
      return (await response.json()) as { id: string; name: string }
    }),
  )
  const lists = fetched.filter((list) => list !== null)

  return <CombinationsPresentation lists={lists} />
}
