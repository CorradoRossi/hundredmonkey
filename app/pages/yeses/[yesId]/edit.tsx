import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getYes from "app/yeses/queries/getYes"
import updateYes from "app/yeses/mutations/updateYes"
import { YesForm, FORM_ERROR } from "app/yeses/components/YesForm"

export const EditYes = () => {
  const router = useRouter()
  const yesId = useParam("yesId", "number")
  const [yes, { setQueryData }] = useQuery(getYes, { id: yesId })
  const [updateYesMutation] = useMutation(updateYes)

  return (
    <>
      <Head>
        <title>Edit Yes {yes.id}</title>
      </Head>

      <div>
        <h1>Edit Yes {yes.id}</h1>
        <pre>{JSON.stringify(yes)}</pre>

        <YesForm
          submitText="Update Yes"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateYes}
          initialValues={yes}
          onSubmit={async (values) => {
            try {
              const updated = await updateYesMutation({
                id: yes.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowYesPage({ yesId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditYesPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditYes />
      </Suspense>

      <p>
        <Link href={Routes.YesesPage()}>
          <a>Yeses</a>
        </Link>
      </p>
    </div>
  )
}

EditYesPage.authenticate = true
EditYesPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditYesPage
