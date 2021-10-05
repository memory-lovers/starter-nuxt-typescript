import {
  CollectionReference,
  DocumentData,
  DocumentReference
} from "@firebase/firestore-types";
import { QueryConfig } from "types";
import { BaseUseCase } from "./BaseUseCase";

const LIMIT = 10;
export abstract class SimgleUseCase<T> extends BaseUseCase {
  protected abstract root: string;
  protected idKey: string = "id";

  public hasMore(items: T[]): boolean {
    return items.length >= LIMIT;
  }

  private collection(): CollectionReference<DocumentData> {
    return this.db.collection(this.root);
  }

  private doc(id: string): DocumentReference<DocumentData> {
    return this.collection().doc(id);
  }

  private docByItem(item: T): DocumentReference<DocumentData> {
    const id = item[this.idKey];
    return this.doc(id);
  }

  // ****************************
  // * 参照
  // ****************************
  public async findById(id: string): Promise<T | null> {
    if (!id) return null;
    const ref = this.doc(id);
    const item = (await ref.get()).data() as T | undefined;
    return item || null;
  }

  public async findAll({
    last = undefined,
    limit = LIMIT,
    orderKey = "createAt",
    orderDir = "desc"
  }: QueryConfig<T> = {}): Promise<T[]> {
    const ref = this.collection();
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

  public async del(item: T): Promise<void> {
    const ref = this.docByItem(item);
    await ref.delete();
  }
}
