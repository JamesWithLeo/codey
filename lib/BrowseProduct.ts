import FilterSeachByName from "@/src/app/components/client/utils/filterSeachProduct";
import { Category } from "@/src/generated/prisma/enums";
import { getRedisProduct } from "./redis/getRedisProduct";

type Props = {
  query?: string | undefined;
  page: number;
  limit: number;
  category: Category;
};
export async function BrowseProduct({ query, category, page, limit }: Props) {
  if (query) {
    const result = await FilterSeachByName({
      searchByName: query,
      category: category,
      page: page,
      limit: limit,
    });
    return { ...result };
  } else {
    const result = await getRedisProduct({
      page,
      limit,
      query,
      category,
    });
    return { ...result };
  }
}
