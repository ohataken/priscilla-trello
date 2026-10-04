import Link from 'next/link'

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
      <div className="flex flex-col gap-2">
        <Link
          href={`/boards/${boardId}/lists/${listId}`}
          className="text-sm text-neutral-500 underline underline-offset-4"
        >
          リストに戻る
        </Link>
        <h1 className="text-xl font-bold break-words">{list.name} の説明一覧</h1>
      </div>

      {cards.length === 0 ? (
        <p className="text-sm text-neutral-500">カードがありません。</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {cards.map((card) => (
            <li
              key={card.id}
              className="flex flex-col gap-2 rounded-lg bg-neutral-100 px-4 py-3 dark:bg-neutral-900"
            >
              <p className="text-sm font-semibold break-words">{card.name}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
