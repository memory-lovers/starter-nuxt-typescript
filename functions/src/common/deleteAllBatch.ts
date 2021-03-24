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
