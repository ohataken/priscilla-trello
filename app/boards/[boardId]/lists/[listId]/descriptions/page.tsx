export default async function Page({
  params,
}: PageProps<'/boards/[boardId]/lists/[listId]/descriptions'>) {
  const { boardId, listId } = await params

  return null
}
