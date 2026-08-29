import Link from 'next/link'

import { clearLists, removeList } from './actions'

export function CombinationsPresentation({
  lists,
  combinationCount,
  maxCombinations,
}: {
  lists: { id: string; name: string; cardCount: number }[]
  combinationCount: number
  maxCombinations: number
}) {
  const usable = lists.filter((list) => list.cardCount > 0)
  const empty = lists.filter((list) => list.cardCount === 0)
  const overLimit = combinationCount > maxCombinations

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
          <section className="rounded-2xl bg-neutral-100 px-5 py-6 text-center dark:bg-neutral-900">
            <p className="text-4xl font-bold tabular-nums">{combinationCount}</p>
            <p className="mt-1 text-sm text-neutral-500">通りの組み合わせ</p>
            {usable.length > 0 && (
              <p className="mt-3 text-sm text-neutral-500 tabular-nums">
                {usable.map((list) => list.cardCount).join(' × ')}
              </p>
            )}
          </section>

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
                <span className="flex shrink-0 items-center gap-3">
                  <span className="text-sm text-neutral-500 tabular-nums">
                    {list.cardCount} 枚
                  </span>
                  <form action={removeList}>
                    <input type="hidden" name="listId" value={list.id} />
                    <button
                      type="submit"
                      className="rounded-lg border border-neutral-300 px-3 py-1 text-xs text-neutral-500 dark:border-neutral-700"
                    >
                      外す
                    </button>
                  </form>
                </span>
              </li>
            ))}
          </ol>

          {empty.length > 0 && (
            <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-100">
              カードが 0 枚のため組み合わせに使えないリスト:{' '}
              {empty.map((list) => list.name).join('、')}
            </p>
          )}

          {overLimit && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-900 dark:bg-red-950 dark:text-red-100"
            >
              上限 {maxCombinations} 通りを超えています。リストを減らしてください。
            </p>
          )}

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
