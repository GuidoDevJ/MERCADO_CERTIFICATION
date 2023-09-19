import { Injectable, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CreatePaymentDto } from './dto/create-payment.dto';
import * as mercadopago from 'mercadopago';

@Injectable()
export class MercadoPagoService {
  
  constructor(
    private readonly configService:ConfigService
  ) {
    mercadopago?.configure({
      access_token: this.configService.get("ACCESS_TOKEN")
    })
  }
  createPayment = async (body: CreatePaymentDto) => {
 
      const preference = {
        items: [
          {
            title: body.title,
            unit_price:body.unit_price,
            quantity: body.quantity,
            picture_url: body.picture_url
          }
        ],
        auto_return: "approved",
        "back_urls": {
          "success": "https://www.google.com",
          "failure": "https://www.failure.com",
          "pending": "https://www.pending.com"
        },
        payment_methods: {
            excluded_payment_methods: [
                {
                  id: "visa"
                }
            ],
            installments: 6
        },
        notification_url: `${this.configService.get("HOST_URL")}/webhook`,
        external_reference: "guidogauna9@gmail.com"

      }
       
      const response = await mercadopago?.preferences.create(preference as any);
      return {url:response.body.init_point}
}
async webhook(body: any) {
  console.log(body)
}
}
