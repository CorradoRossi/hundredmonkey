import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getYes from "app/yeses/queries/getYes"
import deleteYes from "app/yeses/mutations/deleteYes"

export const Yes = () => {
  const router = useRouter()
  const yesId = useParam("yesId", "number")
  const [deleteYesMutation] = useMutation(deleteYes)
  const [yes] = useQuery(getYes, { id: yesId })

  return (
    <>
      <Head>
        <title>Yes {yes.id}</title>
      </Head>

      <div>
        <h1>Yes {yes.id}</h1>
        <pre>{JSON.stringify(yes, null, 2)}</pre>

        <Link href={Routes.EditYesPage({ yesId: yes.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteYesMutation({ id: yes.id })
              router.push(Routes.YesesPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowYesPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.YesesPage()}>
          <a>Yeses</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Yes />
      </Suspense>
    </div>
  )
}

ShowYesPage.authenticate = true
ShowYesPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowYesPage
