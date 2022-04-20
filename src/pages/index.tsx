import type { InferGetStaticPropsType } from 'next'
import { useAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { countAtom, fetchCountAtom } from '@atoms/count'

export async function getServerSideProps() {
  const { count } = await fetch('http://localhost:3000/api/count').then(res => res.json())
  return {
    props: { initCount: count }
  }
}

function Home({ initCount }: InferGetStaticPropsType<typeof getServerSideProps>) {
  useHydrateAtoms([[countAtom, initCount]] as const)
  const [count] = useAtom(countAtom)
  const [fetchedCount, multiply] = useAtom(fetchCountAtom)
  return (
    <div>
      <h2>Home.</h2>
      <div>
        <p>
          <span>initCount: {initCount}</span>
        </p>
        <p>
          <span>count: {count}</span>
        </p>
        <p>
          <span>fetchedCount: {fetchedCount}</span>
          <button onClick={() => multiply('/api/count')}>
            Update!
          </button>
        </p>
      </div>
    </div>
  )
}

export default Home
