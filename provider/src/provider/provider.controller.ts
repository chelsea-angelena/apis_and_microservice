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
import { UpdateProviderDto, CreateProviderDto } from './dto/provider.dto';

@Controller('Provider')
@UseInterceptors(ClassSerializerInterceptor)
export class ProviderController {
  constructor(
    @Inject('SUBSCRIBER_SERVICE') private readonly client: ClientProxy,
    private readonly provService: ProviderService,
  ) {}

  @Get()
  async getProvider() {
    return this.client.emit('Hello', 'hello from microservice');
  }
  @Get('id')
  async getSubscriber(@Param('id') id: number) {
    return await this.provService.getOne(id);
  }
  @Patch('id')
  async update(@Param('id') id: number, @Body() data: UpdateProviderDto) {
    return await this.provService.update(id, data);
  }

  @Delete('id')
  async delete(@Param('id') id: number) {
    return await this.provService.delete(id);
  }

  @Post()
  async createSubscriber(@Body() data: CreateProviderDto) {
    console.log(data);
    return await this.provService.addSubscriber(data);
  }
}
