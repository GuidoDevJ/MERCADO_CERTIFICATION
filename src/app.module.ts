import { Module } from '@nestjs/common';
import { MercadoPagoController } from './app.controller';
import { MercadoPagoService } from './app.service';

@Module({
  imports: [],
  controllers: [MercadoPagoController],
  providers: [MercadoPagoService],
})
export class AppModule {}
