export function DescriptionsPresentation({
  boardId,
  listId,
  list,
  cards,
}: {
  boardId: string
  listId: string
  list: { name: string }
  cards: { id: string; name: string; desc: string }[]
}) {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-5 py-8">
    </main>
  )
}
