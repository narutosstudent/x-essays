import { component$ } from '@builder.io/qwik'
import styles from './header.module.css'
import { Logo } from '~/icons/x-logo'

export const Header = component$(() => {
  return (
    <header class={styles.header}>
      <Logo />
      <h1>Essays</h1>
      <span />
    </header>
  )
})
