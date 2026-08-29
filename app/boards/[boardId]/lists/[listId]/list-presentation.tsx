import Link from 'next/link'

export function ListPresentation({
  boardId,
  list,
  cards,
}: {
  boardId: string
  list: { name: string }
  cards: { id: string; name: string; desc: string }[]
}) {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-5 py-8">
      <div className="flex flex-col gap-2">
        <Link
          href={`/boards/${boardId}`}
          className="text-sm text-neutral-500 underline underline-offset-4"
        >
          ボードに戻る
        </Link>
        <h1 className="text-xl font-bold break-words">{list.name}</h1>
      </div>

      {cards.length === 0 ? (
        <p className="text-sm text-neutral-500">カードがありません。</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {cards.map((card) => (
            <li
              key={card.id}
              className="rounded-lg bg-neutral-100 px-4 py-3 dark:bg-neutral-900"
            >
              <p className="text-sm font-semibold break-words">{card.name}</p>
              {card.desc.length > 0 && (
                <p className="mt-2 text-xs whitespace-pre-wrap text-neutral-500">
                  {card.desc}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
