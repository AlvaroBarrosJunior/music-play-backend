import { UserInputDTO, LoginInputDTO } from "./entities/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "./services/IdGenerator";
import { HashManager } from "./services/HashManager";
import { Authenticator } from "./services/Authenticator";
import { CustomError } from "./error/CustomError";

export class UserBusiness {

  constructor(
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private authenticator: Authenticator,
    private userDatabase: UserDatabase,
  ) { }

  async createUser(user: UserInputDTO) {

    if (!user.name) throw new CustomError(422, `Missing name`)
    if (!user.email) throw new CustomError(422, `Missing email`)
    if (!user.nickname) throw new CustomError(422, `Missing nickname`)
    if (!user.password) throw new CustomError(422, `Missing password`)

    if (user.password.length < 6) {
      throw new CustomError(400, "Password is too short! Password must contain at least 6 characters!")
    }

    const id = this.idGenerator.generate();

    const hashPassword = await this.hashManager.hash(user.password);

    await this.userDatabase.createUser(
        id,
        user.name,
        user.email,
        user.nickname,
        hashPassword
    );

    const accessToken = this.authenticator.generateToken({
        id
    });

    return accessToken;
  }

  async getUserByEmail(user: LoginInputDTO) {
    if (!user.email) throw new CustomError(422, `Missing email`)
    if (!user.password) throw new CustomError(422, `Missing password`)

    const userFromDB = await this.userDatabase.getUserByEmail(user.email);

    const passwordIsCorrect = await this.hashManager.compare(
        user.password,
        userFromDB.password
    );

    const accessToken = this.authenticator.generateToken({
        id: userFromDB.id
    });

    if (!passwordIsCorrect) {
        throw new CustomError(401, "Invalid credentials!");
    }

    return accessToken;
  }
}