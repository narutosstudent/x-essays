import { component$, useStylesScoped$ } from '@builder.io/qwik'
import styles from './footer.css?inline'

export const Footer = component$(() => {
  useStylesScoped$(styles)

  return (
    <footer>
      <p>
        Built by
        <a
          href="https://x.com/TAbrodi"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tiger Abrodi
        </a>
      </p>
    </footer>
  )
})
