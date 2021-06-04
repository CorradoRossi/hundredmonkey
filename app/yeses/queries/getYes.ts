import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetYes = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetYes), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const yes = await db.yes.findFirst({ where: { id } })

  if (!yes) throw new NotFoundError()

  return yes
})
