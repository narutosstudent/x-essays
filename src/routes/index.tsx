import { component$, useSignal, useStyles$, useTask$ } from '@builder.io/qwik'
import { isServer } from '@builder.io/qwik/build'
import type { DocumentHead } from '@builder.io/qwik-city'
import { Form } from '@builder.io/qwik-city'
import { Logo } from '~/icons/x-logo'
import styles from './index.css?inline'

export default component$(() => {
  useStyles$(styles)

  const mainHeight = useSignal(0)

  useTask$(() => {
    if (isServer) {
      return
    }

    const windowHeight = window.innerHeight
    const headerHeight = document.querySelector('header')!.offsetHeight
    const footerHeight = (document.querySelector('footer') as HTMLElement)
      .offsetHeight

    const newMainHeight = windowHeight - headerHeight - footerHeight
    mainHeight.value = newMainHeight
  })

  return (
    <main
      style={{
        height:
          mainHeight.value === 0
            ? 'calc(100vh - 60px - 60px)'
            : `${mainHeight}px`,
      }}
    >
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
