import { Card } from "@/models/Card.model";

export async function getCardTypeAnimals() {
  const res = await fetch(
    `https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    }
  );

  const { entries } = await res.json();

  return entries?.map(
    ({ meta, fields: { image } }: { meta: any; fields: { image: any } }) => ({
      id: meta.uuid,
      name: meta.name,
      slug: meta.slug,
      image: image.url,
      title: image.title,
    })
  ) as unknown as Card[];
}
