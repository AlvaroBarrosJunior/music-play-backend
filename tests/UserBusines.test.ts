import { LoginInputDTO, UserInputDTO } from "../src/business/entities/User"
import { IdGenerator } from "../src/business/services/IdGenerator"
import { UserBusiness } from "../src/business/UserBusiness"

const validatorToken = jest.fn((input: any): any => {
  return { id: "id" };
})

export const compareFalse = jest.fn((password: any, hashPassowrd: any): any =>{
  return false
})

describe("Testing User Sign Up", () => {
  const idGenerator = { generate: jest.fn(() => "bananinha") } as IdGenerator
  const hashManager = { hash: jest.fn() } as any
  const authenticator = { generateToken: validatorToken } as any
  const userDatabase = {createUser: jest.fn()} as any

  const userBusiness: UserBusiness = new UserBusiness(
    idGenerator,
    hashManager,
    authenticator,
    userDatabase
  )

  test("Should return a Missing name error when 'name' is empty", async () => {
    expect.assertions(2)

    try {
      const user: UserInputDTO = {
        name: "",
        email: "test@email.com",
        nickname: "test",
        password: "test123",
      }

      await userBusiness.createUser(user)

    } catch (error) {
      expect(error.message).toEqual("Missing name")
      expect(error.statusCode).toBe(422)
    }
  })

  test("Should return a Missing email error when 'email' is empty", async () => {
    expect.assertions(2)

    try {
      const user: UserInputDTO = {
        name: "test",
        email: "",
        nickname: "test",
        password: "test123",
      }
      
      await userBusiness.createUser(user)

    } catch (error) {
      expect(error.message).toEqual("Missing email")
      expect(error.statusCode).toBe(422)
    }
  })

  test("Should return a Missing nickname error when 'nickname' is empty", async () => {
    expect.assertions(2)

    try {

      const user: UserInputDTO = {
        name: "test",
        email: "test@email.com",
        nickname: "",
        password: "test123",
      }
      
      await userBusiness.createUser(user)

    } catch (error) {
      expect(error.message).toEqual("Missing nickname")
      expect(error.statusCode).toBe(422)
    }
  })

  test("Should return a Missing password error when 'password' is empty", async () => {
    expect.assertions(2)

    try {

      const user: UserInputDTO = {
        name: "test",
        email: "test@email.com",
        nickname: "test",
        password: "",
      }
      
      await userBusiness.createUser(user)

    } catch (error) {
      expect(error.message).toEqual("Missing password")
      expect(error.statusCode).toBe(422)
    }
  })

  test("Should return a Too short password error when 'password' less than six characters", async () => {
    expect.assertions(2)

    try {

      const user: UserInputDTO = {
        name: "test",
        email: "test@email.com",
        nickname: "test",
        password: "test",
      }
      
      await userBusiness.createUser(user)

    } catch (error) {
      expect(error.message).toEqual("Password is too short! Password must contain at least 6 characters!")
      expect(error.statusCode).toBe(400)
    }
  })
})

describe("Testing User Login", () => {
  const idGenerator = { generate: jest.fn(() => "bananinha") } as IdGenerator
  const hashManager = { compare: compareFalse } as any
  const authenticator = { generateToken: validatorToken } as any
  const userDatabase = {getUserByEmail: jest.fn()} as any

  const userBusiness: UserBusiness = new UserBusiness(
    idGenerator,
    hashManager,
    authenticator,
    userDatabase
  )

  test("Should return a Missing email error when 'email' is empty", async () => {
    expect.assertions(2)

    try {
      const user: LoginInputDTO = {
        email: "",
        password: "test123",
      }
      
      await userBusiness.getUserByEmail(user)

    } catch (error) {
      expect(error.message).toEqual("Missing email")
      expect(error.statusCode).toBe(422)
    }
  })

  test("Should return a Missing password error when 'password' is empty", async () => {
    expect.assertions(2)

    try {

      const user: LoginInputDTO = {
        email: "test@email.com",
        password: "",
      }
      
      await userBusiness.getUserByEmail(user)

    } catch (error) {
      expect(error.message).toEqual("Missing password")
      expect(error.statusCode).toBe(422)
    }
  })

  test("Should return a invalid credentials error when credentials didn't match", async () => {
    expect.assertions(2)

    try {

      const user: LoginInputDTO = {
        email: "test@email.com",
        password: "test123",
      }
      
      await userBusiness.getUserByEmail(user)

    } catch (error) {
      expect(error.message).toEqual("Invalid credentials!")
      expect(error.statusCode).toBe(401)
    }
  })
})