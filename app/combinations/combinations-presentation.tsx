'use client'

import Link from 'next/link'
import { useState } from 'react'

import { clearLists, removeList } from './actions'

type Card = { id: string; name: string; desc: string }
type List = { id: string; name: string; cards: Card[] }

const PLACEHOLDER = /\{\{\s*(\w+)\s*\}\}/g

function renderTemplate(template: string, values: Record<string, string>): string {
  return template.replace(PLACEHOLDER, (matched, key: string) => values[key] ?? matched)
}

function cartesianProduct(groups: Card[][]): Card[][] {
  return groups.reduce<Card[][]>(
    (acc, group) => acc.flatMap((combo) => group.map((card) => [...combo, card])),
    [[]],
  )
}

function valuesOf(combination: Card[]): Record<string, string> {
  const values: Record<string, string> = {}
  combination.forEach((card, index) => {
    values[`name${index + 1}`] = card.name
    values[`desc${index + 1}`] = card.desc
  })
  return values
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch {
          setCopied(false)
        }
      }}
      className="self-start rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-500 active:bg-blue-700"
    >
      {copied ? 'コピーしました' : 'コピー'}
    </button>
  )
}

export function CombinationsPresentation({
  lists,
  combinationCount,
  maxCombinations,
}: {
  lists: List[]
  combinationCount: number
  maxCombinations: number
}) {
  const [template, setTemplate] = useState('{{desc1}}')

  const usable = lists.filter((list) => list.cards.length > 0)
  const empty = lists.filter((list) => list.cards.length === 0)
  const overLimit = combinationCount > maxCombinations
  const combinations =
    overLimit || usable.length === 0 ? [] : cartesianProduct(usable.map((list) => list.cards))
  const variables = usable
    .map((_, index) => `{{name${index + 1}}} {{desc${index + 1}}}`)
    .join(' ')

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
                {usable.map((list) => list.cards.length).join(' × ')}
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
                    {list.cards.length} 枚
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
              上限 {maxCombinations} 通りを超えているため展開していません。リストを減らしてください。
            </p>
          )}

          {combinations.length > 0 && (
            <>
              <div className="flex flex-col gap-2">
                <label htmlFor="template" className="text-sm font-semibold text-neutral-500">
                  テンプレート
                </label>
                <textarea
                  id="template"
                  value={template}
                  onChange={(event) => setTemplate(event.target.value)}
                  rows={6}
                  className="rounded-xl border border-neutral-300 bg-transparent px-4 py-3 font-mono text-sm dark:border-neutral-700"
                />
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs break-all text-neutral-500">使える変数: {variables}</p>
                  <button
                    type="button"
                    onClick={() => setTemplate('')}
                    disabled={template.length === 0}
                    className="shrink-0 rounded-lg border border-neutral-300 px-3 py-1 text-xs text-neutral-500 disabled:opacity-40 dark:border-neutral-700"
                  >
                    クリア
                  </button>
                </div>
              </div>

              <ul className="flex flex-col gap-3">
                {combinations.map((combination) => {
                  const rendered = renderTemplate(template, valuesOf(combination))

                  return (
                    <li
                      key={combination.map((card) => card.id).join('-')}
                      className="flex flex-col gap-2 rounded-lg bg-neutral-100 px-4 py-3 dark:bg-neutral-900"
                    >
                      <p className="text-sm font-semibold break-words">
                        {combination.map((card) => card.name).join(' × ')}
                      </p>
                      <p className="text-xs whitespace-pre-wrap text-neutral-500">{rendered}</p>
                      <CopyButton text={rendered} />
                    </li>
                  )
                })}
              </ul>
            </>
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
