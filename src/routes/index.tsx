import { component$, useSignal, useTask$ } from '@builder.io/qwik'
import { isServer } from '@builder.io/qwik/build'
import type { DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
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
        color: 'white',
        height:
          mainHeight.value === 0
            ? 'calc(100vh - 60px - 60px)'
            : `${mainHeight}px`,
      }}
    >
      hello world
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
