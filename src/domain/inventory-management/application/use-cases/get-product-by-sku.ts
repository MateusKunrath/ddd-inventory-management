import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Product } from '../../enterprise/entities/product'
import { ProductsRepository } from '../repositories/products-repository'

interface GetProductBySkuUseCaseRequest {
  sku: string
}

type GetProductBySkuUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    product: Product
  }
>

export class GetProductBySkuUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    sku,
  }: GetProductBySkuUseCaseRequest): Promise<GetProductBySkuUseCaseResponse> {
    const product = await this.productsRepository.findBySku(sku)

    if (!product) {
      return left(new ResourceNotFoundError('Product'))
    }

    return right({ product })
  }
}
