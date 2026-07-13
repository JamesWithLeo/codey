import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string }>;
  params: Promise<{ slug?: string[] }>;
}) {
  redirect("/products");
}
