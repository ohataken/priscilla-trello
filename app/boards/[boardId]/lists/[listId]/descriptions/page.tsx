export default async function Page({
  params,
}: PageProps<'/boards/[boardId]/lists/[listId]/descriptions'>) {
  const { boardId, listId } = await params

  const key = process.env.TRELLO_API_KEY
  const token = process.env.TRELLO_TOKEN
  if (!key || !token) {
    throw new Error('Missing environment variable TRELLO_API_KEY or TRELLO_TOKEN')
  }

  return null
}
