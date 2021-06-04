import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateYes = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateYes), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const yes = await db.yes.create({ data: input })

  return yes
})
