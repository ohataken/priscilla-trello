import Link from 'next/link'

export function CardsPresentation({
  boardId,
  listId,
  list,
  cards,
}: {
  boardId: string
  listId: string
  list: { name: string }
  cards: { id: string; name: string }[]
}) {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-5 py-8">
      <div className="flex flex-col gap-2">
        <Link
          href={`/combinations/boards/${boardId}/lists`}
          className="text-sm text-neutral-500 underline underline-offset-4"
        >
          リストを選び直す
        </Link>
        <h1 className="text-xl font-bold break-words">{list.name}</h1>
      </div>

      {cards.length === 0 ? (
        <p className="text-sm text-neutral-500">カードがありません。</p>
      ) : (
        <ul className="flex flex-col gap-1">
          {cards.map((card) => (
            <li key={card.id}>
              <Link
                href={`/combinations/boards/${boardId}/lists/${listId}/cards/${card.id}`}
                className="block truncate rounded-lg bg-neutral-100 px-4 py-3 text-sm dark:bg-neutral-900"
              >
                {card.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
