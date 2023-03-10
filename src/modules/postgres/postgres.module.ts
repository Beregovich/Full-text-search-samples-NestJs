import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FindPostInPostgresUseCase } from './use-cases/find-post-in-postgres.useCase';
import { PostgresController } from './api/postgres.controller';
import { InsertPostInPostgresUseCase } from './use-cases/insert-post-in-postgres.useCase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SamplePostEntity } from './infrastructure/sample-post.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: 5432,
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: { rejectUnauthorized: false },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([SamplePostEntity]),
  ],

  providers: [FindPostInPostgresUseCase, InsertPostInPostgresUseCase],
  controllers: [PostgresController],
})
export class PostgresModule {}
