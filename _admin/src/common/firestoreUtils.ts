import {
  FirebaseFirestore,
  Query,
  WriteBatch
} from "@firebase/firestore-types";

export type QueryFunc = (db: FirebaseFirestore, last?: any) => Query;
export type ExecuteFunc = (
  db: FirebaseFirestore,
  batch: WriteBatch,
  item: any
) => Promise<void>;
export type SkipFunc = (item: any) => boolean;

export async function executeBatch(
  db: FirebaseFirestore,
  limit: number,
  queryFunc: QueryFunc,
  executeFunc: ExecuteFunc,
  skipFunc: SkipFunc,
  last?: object
) {
  console.info(`**    START executeBatch`);

  // queryFuncを使って対象のドキュメントを取得
  const query: Query = queryFunc(db, last);
  const items = await query.limit(limit).get();

  // ドキュメントが1つも見つからなければ、終了
  console.info(`QUERY: size=${items.size}`);
  if (items.size === 0) return;

  // executeFuncを使ってbatchに削除/更新処理を追加＆コミット
  const batch = db.batch();
  for (let i = 0; i < items.size; i++) {
    const item = items.docs[i];
    const itemDate = item.data();
    if (!skipFunc(itemDate)) {
      console.info(`EXECUTE: id=${JSON.stringify(item.id)}`);
      await executeFunc(db, batch, item.data());
    } else {
      console.info(`SKIP: id=${JSON.stringify(item.id)}`);
    }
  }
  await batch.commit();

  // リストの最後の要素を取得して、再帰実行
  const lastItem = items.docs[items.size - 1].data();
  return await executeBatch(
    db,
    limit,
    queryFunc,
    executeFunc,
    skipFunc,
    lastItem
  );
}

export async function deleteAllBatch(
  ref: FirebaseFirestore.CollectionReference,
  limit: number = 200
) {
  console.info(`DELETE ALL BATCH: ${ref.path}`);
  const query = ref.orderBy("__name__").limit(limit);
  const snaps = await query.get();
  if (snaps.size < 1) return;

  await Promise.all(snaps.docs.map(v => v.ref.delete()));

  process.nextTick(() => deleteAllBatch(ref));
}
