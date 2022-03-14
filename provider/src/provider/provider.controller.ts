import {
  Controller,
  Param,
  Delete,
  Patch,
  Post,
  Body,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateProviderDto, CreateSubscriberDto } from './dto/provider.dto';

@Controller('Provider')
@UseInterceptors(ClassSerializerInterceptor)
export class ProviderController {
  constructor(
    @Inject('SUBSCRIBER_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  async getAllSubscribers() {
    return await this.client.send(
      { cmd: 'get-all-subscribers' },
      'Optional Message or data',
    );
  }

  @Post()
  async createSubscriber(@Body() data: CreateSubscriberDto) {
    console.log(data);
    return this.client.send(
      {
        cmd: 'add-subscriber',
      },
      data,
    );
  }

  @Get(':id')
  async getSingleSubscriber(@Param('id') id: number) {
    return this.client.send({ cmd: 'get-single-subscriber' }, id);
  }
  @Patch(':id')
  async updateSubscriber(
    @Param('id') id: number,
    @Body() data: UpdateProviderDto,
  ) {
    return this.client.send({ cmd: 'update-subscriber' }, { id, data });
  }

  @Delete(':id')
  async deleteSubscriber(@Param('id') id: number) {
    return this.client.send({ cmd: 'delete-subscriber' }, id);
  }
}
