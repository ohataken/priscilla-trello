import Link from 'next/link'

export function CardPresentation({
  boardId,
  listId,
  cardId,
  card,
}: {
  boardId: string
  listId: string
  cardId: string
  card: { name: string; desc: string }
}) {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-5 py-8">
      <div className="flex flex-col gap-2">
        <Link
          href={`/combinations/boards/${boardId}/lists/${listId}/cards`}
          className="text-sm text-neutral-500 underline underline-offset-4"
        >
          カードを選び直す
        </Link>
        <h1 className="text-xl font-bold break-words">{card.name}</h1>
      </div>

      {card.desc.length === 0 ? (
        <p className="text-sm text-neutral-500">このカードには本文がありません。</p>
      ) : (
        <>
          <p className="rounded-lg bg-neutral-100 px-4 py-3 text-xs whitespace-pre-wrap text-neutral-500 dark:bg-neutral-900">
            {card.desc}
          </p>
          <Link
            href={`/combinations?cardId=${cardId}`}
            className="rounded-xl bg-blue-600 px-6 py-4 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-500 active:bg-blue-700"
          >
            この本文をテンプレートにする
          </Link>
        </>
      )}
    </main>
  )
}
