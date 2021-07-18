export async function deleteAllBatch(
  ref: FirebaseFirestore.CollectionReference | FirebaseFirestore.Query,
  limit: number = 200
) {
  console.info(`DELETE ALL BATCH`);
  const query = ref.orderBy("__name__").limit(limit);
  const snaps = await query.get();
  if (snaps.size < 1) return;

  await Promise.all(snaps.docs.map(v => v.ref.delete()));
  if (snaps.size < limit) return;

  process.nextTick(() => deleteAllBatch(ref));
}

export async function deleteAllBatchQuery(
  query: FirebaseFirestore.Query,
  limit: number = 200
) {
  console.info(`DELETE ALL BATCH QUERY`);
  const _query = query.limit(limit);
  const snaps = await _query.get();
  if (snaps.size < 1) return;

  await Promise.all(snaps.docs.map(v => v.ref.delete()));
  if (snaps.size < limit) return;

  process.nextTick(() => deleteAllBatch(query));
}
