import { Injectable, Post } from '@nestjs/common';
import * as mercadopago from 'mercadopago';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class MercadoPagoService {
  
  constructor(
    
  ) {
    mercadopago?.configure({
      access_token: 'APP_USR-8709825494258279-092911-227a84b3ec8d8b30fff364888abeb67a-1160706432'
    })
  }
  createPayment = async (body: CreatePaymentDto) => {
 
      const preference = {
        items: [
          {
            title: body.title,
            unit_price:body.unit_price,
            quantity: body.quantity,
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
        notification_url: "https://6503-181-12-48-31.ngrok-free.app/webhook",
        external_reference: "guidogauna9@gmail.com"

      }
       
      const response = await mercadopago?.preferences.create(preference as any);
      return response.body.init_point
}
async webhook(body: any) {
  console.log(body)
}
}
