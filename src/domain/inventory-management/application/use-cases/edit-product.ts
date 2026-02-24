import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Product } from '../../enterprise/entities/product'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ProductsRepository } from '../repositories/products-repository'

interface EditProductUseCaseRequest {
  productId: string
  description: string
  size: string
  color: string
}

type EditProductUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    product: Product
  }
>

export class EditProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    productId,
    description,
    size,
    color,
  }: EditProductUseCaseRequest): Promise<EditProductUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      return left(new ResourceNotFoundError('Product'))
    }

    product.description = description
    product.size = size
    product.color = color

    await this.productsRepository.save(product)

    return right({ product })
  }
}
