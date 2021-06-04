import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getYeses from "app/yeses/queries/getYeses"

const ITEMS_PER_PAGE = 100

export const YesesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ yeses, hasMore }] = usePaginatedQuery(getYeses, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {yeses.map((yes) => (
          <li key={yes.id}>
            <Link href={Routes.ShowYesPage({ yesId: yes.id })}>
              <a>{yes.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const YesesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Yeses</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewYesPage()}>
            <a>Create Yes</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <YesesList />
        </Suspense>
      </div>
    </>
  )
}

YesesPage.authenticate = true
YesesPage.getLayout = (page) => <Layout>{page}</Layout>

export default YesesPage
