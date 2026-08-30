import Link from 'next/link'

export function BoardsPresentation({ boards }: { boards: { id: string; name: string }[] }) {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-5 py-8">
      <div className="flex flex-col gap-2">
        <Link href="/combinations" className="text-sm text-neutral-500 underline underline-offset-4">
          組み合わせに戻る
        </Link>
        <h1 className="text-xl font-bold">ボードを選ぶ</h1>
      </div>

      {boards.length === 0 ? (
        <p className="text-sm text-neutral-500">ボードがありません。</p>
      ) : (
        <ul className="flex flex-col gap-1">
          {boards.map((board) => (
            <li key={board.id}>
              <Link
                href={`/combinations/boards/${board.id}/lists`}
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
