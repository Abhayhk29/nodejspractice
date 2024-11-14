import { CartRepositoryType } from "../types/repository.types"
import * as Repository from "../repository/cart.repository";
import { CreateCart } from "../service/cart.service"

describe("cartService", ()=>{

    let repo : CartRepositoryType;
    beforeAll(() => {
        repo = Repository.CartRepository;
    })


    afterEach(() => {
        repo = {} as CartRepositoryType;
    })


    it("should return correct data while creating cart", async () => {
        const mockData = {
            title : "smart phone",
            amount: 1200
        }

        jest.spyOn(Repository.CartRepository, "create").mockImplementationOnce(() =>
            Promise.resolve({
              message: "fake response from cart repository",
              input: mockData,
            })
          );
      

        const res = await CreateCart(mockData, repo);

        expect(res).toEqual({
            message: "fake resposne from data cart", input: mockData
        })
    })
})