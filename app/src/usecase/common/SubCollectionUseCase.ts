import {
  CollectionReference,
  DocumentData,
  DocumentReference
} from "@firebase/firestore-types";
import { QueryConfig } from "types";
import { BaseUseCase } from "./BaseUseCase";

const LIMIT = 10;
export abstract class SubCollectionUseCase<T, P> extends BaseUseCase {
  protected idKey: string = "id";

  protected abstract collection(params: P): CollectionReference<DocumentData>;

  protected abstract doc(params: P): DocumentReference<DocumentData>;

  protected abstract docByItem(item: T): DocumentReference<DocumentData>;

  public hasMore(items: T[]): boolean {
    return items.length >= LIMIT;
  }

  // ****************************
  // * 参照
  // ****************************
  public async findById(params: P): Promise<T | null> {
    const ref = this.doc(params);
    const item = (await ref.get()).data() as T | undefined;
    return item || null;
  }

  public async findAllNoLimit(params: P, last?: T) {}
  public async findAll(
    params: P,
    {
      last = undefined,
      limit = LIMIT,
      orderKey = "createAt",
      orderDir = "desc"
    }: QueryConfig<T> = {}
  ): Promise<T[]> {
    const ref = this.collection(params);
    let query = ref.orderBy(orderKey, orderDir);
    if (!!last) {
      query = query.startAfter(last[orderKey]);
    }

    if (limit != null) {
      query = query.limit(limit);
    }

    const snaps = await query.get();
    return snaps.docs.map(v => v.data() as T);
  }

  // ****************************
  // * 更新
  // ****************************
  public async save(item: T): Promise<void> {
    const ref = this.docByItem(item);
    await ref.set(item);
  }

  public async update(item: T, params: { [key: string]: any }): Promise<void> {
    const ref = this.docByItem(item);
    await ref.set(params, { merge: true });
  }

  public async del(item: T): Promise<void> {
    const ref = this.docByItem(item);
    await ref.delete();
  }
}
