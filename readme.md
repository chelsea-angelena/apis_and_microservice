## Description

This is a very barebones minimal example of setting up two separate nest APIS which run indepedently but are connected through a microservice. For the sake of simplicity both apps have been committed to the same repo, but these could live each in their own repository. The each have a different url, different database, and their own endpoints.

I am using TCP but Redis and RabbitMQ can be easily swapped in with minimal changes

**The "Subscriber"**

- runs on port 8000 in local (would be deployed independently and have it's own baseURL)
- Calls two instances of "app.listen":
  - `main.ts`: NestFactory.create(), exposes the endpoints and CRUD operations of the application.
  - `listen.ts`: NestFactory.createMicroservice, which listens to messages and events sent or emitted from the Provider Application. Receives data from the provider in this way.
- Has two root configs: `nest-cli.json` and `listen.json`

**The "Provider"**

- runs on port 8001 in local (would be deployed independently and have it's own baseURL)
- `main.ts`: Calls NestFactory.create() -> app.listen()
- Has an instance of CreateClientProxy from nestjs microservices within the Provider Module.
  - This client proxy is injected into the Provider controller, and whenever we hit these endpoints, the @EventPattern and @MessagePattern will send or emit the provided data over to the listener in the Subscribers Service.

![alt text](https://github.com/chelsea-angelena/microservices/blob/main/diagram.png?raw=true)

## Dependencies

- Node
- npm or yarn pkg manager
- nest cli
  - nestjs/micrservices
  - nestjs/common
  - nestjs/config
  - typeorm
  - nestjs/typeorm
  - pg
  - hapi/joi
  - class transformer

## Installation - Subscriber

```
$ npm install

```

## Running the Subscriber/Microservice Listener

```
**Open a new terminal**
# watch mode
$ npm run listen

```

## Running the Subscriber API

```
**Open a new terminal**
# watch mode
$ npm run start:dev

```

## Installation - Provider

```
$ npm install

```

## Running the Provider API

```
**Open a new terminal**
# watch mode
$ npm run start:dev

```

## Links To Sources

<a href="https://www.youtube.com/watch?v=IsubcKdZPyE">Antonio Papa - Scalable Scripts</a>

This guy is my favourite.
Youtube video - prior nestjs experience would be helpful for this tutorial.
About half way through access the microservices stuff
He explains how to set up two listeners from the same app.

<a href="https://www.youtube.com/watch?v=IpoaVi9iPWI">Brian Johnson</a>

Another youtube video. I found this one to be missing some steps and also had to troubleshoot a few errors that weren't covered in the tutorials. Videos are short though and he does a good job explaining some of concepts and setting up gRPC (this is a series of four video... grpc is last)

<a href="https://docs.nestjs.com/microservices/basics">Official Nestjs docs</a>

## License

[MIT licensed](LICENSE).
