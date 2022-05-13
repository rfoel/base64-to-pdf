import type { ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import isBase64 from 'is-base64'

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const base64 = formData.get('base64')

  if (typeof base64 !== 'string')
    return json({ message: 'Required' }, { status: 400 })

  if (!isBase64(base64))
    return json({ message: 'Not a base64 string' }, { status: 400 })

  return new Response(Buffer.from(base64, 'base64'), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
    },
  })
}
