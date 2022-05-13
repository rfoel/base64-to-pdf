import { Form } from '@remix-run/react'
import isBase64 from 'is-base64'
import type { FocusEventHandler, FormEventHandler } from 'react'
import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  flex: 1;
  padding: 32px;
  height: 100%;
  width: 100%;

  textarea {
    height: 200px;
    resize: none;
    width: 100%;
  }

  embed {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
`

const Index = () => {
  const [error, setError] = useState<string>('')
  const [base64, setBase64] = useState<string>('')

  const handleBlur: FocusEventHandler<HTMLTextAreaElement> = event => {
    const { value } = event.target
    if (!value) setError('Required')
    else if (!isBase64(value)) setError('Not a base64 string')
    else setBase64(value)
  }

  const handleInput: FormEventHandler<HTMLTextAreaElement> = () => {
    setError('')
  }

  return (
    <Container>
      <h1>base64 to PDF</h1>
      <Form action="pdf" method="post" reloadDocument>
        <textarea name="base64" onBlur={handleBlur} onInput={handleInput} />
        {error && <span>{error}</span>}
        <button type="submit">Download</button>
      </Form>
      {base64 && (
        <embed
          src={`data:application/pdf;base64,${base64}`}
          type="application/pdf"
        />
      )}
    </Container>
  )
}

export default Index
