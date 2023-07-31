import { component$, useStyles$, useTask$ } from '@builder.io/qwik'
import { isServer } from '@builder.io/qwik/build'
import type { DocumentHead } from '@builder.io/qwik-city'
import { Form } from '@builder.io/qwik-city'
import { Logo } from '~/icons/x-logo'
import styles from './index.css?inline'

export default component$(() => {
  useStyles$(styles)

  useTask$(() => {
    if (isServer) {
      return
    }

    window.addEventListener('resize', () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    })
  })

  return (
    <main>
      <Form class="input-wrapper">
        <input
          type="text"
          aria-label="x username"
          placeholder="elonmusk"
          name="username"
        />
        <button type="submit" aria-label="Generate essay titles">
          <Logo />
        </button>
      </Form>
    </main>
  )
})

export const head: DocumentHead = {
  title: 'X Essays',
  meta: [
    {
      name: 'description',
      content:
        'Let AI write essays for you to learn from your favorite people on X.',
    },
  ],
}
