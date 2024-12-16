import fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { fastifyHelmet } from '@fastify/helmet';
import dotenv from 'dotenv';

dotenv.config();

class Server {
  private app: FastifyInstance;
  private readonly port: number;
  private readonly host: string;

  constructor() {
    this.app = fastify({
      logger: {
        level: 'info',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          },
        },
      },
    });

    this.port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    this.host = process.env.HOST || '0.0.0.0';

    this.registerMiddlewares();
    this.registerRoutes();
  }

  private registerMiddlewares(): void {
    // Registrar middleware CORS
    this.app.register(cors, {
      origin: ['*'], // Configure conforme necessário para sua aplicação
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });

    // Adicionar segurança com Helmet
    this.app.register(fastifyHelmet, {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
        },
      },
    });
  }

  private registerRoutes(): void {
    // Rota de teste
    this.app.get('/', async (request, reply) => {
      return {
        message: 'Servidor está funcionando!',
        timestamp: new Date().toISOString(),
      };
    });
  }

  public async start(): Promise<void> {
    try {
      await this.app.listen({ port: this.port, host: this.host });
      this.app.log.info(`🚀 Servidor rodando em ${this.host}:${this.port}`);
    } catch (err) {
      this.app.log.error(err);
      process.exit(1);
    }
  }

  public async stop(): Promise<void> {
    try {
      await this.app.close();
      console.log('Servidor encerrado graciosamente');
      process.exit(0);
    } catch (err) {
      console.error('Erro ao encerrar o servidor', err);
      process.exit(1);
    }
  }
}

// Tratamento de encerramento gracioso
const server = new Server();

process.on('SIGINT', async () => {
  await server.stop();
});

// Inicie o servidor
server.start();

export default server;
