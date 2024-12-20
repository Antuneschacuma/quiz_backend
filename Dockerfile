FROM node:20

# Instalar o pnpm globalmente
RUN npm install -g pnpm

# Configurar o diretório de trabalho
WORKDIR /usr/src/quiz-backend

# Copiar os arquivos package.json e pnpm-lock.yaml para o container
COPY package.json pnpm-lock.yaml ./

# Instalar dependências usando pnpm
RUN pnpm install

# Copiar o restante dos arquivos para o container
COPY . .

# Expor a porta 3000
EXPOSE 3000

# Definir a variável de ambiente para a porta
ENV PORT=3000

# Comando para rodar a aplicação
CMD ["pnpm", "dev"]
