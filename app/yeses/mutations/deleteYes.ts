import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteYes = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteYes), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const yes = await db.yes.deleteMany({ where: { id } })

  return yes
})
