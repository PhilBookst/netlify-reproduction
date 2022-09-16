import { pscale } from "./planetscale";

type RandomItem<T extends "hashtag" | "profile"> = T extends "hashtag"
  ? {
      id: number;
      name: string;
      thumbnail: string;
    }
  : {
      id: number;
      username: string;
      profile_pic_url: string;
    };

type RandomItemsFn = <T extends "profile" | "hashtag">({
  type,
  count,
}: {
  type: T;
  count: number;
}) => Promise<RandomItem<T>[]>;

const capitalize = (type: "profile" | "hashtag") =>
  type[0].toUpperCase() + type.slice(1);

export const fetchRandomItems: RandomItemsFn = async ({
  type,
  count = 100,
}) => {
  try {
    const table = capitalize(type);

    const result = await pscale.execute(
      `SELECT x.* FROM ${table} AS x INNER JOIN (SELECT Round( Rand() * (SELECT MAX(id) FROM ${table} )) AS id) AS y WHERE x.id >= y.id LIMIT ${count}`,
    );

    const { rows = [] } = result;

    return rows as RandomItem<typeof type>[];
  } catch (err) {
    console.error("[Error - pscale randomItems]:", { err });
    return [];
  }
};
