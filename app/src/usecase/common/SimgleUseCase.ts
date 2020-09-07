import { BaseUseCase } from "./BaseUseCase";

export abstract class SimgleUseCase<T> extends BaseUseCase {
  protected abstract root: string;
  protected idKey: string = "id";

  // ****************************
  // * 参照
  // ****************************
  public async findById(id: string): Promise<T | null> {
    if (!id) return null;
    const ref = this.db.collection(this.root).doc(id);
    const item = (await ref.get()).data() as T | undefined;
    return item || null;
  }

  // ****************************
  // * 更新
  // ****************************
  public async add(item: T): Promise<void> {
    const ref = this.db.collection(this.root).doc(item[this.idKey]);
    await ref.set(item);
  }

  public async del(item: T): Promise<void> {
    const ref = this.db.collection(this.root).doc(item[this.idKey]);
    await ref.delete();
  }
}
