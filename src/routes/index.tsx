import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
  return <div>hello world</div>
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
