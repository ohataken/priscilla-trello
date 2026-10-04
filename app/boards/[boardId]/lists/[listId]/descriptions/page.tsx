export default async function Page({
  params,
}: PageProps<'/boards/[boardId]/lists/[listId]/descriptions'>) {
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

  return null
}
