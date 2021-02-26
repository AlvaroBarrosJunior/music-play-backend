import { BaseDatabase } from "./BaseDatabase";
import { User } from "../business/entities/User";
import { CustomError } from "../business/error/CustomError";

export class UserDatabase extends BaseDatabase {

   private static TABLE_NAME = "music_play_user"

   private static toUserModel(user: any): User {
      return new User(
         user.id,
         user.name,
         user.email,
         user.nickname,
         user.password
      );
   }

   public async createUser(
      id: string,
      name: string,
      email: string,
      nickname: string,
      password: string
   ): Promise<void> {
      try {
         await BaseDatabase.connection(UserDatabase.TABLE_NAME)
            .insert({
               id,
               name,
               email,
               nickname,
               password
            })
      } catch (error) {
         throw new CustomError(500, "An unexpected error ocurred");
      }
   }

   public async getUserByEmail(email: string): Promise<User> {
      try {
         const result = await BaseDatabase.connection(UserDatabase.TABLE_NAME)
            .select("*")
            .where({ email });

         return UserDatabase.toUserModel(result[0]);
      } catch (error) {
         throw new CustomError(500, "An unexpected error ocurred");
      }
   }
}