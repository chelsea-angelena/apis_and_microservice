import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './entity/provider.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Provider]),
    ClientsModule.register([
      {
        name: 'SUBSCRIBER_SERVICE',
        transport: Transport.TCP,
      },
    ]),
  ],
  controllers: [ProviderController],
  providers: [ProviderService],
})
export class ProviderModule {}
