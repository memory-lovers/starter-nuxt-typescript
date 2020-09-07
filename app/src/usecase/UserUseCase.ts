import { User } from "types";
import { SimgleUseCase } from "~/src/usecase/common/SimgleUseCase";

const ROOT = "users";
class UserUseCase extends SimgleUseCase<User> {
  protected root: string = ROOT;
  protected idKey: string = "uid";

  // ****************************
  // * 参照
  // ****************************

  // ****************************
  // * 更新
  // ****************************

  // ****************************
  // * private
  // ****************************
}

export const userUseCase = new UserUseCase();
