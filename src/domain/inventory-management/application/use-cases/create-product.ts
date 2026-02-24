import { Either, right } from '@/core/either'
import { Product } from '../../enterprise/entities/product'
import { ProductsRepository } from '../repositories/products-repository'

interface CreateProductUseCaseRequest {
  description: string
  size: string
  color: string
}

type CreateProductUseCaseResponse = Either<
  null,
  {
    product: Product
  }
>

export class CreateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    description,
    size,
    color,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const product = Product.create({
      description,
      size,
      color,
    })

    await this.productsRepository.create(product)

    return right({ product })
  }
}
