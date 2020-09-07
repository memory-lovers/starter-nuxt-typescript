import {
  CollectionReference,
  DocumentReference,
  DocumentData
} from "@firebase/firestore-types";
import { BaseUseCase } from "./BaseUseCase";

export abstract class SubCollectionUseCase<T, P> extends BaseUseCase {
  protected idKey: string = "id";

  protected abstract collection(params: P): CollectionReference<DocumentData>;

  protected abstract doc(params: P): DocumentReference<DocumentData>;

  protected abstract docByItem(item: T): DocumentReference<DocumentData>;

  // ****************************
  // * 参照
  // ****************************
  public async findById(params: P): Promise<T | null> {
    const ref = this.doc(params);
    const item = (await ref.get()).data() as T | undefined;
    return item || null;
  }

  // ****************************
  // * 更新
  // ****************************
  public async add(item: T): Promise<void> {
    const ref = this.docByItem(item);
    await ref.set(item);
  }

  public async del(item: T): Promise<void> {
    const ref = this.docByItem(item);
    await ref.delete();
  }
}
