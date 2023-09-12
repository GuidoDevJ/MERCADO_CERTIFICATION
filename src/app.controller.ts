import { Body, Controller, Get, Post } from '@nestjs/common';
import { MercadoPagoService } from './app.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller()
export class MercadoPagoController {
  constructor(private readonly appService: MercadoPagoService) {}

  @Post('create-order')
  createPayment(@Body() body: CreatePaymentDto) {
    return this.appService.createPayment(body);
  }

  @Post('webhook')
  webhook(@Body() body: any) {
    return this.appService.webhook(body);
  }

}
