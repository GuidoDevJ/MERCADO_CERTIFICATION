import { Injectable, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CreatePaymentDto } from './dto/create-payment.dto';
import * as mercadopago from 'mercadopago';
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';

@Injectable()
export class MercadoPagoService {
  client;
  payment;
  preference;
  constructor(private readonly configService: ConfigService) {
    this.client = new MercadoPagoConfig({
      accessToken: this.configService.get('ACCESS_TOKEN'),
    });
    this.payment = new Payment(this.client);
    this.preference = new Preference(this.client);
  }

  createPayment = async (body: CreatePaymentDto) => {
    const preference = {
      items: [
        {
          title: body.title,
          unit_price: body.unit_price,
          quantity: body.quantity,
          picture_url: body.picture_url,
        },
      ],
      auto_return: 'approved',
      back_urls: {
        success: 'https://www.google.com',
        failure: 'https://www.failure.com',
        pending: 'https://www.pending.com',
      },
      payment_methods: {
        excluded_payment_methods: [
          {
            id: 'visa',
          },
        ],
        installments: 6,
      },
      notification_url: `${this.configService.get('HOST_URL')}/webhook`,
      external_reference: 'guidogauna9@gmail.com',
    };
    try {
      const response = await this.preference.create({
        body: {
          ...preference,
        },
      });
      return { url: response.sandbox_init_point };
    } catch (e) {
      console.log('Estoy en error ==>', e);
      return e;
    }
  };
  async webhook(body: any) {
    console.log(body);
  }
}
