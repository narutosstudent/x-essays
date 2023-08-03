import { component$, useStyles$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { routeAction$, z, zod$ } from '@builder.io/qwik-city'
import { Form } from '@builder.io/qwik-city'
import { Logo } from '~/icons/x-logo'
import styles from './index.css?inline'
import { Spinner } from '~/icons/spinner'
import { TwitterApi } from 'twitter-api-v2'

export const useGetEssayTitles = routeAction$(
  async ({ username }, requestEvent) => {
    const bearerToken = requestEvent.env.get('TWITTER_BEARER_TOKEN')
    const keySecret = requestEvent.env.get('TWITTER_API_SECRET')
    const key = requestEvent.env.get('TWITTER_API_KEY')

    console.log('bearerToken', bearerToken)
    console.log('keySecret', keySecret)
    console.log('key', key)

    if (!bearerToken || !keySecret || !key) {
      throw new Error('No bearer token')
    }

    const twitterClient = new TwitterApi({})

    const readOnlyClient = twitterClient.readOnly

    try {
      const searchPaginator = await readOnlyClient.v2.search({
        query: `(from:${username}) -is:reply -is:retweet lang:en`,
        max_results: 25,
        sort_order: 'recency',
        'tweet.fields': ['text', 'created_at'],
      })

      console.log('tweets', searchPaginator.tweets)
      console.log('data', searchPaginator.data)
    } catch (error) {
      console.error(error)
    }

    // const payload = {
    //   model: 'gpt-3.5-turbo',
    //   messages: [
    //     {
    //       role: 'user',
    //       content: prompt,
    //     },
    //   ],
    //   temperature: 0.7,
    //   top_p: 1,
    //   frequency_penalty: 0.5,
    //   presence_penalty: 0.5,
    //   max_tokens: 3000,
    // }

    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    //   },
    //   method: 'POST',
    //   body: JSON.stringify(payload),
    // })

    return ''
  },
  zod$({
    username: z.string(),
  })
)

export default component$(() => {
  const getEssayTitlesAction = useGetEssayTitles()
  useStyles$(styles)

  return (
    <main>
      <Form class="input-wrapper" action={getEssayTitlesAction}>
        <input
          type="text"
          aria-label="x username"
          placeholder="elonmusk"
          name="username"
          required
        />
        <button type="submit" aria-label="Generate essay titles">
          {getEssayTitlesAction.isRunning ? <Spinner /> : <Logo />}
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
