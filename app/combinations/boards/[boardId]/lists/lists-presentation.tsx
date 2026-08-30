import Link from 'next/link'

export function ListsPresentation({
  boardId,
  board,
  lists,
}: {
  boardId: string
  board: { name: string }
  lists: { id: string; name: string }[]
}) {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-5 py-8">
      <div className="flex flex-col gap-2">
        <Link
          href="/combinations/boards"
          className="text-sm text-neutral-500 underline underline-offset-4"
        >
          ボードを選び直す
        </Link>
        <h1 className="text-xl font-bold break-words">{board.name}</h1>
      </div>

      {lists.length === 0 ? (
        <p className="text-sm text-neutral-500">リストがありません。</p>
      ) : (
        <ul className="flex flex-col gap-1">
          {lists.map((list) => (
            <li key={list.id}>
              <Link
                href={`/combinations/boards/${boardId}/lists/${list.id}/cards`}
                className="block truncate rounded-lg bg-neutral-100 px-4 py-3 text-sm dark:bg-neutral-900"
              >
                {list.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
