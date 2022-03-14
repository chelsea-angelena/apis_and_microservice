export class CreateProviderDto {
  recipientName: string;
}

export class CreateSubscriberDto {
  name: string;
  email: string;
}

export class UpdateProviderDto extends CreateProviderDto {}
