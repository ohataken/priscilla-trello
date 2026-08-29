'use client'

import Link from 'next/link'
import { useState } from 'react'

const PLACEHOLDER = /\{\{\s*(\w+)\s*\}\}/g

function renderTemplate(template: string, values: Record<string, string>): string {
  return template.replace(PLACEHOLDER, (matched, key: string) => values[key] ?? matched)
}

export function ListPresentation({
  boardId,
  list,
  cards,
}: {
  boardId: string
  list: { name: string }
  cards: { id: string; name: string; desc: string }[]
}) {
  const [template, setTemplate] = useState('{{desc}}')

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
        <p className="text-xs text-neutral-500">
          使える変数: {'{{name}}'} {'{{desc}}'} {'{{list}}'}
        </p>
      </div>

      {cards.length === 0 ? (
        <p className="text-sm text-neutral-500">カードがありません。</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {cards.map((card) => {
            const rendered = renderTemplate(template, {
              name: card.name,
              desc: card.desc,
              list: list.name,
            })

            return (
              <li
                key={card.id}
                className="flex flex-col gap-2 rounded-lg bg-neutral-100 px-4 py-3 dark:bg-neutral-900"
              >
                <p className="text-sm font-semibold break-words">{card.name}</p>
                <p className="text-xs whitespace-pre-wrap text-neutral-500">{rendered}</p>
              </li>
            )
          })}
        </ul>
      )}
    </main>
  )
}
