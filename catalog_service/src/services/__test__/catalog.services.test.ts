// import { ICatalogRepository } from "../../interface/catalogReoisitory.interface";
// import { Product } from "../../models/product.model";
// import { MockCatalogRepositiry } from "../../repository/mockCatalog.repository";
// import { CatalogService } from "../catalog.service";
// import { faker } from '@faker-js/faker';
// import { Factory } from 'rosie';

// const productFactory = new Factory<Product>()
//     .attr("id", faker.number.int({ min: 1, max: 1000 }))
//     .attr("name", faker.commerce.productName())
//     .attr("description", faker.commerce.productDescription())
//     .attr("stock", faker.number.int({ min: 10, max: 100 }))
//     .attr("price", +faker.commerce.price());

// const mockProduct = (data) => {
//     return {
//         name: faker.commerce.productName(),
//         description: faker.commerce.productDescription(),
//         price: +faker.number.int({ min: 10, max: 100 }),
//         stock: +faker.commerce.price(),
//         ...data
//     }
// }


// describe("catalogService", () => {

//     let repository: ICatalogRepository
//     beforeEach(() => {
//         repository = new MockCatalogRepositiry();
//     });

//     afterAll(() => {
//         repository = {} as MockCatalogRepositiry;
//     });

//     describe("creteProduct", () => {

//         test.skip("should create product", async () => {
//             const service = new CatalogService(repository);
//             const reqBody = mockProduct({});
//             const result = await service.createProduct(reqBody);
//             expect(result).toMatchObject({
//                 id: expect.any(Number),
//                 name: expect.any(String),
//                 description: expect.any(String),
//                 price: expect.any(Number),
//                 stock: expect.any(Number),
//             })
//         })

//         test.skip("should throw error with product unable to create", async () => {
//             const service = new CatalogService(repository);
//             const reqBody = mockProduct({});

//             jest.spyOn(repository, 'create').mockImplementation(() => Promise.resolve({} as Product));

//             await expect(service.createProduct(reqBody)).rejects.toThrow(
//                 "unable to create product"
//             );
//         });

//         test.skip("should throw error with product already exist", async () => {
//             const service = new CatalogService(repository);
//             const reqBody = mockProduct({});

//             jest.spyOn(repository, 'create').mockImplementation(() => Promise.reject(new Error("product already exist")));

//             await expect(service.createProduct(reqBody)).rejects.toThrow(
//                 "product already exist"
//             );
//         });
//     });

//     describe("update product", () => {
//         test.skip("should create product", async () => {
//             const service = new CatalogService(repository);
//             const reqBody = mockProduct({
//                 id: faker.number.int({ min: 10, max: 100 })
//             });
//             const result = await service.updateProduct(reqBody);
//             expect(result).toMatchObject(reqBody)
//         })

//         test.skip("should throw error with product does not exist", async () => {
//             const service = new CatalogService(repository);

//             jest
//                 .spyOn(repository, "update")
//                 .mockImplementationOnce(() =>
//                     Promise.reject(new Error("product does not exist"))
//                 );

//             await expect(service.updateProduct({})).rejects.toThrow(
//                 "product does not exist"
//             );
//         });
//     })

//     describe("getProducts", () => {
//         test.skip("should get products by offset and limit", async () => {
//             const service = new CatalogService(repository);
//             const randomLimit = faker.number.int({ min: 10, max: 50 });
//             const products = productFactory.buildList(randomLimit);
//             jest
//                 .spyOn(repository, "find")
//                 .mockImplementationOnce(() => Promise.resolve(products));

//             const result = await service.getProducts(randomLimit, 0);
//             expect(result.length).toEqual(randomLimit);
//             expect(result).toMatchObject(products);
//         });

//         test.skip("should throw error with products does not exist", async () => {
//             const service = new CatalogService(repository);

//             jest
//                 .spyOn(repository, "find")
//                 .mockImplementationOnce(() =>
//                     Promise.reject(new Error("products does not exist"))
//                 );

//             await expect(service.getProducts(0, 0)).rejects.toThrow(
//                 "products does not exist"
//             );
//         });
//     });

//     describe("getProduct", () => {
//         test.skip("should get product by id", async () => {
//             const service = new CatalogService(repository);
//             const product = productFactory.build();
//             jest
//                 .spyOn(repository, "findOne")
//                 .mockImplementationOnce(() => Promise.resolve(product));

//             const result = await service.getProduct(product.id!);
//             expect(result).toMatchObject(product);
//         });
//     });

//     describe("deleteProduct", () => {
//         test.only("should delete product by id", async () => {
//             const service = new CatalogService(repository);
//             const product = productFactory.build();
//             jest
//                 .spyOn(repository, "delete")
//                 .mockImplementationOnce(() => Promise.resolve({ id: product.id }));

//             const result = await service.deleteProduct(product.id!);
//             expect(result).toMatchObject({
//                 id: product.id,
//             });
//         });
//     })
// })
// // 