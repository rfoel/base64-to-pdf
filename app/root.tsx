import type { MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import styled, { css } from 'styled-components'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'base64 to PDF',
  viewport: 'width=device-width,initial-scale=1',
})

const Html = styled.html(
  () => css`
    &,
    & > body {
      margin: 0;
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 100%;
    }

    * {
      box-sizing: border-box;
    }
  `,
)

export default function App() {
  return (
    <Html lang="en">
      <head>
        <Meta />
        <Links />
        {typeof document === 'undefined' ? '__STYLES__' : null}
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </Html>
  )
}
