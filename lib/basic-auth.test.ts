import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { isAuthorized } from './basic-auth.ts'

function header(user: string, password: string): string {
  return `Basic ${Buffer.from(`${user}:${password}`, 'utf8').toString('base64')}`
}

describe('isAuthorized', () => {
  it('パスワードが一致すれば通す', () => {
    assert.equal(isAuthorized(header('', 'secret'), 'secret'), true)
  })

  it('ユーザー名は照合しない', () => {
    assert.equal(isAuthorized(header('だれでも', 'secret'), 'secret'), true)
  })

  it('パスワードにコロンが含まれていても扱える', () => {
    assert.equal(isAuthorized(header('user', 'a:b:c'), 'a:b:c'), true)
  })

  it('パスワードが違えば弾く', () => {
    assert.equal(isAuthorized(header('user', 'wrong'), 'secret'), false)
  })

  it('ヘッダがなければ弾く', () => {
    assert.equal(isAuthorized(null, 'secret'), false)
    assert.equal(isAuthorized(undefined, 'secret'), false)
  })

  it('Basic 以外のスキームは弾く', () => {
    assert.equal(isAuthorized('Bearer secret', 'secret'), false)
  })

  it('コロンのない値は弾く', () => {
    const encoded = Buffer.from('secret', 'utf8').toString('base64')
    assert.equal(isAuthorized(`Basic ${encoded}`, 'secret'), false)
  })
})
