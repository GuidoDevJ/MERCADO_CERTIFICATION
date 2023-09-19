import { Module } from '@nestjs/common';
import { MercadoPagoController } from './app.controller';
import { MercadoPagoService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [MercadoPagoController],
  providers: [MercadoPagoService],
})
export class AppModule {}
