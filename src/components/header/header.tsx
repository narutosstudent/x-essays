import { component$, useStylesScoped$ } from '@builder.io/qwik'
import { Logo } from '~/icons/x-logo'

import styles from './header.css?inline'

export const Header = component$(() => {
  useStylesScoped$(styles)

  return (
    <header>
      <Logo />
      <h1>Essays</h1>
      <span />
    </header>
  )
})
