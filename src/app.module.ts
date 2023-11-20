import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MercadoPagoController } from './app.controller';
import { MercadoPagoService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CorsMiddleware } from './cors.middleware';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [MercadoPagoController],
  providers: [MercadoPagoService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
