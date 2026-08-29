import Link from 'next/link'

import { clearLists, removeList } from './actions'

export function CombinationsPresentation({
  lists,
}: {
  lists: { id: string; name: string }[]
}) {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-5 py-8">
      <div className="flex flex-col gap-2">
        <Link href="/boards" className="text-sm text-neutral-500 underline underline-offset-4">
          ボード一覧
        </Link>
        <h1 className="text-xl font-bold">組み合わせ</h1>
      </div>

      {lists.length === 0 ? (
        <p className="text-sm text-neutral-500">
          組み合わせに使うリストがありません。リストの画面から追加してください。
        </p>
      ) : (
        <>
          <ol className="flex flex-col gap-1">
            {lists.map((list, index) => (
              <li
                key={list.id}
                className="flex items-center justify-between gap-3 rounded-lg bg-neutral-100 px-4 py-3 dark:bg-neutral-900"
              >
                <span className="flex min-w-0 items-center gap-2 text-sm">
                  <span className="shrink-0 text-neutral-400 tabular-nums">{index + 1}.</span>
                  <span className="truncate">{list.name}</span>
                </span>
                <form action={removeList}>
                  <input type="hidden" name="listId" value={list.id} />
                  <button
                    type="submit"
                    className="shrink-0 rounded-lg border border-neutral-300 px-3 py-1 text-xs text-neutral-500 dark:border-neutral-700"
                  >
                    外す
                  </button>
                </form>
              </li>
            ))}
          </ol>

          <form action={clearLists}>
            <button
              type="submit"
              className="rounded-lg border border-neutral-300 px-4 py-2 text-xs text-neutral-500 dark:border-neutral-700"
            >
              すべて外す
            </button>
          </form>
        </>
      )}
    </main>
  )
}
