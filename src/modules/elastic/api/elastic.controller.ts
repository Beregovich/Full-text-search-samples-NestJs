import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { FindPostUseCase } from '../use-cases/find-post.useCase';
import { Post } from '../dto/create-post.dto';
import { InsertPostInEsUseCase } from '../use-cases/insert-post-in-es.useCase';
import { GetAutocompleteUseCase } from '../use-cases/get-autocomplete.useCase';

@Controller('elastic')
export class ElasticController {
  constructor(
    private readonly findPostUseCase: FindPostUseCase,
    private readonly getAutocompleteUseCase: GetAutocompleteUseCase,
    private readonly insertPostInEsUseCase: InsertPostInEsUseCase,
  ) {}
  @Get()
  async findPosts(@Query('term') term: string) {
    return await this.findPostUseCase.execute(term);
  }
  @Get('autocomplete')
  async getAutocomplete(@Query('term') term: string) {
    return await this.getAutocompleteUseCase.execute(term);
  }
  @Put()
  async createPost(@Body() post: Post) {
    return await this.insertPostInEsUseCase.execute(post);
  }
}