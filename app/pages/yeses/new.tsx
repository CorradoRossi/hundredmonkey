import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createYes from "app/yeses/mutations/createYes"
import { YesForm, FORM_ERROR } from "app/yeses/components/YesForm"

const NewYesPage: BlitzPage = () => {
  const router = useRouter()
  const [createYesMutation] = useMutation(createYes)

  return (
    <div>
      <h1>Create New Yes</h1>

      <YesForm
        submitText="Create Yes"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateYes}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const yes = await createYesMutation(values)
            router.push(`/yeses/${yes.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.YesesPage()}>
          <a>Yeses</a>
        </Link>
      </p>
    </div>
  )
}

NewYesPage.authenticate = true
NewYesPage.getLayout = (page) => <Layout title={"Create New Yes"}>{page}</Layout>

export default NewYesPage
