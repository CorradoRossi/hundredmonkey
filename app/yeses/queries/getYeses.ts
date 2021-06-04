import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetYesesInput
  extends Pick<Prisma.YesFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetYesesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: yeses,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.yes.count({ where }),
      query: (paginateArgs) => db.yes.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      yeses,
      nextPage,
      hasMore,
      count,
    }
  }
)
