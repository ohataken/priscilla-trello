import { readLists } from './combinations-cookie'
import { CombinationsPresentation } from './combinations-presentation'

export const dynamic = 'force-dynamic'

const MAX_COMBINATIONS = 200

export default async function Page() {
  const listIds = await readLists()
  if (listIds.length === 0) {
    return (
      <CombinationsPresentation
        lists={[]}
        combinationCount={0}
        maxCombinations={MAX_COMBINATIONS}
      />
    )
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
      const base = `https://api.trello.com/1/lists/${encodeURIComponent(listId)}`
      const [listResponse, cardsResponse] = await Promise.all([
        fetch(`${base}?fields=id,name`, init),
        fetch(`${base}/cards?fields=id,name,desc&filter=open`, init),
      ])
      if (!listResponse.ok || !cardsResponse.ok) {
        return null
      }

      const list = (await listResponse.json()) as { id: string; name: string }
      const cards = (await cardsResponse.json()) as {
        id: string
        name: string
        desc: string
      }[]
      return { id: list.id, name: list.name, cards }
    }),
  )
  const lists = fetched.filter((list) => list !== null)

  const usable = lists.filter((list) => list.cards.length > 0)
  const combinationCount =
    usable.length === 0
      ? 0
      : usable.reduce((total, list) => total * list.cards.length, 1)

  return (
    <CombinationsPresentation
      lists={lists}
      combinationCount={combinationCount}
      maxCombinations={MAX_COMBINATIONS}
    />
  )
}
