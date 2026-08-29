import Link from 'next/link'

export function BoardsPresentation({ boards }: { boards: { id: string; name: string }[] }) {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-5 py-8">
      <h1 className="text-xl font-bold">ボード一覧</h1>

      {boards.length === 0 ? (
        <p className="text-sm text-neutral-500">ボードがありません。</p>
      ) : (
        <ul className="flex flex-col gap-1">
          {boards.map((board) => (
            <li key={board.id}>
              <Link
                href={`/boards/${board.id}`}
                className="block truncate rounded-lg bg-neutral-100 px-4 py-3 text-sm dark:bg-neutral-900"
              >
                {board.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
