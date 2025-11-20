# cupcake-e-commerce-frontend
Frontend for the cupcake e-commerce project

                                                                                                                                                                              
# 🧁 Galaxy Cupcakes                                                                                                                                                          
                                                                                                                                                                              
<div align="center">                                                                                                                                                          
  <img src="public/logo.svg" alt="Galaxy Cupcakes Logo" width="400">                                                                                                          
                                                                                                                                                                              
  ### Sabor que vem das estrelas ⭐                                                                                                                                           
                                                                                                                                                                              
  [![Nuxt 4](https://img.shields.io/badge/Nuxt-4.x-00DC82?logo=nuxt.js&logoColor=white)](https://nuxt.com/)                                               
  [![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)                                                 
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)                         
  [![PrimeVue](https://img.shields.io/badge/PrimeVue-Latest-41B883)](https://primevue.org/)                                                               
</div>                                                                                                                                                                        
                                                                                                                                                                              
---                                                                                                                                                                           
                                                                                                                                                                              
## 📋 Índice
                                                                                                                                                                              
- [Sobre o Projeto](#-sobre-o-projeto)                                                                                                                                        
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#%EF%B8%8F-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)                                                                                                                              
- [Instalação](#-instalação)                                                                                                                                                  
- [Configuração](#%EF%B8%8F-configura%C3%A7%C3%A3o)                                                                                                                                              
- [Como Usar](#-como-usar)                                                                                                                                                    
- [Autenticação](#-autenticação)                                                                                                                                              
- [Internacionalização](#-internacionalização)                                                                                                                                
- [API e Serviços](#-api-e-serviços)
- [Componentes Principais](#-componentes-principais)
- [Estados de Pedido](#-estados-de-pedido)
- [Design System](design-system)
- [Segurança](#-segurança)
- [Fluxos de Uso](#-fluxos-de-uso)
- [Validações Implementadas](#-validações-implementadas)
- [Recursos Mobile](#-recursos-mobile)
- [Métodos de Pagamento](#-métodos-de-pagamento)
- [Autor](#-autor)                                                                                                        
                                                                                                                                                        
                                                                                                                                                                              
---                                                                                                                                                                           
                                                                                                                                                                              
## 🎯 Sobre o Projeto                                                                                                                                                         
                                                                                                                                                                              
**Galaxy Cupcakes** é uma plataforma completa de e-commerce especializada em cupcakes gourmet artesanais. Desenvolvida com as mais modernas tecnologias web, oferece uma experiência de compra intuitiva e agradável.
                                                                                                                                                                                                                                    
                                                                                                                                                                              
---                                                                                                                                                                           
                                                                                                                                                                              
## ✨ Funcionalidades                                                                                                                                                         
                                                                                                                                                                              
### 👤 Área do Cliente                                                                                                                                                        
                                                                                                                                                                              
#### 🛒 Compras                                                                                                                                                               
- [x] Catálogo de produtos com visualização em lista ou grid                                                                                                                  
- [x] Produtos em destaque na página inicial                                                                                                                                  
- [x] Badge visual para produtos em promoção                                                                                                                                  
- [x] Carrinho de compras com persistência                                                                                                                                    
- [x] Ajuste de quantidades                                                                                                                                                   
- [x] Cálculo automático de totais                                                                                                                                            
                                                                                                                                                                              
#### 📦 Pedidos                                                                                                                                                               
- [x] Finalização de compra                                                                                                                                                   
- [x] Seleção de endereço de entrega                                                                                                                                          
- [x] Múltiplos métodos de pagamento                                                                                                                                          
- [x] Histórico completo de pedidos                                                                                                                                           
- [x] Detalhes de cada pedido                                                                                                                                                 
- [x] Acompanhamento de status                                                                                                                                                
                                                                                                                                                                              
#### 👨‍💼 Perfil                                                                                                                                                              
- [x] Visualização de dados pessoais                                                                                                                                          
- [x] Edição de perfil                                                                                                                                                        
- [x] Gerenciamento de endereços de entrega                                                                                                                                   
- [x] Formatação automática de CPF                                                                                                                                            
                                                                                                                                                                              
#### 🔐 Autenticação                                                                                                                                                          
- [x] Login com JWT                                                                                                                                                           
- [x] Cadastro de novos usuários                                                                                                                                              
- [x] Renovação automática de tokens                                                                                                                                          
- [x] Logout seguro                                                                                                                                                           
                                                                                                                                                                              
### 🛠️ Área Administrativa (Staff)                                                                                                                                            
                                                                                                                                                                              
#### 📦 Produtos                                                                                                                                                              
- [x] Listagem completa de produtos                                                                                                                                           
- [x] Adicionar novos produtos                                                                                                                                                
- [x] Editar produtos existentes                                                                                                                                              
- [x] Excluir produtos (com confirmação)                                                                                                                                      
- [x] Upload de imagens                                                                                                                                                       
- [x] Controle de estoque                                                                                                                                                     
- [x] Marcação de promoções                                                                                                                                                   
                                                                                                                                                                              
#### 📋 Pedidos                                                                                                                                                               
- [x] Visualização de todos os pedidos                                                                                                                                        
- [x] Filtro por status                                                                                                                                                       
- [x] Detalhes completos de pedidos                                                                                                                                           
- [x] Atualização de status                                                                                                                                                   
- [x] Informações do cliente                                                                                                                                                  
- [x] Estatísticas rápidas                                                                                                                                                    
                                                                                                                                                                              
### 📱 Recursos Gerais                                                                                                                                                        
- [x] Design responsivo (mobile-first)                                                                                                                                        
- [x] Internacionalização (PT-BR e EN-US)                                                                                                                                     
- [x] Notificações toast                                                                                                                                                      
- [x] Modais informativos (Sobre, Contato)                                                                                                                                    
- [x] Validação de formulários                                                                                                                                                
- [x] Estados de loading                                                                                                                                                      
- [x] Tratamento de erros                                                                                                                                                     
                                                                                                                                                                              
---

## 🛠️ Tecnologias

### Frontend                                                                                                                                                                  
- **[Nuxt 4](https://nuxt.com/)** - Framework Vue.js para aplicações web                                                                                                      
- **[Vue 3](https://vuejs.org/)** - Framework JavaScript progressivo                                                                                                          
- **[PrimeVue](https://primevue.org/)** - Biblioteca de componentes UI                                                                                                        
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitário                                                                                                     
- **[Vue I18n](https://vue-i18n.intlify.dev/)** - Internacionalização                                                                                                         
                                                                                                                                                                              
### Bibliotecas Adicionais                                                                                                                                                    
- **[VueUse](https://vueuse.org/)** - Coleção de composables Vue                                                                                                              
- **[PrimeVue Toast](https://primevue.org/toast/)** - Sistema de notificações                                                                                                 
                                                                                                                                                                              
### Autenticação                                                                                                                                                              
- **JWT (JSON Web Tokens)** - Autenticação stateless                                                                                                                          
- **LocalStorage** - Persistência de sessão                                                                                                                                   
                                                                                                                                                                              
---                                                                                                                                                                           
                                                                                                                                                                              
## 📁 Estrutura do Projeto                                                                                                                                                    
                                                                                                                                                                              

galaxy-cupcakes/                                                                                                                                                              
│                                                                                                                                                                             
├── app/                                                                                                                                                                      
│   │                                                                                                                                                                         
│   ├── components/                    # Componentes Vue reutilizáveis                                                                                                        
│   │   ├── AboutModal.vue             # Modal "Sobre Nós"                                                                                                                    
│   │   ├── ContactModal.vue           # Modal de contato                                                                                                                     
│   │   ├── HeroSection.vue            # Seção hero com produtos em destaque                                                                                                  
│   │   ├── LoginModal.vue             # Modal de login                                                                                                                       
│   │   ├── NavBar.vue                 # Barra de navegação                                                                                                                   
│   │   ├── ProductDataView.vue        # Visualização de produtos                                                                                                             
│   │   └── SignupModal.vue            # Modal de cadastro                                                                                                                    
│   │                                                                                                                                                                         
│   ├── composables/                   # Lógica reutilizável                                                                                                                  
│   │   ├── useAboutModal.js           # Controle do modal "Sobre"                                                                                                            
│   │   ├── useAuth.js                 # Autenticação e autorização                                                                                                           
│   │   ├── useCart.js                 # Gerenciamento do carrinho                                                                                                            
│   │   ├── useContactModal.js         # Controle do modal de contato                                                                                                         
│   │   ├── useLoginModal.js           # Controle do modal de login                                                                                                           
│   │   ├── useMapEndpointResponse.js  # Mapeamento de dados da API                                                                                                           
│   │   ├── useRequests.js             # Requisições HTTP                                                                                                                     
│   │   ├── useServices.js             # Injeção de serviços                                                                                                                  
│   │   └── useSignupModal.js          # Controle do modal de cadastro                                                                                                        
│   │                                                                                                                                                                         
│   ├── middleware/                    # Middlewares de rota                                                                                                                  
│   │   ├── auth.js                    # Proteção de rotas autenticadas                                                                                                       
│   │   └── staff.js                   # Proteção de rotas administrativas                                                                                                    
│   │                                                                                                                                                                         
│   ├── pages/                         # Páginas da aplicação                                                                                                                 
│   │   ├── product/                                                                                                                                                          
│   │   │   └── index.vue              # Catálogo de produtos                                                                                                                 
│   │   │                                                                                                                                                                     
│   │   ├── order/                                                                                                                                                            
│   │   │   └── index.vue              # Finalização de pedido                                                                                                                
│   │   │                                                                                                                                                                     
│   │   ├── profile/                                                                                                                                                          
│   │   │   ├── index.vue              # Perfil do usuário                                                                                                                    
│   │   │   ├── edit.vue               # Editar perfil                                                                                                                        
│   │   │   │                                                                                                                                                                 
│   │   │   ├── addresses/                                                                                                                                                    
│   │   │   │   ├── index.vue          # Lista de endereços                                                                                                                   
│   │   │   │   └── new.vue            # Adicionar endereço                                                                                                                   
│   │   │   │                                                                                                                                                                 
│   │   │   └── orders/                                                                                                                                                       
│   │   │       ├── index.vue          # Histórico de pedidos                                                                                                                 
│   │   │       └── [uuid].vue         # Detalhes do pedido                                                                                                                   
│   │   │                                                                                                                                                                     
│   │   └── staff/                                                                                                                                                            
│   │       ├── products/                                                                                                                                                     
│   │       │   ├── index.vue          # Gerenciar produtos                                                                                                                   
│   │       │   ├── new.vue            # Adicionar produto                                                                                                                    
│   │       │   └── edit/                                                                                                                                                     
│   │       │       └── [uuid].vue     # Editar produto                                                                                                                       
│   │       │                                                                                                                                                                 
│   │       └── orders/                                                                                                                                                       
│   │           ├── index.vue          # Gerenciar pedidos                                                                                                                    
│   │           └── [uuid].vue         # Editar pedido                                                                                                                        
│   │                                                                                                                                                                         
│   ├── services/                      # Serviços de API                                                                                                                      
│   │   ├── authService.js                                                                                                                                                    
│   │   └── entity/                                                                                                                                                           
│   │       ├── deliveryAddressService.js                                                                                                                                     
│   │       ├── orderItemsService.js                                                                                                                                          
│   │       ├── orderService.js                                                                                                                                               
│   │       ├── productService.js                                                                                                                                             
│   │       └── userService.js                                                                                                                                                
│   │                                                                                                                                                                         
│   └── utils/                         # Utilitários                                                                                                                          
│       └── jwt.js                     # Funções para manipulação de JWT                                                                                                      
│                                                                                                                                                                             
├── i18n/                              # Internacionalização                                                                                                                  
│   └── locales/                                                                                                                                                              
│       ├── pt-BR.json                 # Traduções em português                                                                                                               
│       └── en-US.json                 # Traduções em inglês                                                                                                                  
│                                                                                                                                                                             
├── public/                            # Arquivos estáticos                                                                                                                   
│   ├── banner.png                                                                                                                                                            
│   ├── cart.svg                                                                                                                                                              
│   ├── logo.svg                                                                                                                                                              
│   └── imagotipo.svg                                                                                                                                                         
│                                                                                                                                                                             
├── .env                               # Variáveis de ambiente                                                                                                                
├── nuxt.config.ts                     # Configuração do Nuxt                                                                                                                 
├── tailwind.config.js                 # Configuração do Tailwind                                                                                                             
└── package.json                       # Dependências do projeto                                                                                                              
           
                                                                                                                                                                              
---                                                                                                                                                                           
                                                                                                                                                                              
## 🚀 Instalação                                                                                                                                                              
                                                                                                                                                                              
### Pré-requisitos                                                                                                                                                            
                                                                                                                                                                              
- **Node.js** 18.x ou superior                                                                                                                                                
- **npm** ou **yarn**                                                                                                                                                         
- **Backend API** rodando (Django Ninja)                                                                                                                             
                                                                                                                                                                              
### Passos                                                                                                                                                                    
                                                                                                                                                                      
1. Clonar o repositório
```bash                                                                                                                                                     
git clone https://github.com/seu-usuario/galaxy-cupcakes.git
```                                                                                                                 


2. Entrar no diretório
```bash
cd galaxy-cupcakes
```                                                                                                                                                            
                                                                                                                                                                              
3. Instalar dependências
```bash
npm install
```                                                                                                                                                                   
                                                                                                                                                                              
4. Configurar variáveis de ambiente
```bash
cp .env.example .env
```                                                                                                                                                          
                                                                                                                                                                              

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

## ⚙️ Configuração                                                                                                                                                               

Variáveis de Ambiente                                                                                                                                                         

Crie um arquivo .env na raiz do projeto:                                                                                                                                      

                                                                                                                                                                              
URL base da API                                                                                                                                                             
NUXT_PUBLIC_API_BASE=http://localhost:8000                                                                                                                                    
                                                                                                                                                                              

Configuração do Nuxt                                                                                                                                                          

O arquivo nuxt.config.ts já está configurado com:                                                                                                                             

-  PrimeVue                                                                                                                                                                   
-  Tailwind CSS                                                                                                                                                               
-  Vue I18n                                                                                                                                                                   
-  Runtime config                                                                                                                                                             

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

## 💻 Como Usar                                                                                                                                                                  

Desenvolvimento                                                                                                                                                               

                                                                                                                                                                              
Iniciar servidor de desenvolvimento                                                                                                                                         
npm run dev                                                                                                                                                                   
                                                                                                                                                                              
Aplicação disponível em http://localhost:3000                                                                                                                               
                                                                                                                                                                              

Produção                                                                                                                                                                      

                                                                                                                                                                              
Gerar build de produção                                                                                                                                                     
npm run build                                                                                                                                                                 
                                                                                                                                                                              
Iniciar servidor de produção                                                                                                                                                
npm run start                                                                                                                                                                 
                                                                                                                                                                              
Preview do build                                                                                                                                                            
npm run preview                                                                                                                                                               
                                                                                                                                                                              

Linting                                                                                                                                                                       

                                                                                                                                                                              
Verificar código                                                                                                                                                            
npm run lint                                                                                                                                                                  
                                                                                                                                                                              
Corrigir problemas automaticamente                                                                                                                                          
npm run lint:fix                                                                                                                                                              
                                                                                                                                                                              

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

## 🔐 Autenticação                                                                                                                                                               

Sistema de Tokens JWT                                                                                                                                                         

A aplicação utiliza um sistema de autenticação baseado em JWT com dois tipos de tokens:                                                                                       

Access Token                                                                                                                                                                  

-  Duração: Curta (geralmente 15-60 minutos)                                                                                                                                  
-  Uso: Autenticação de requisições à API                                                                                                                                     
-  Renovação: Automática quando próximo da expiração                                                                                                                          

Refresh Token                                                                                                                                                                 

-  Duração: Longa (geralmente 7-30 dias)                                                                                                                                      
-  Uso: Renovar o access token                                                                                                                                                
-  Armazenamento: LocalStorage                                                                                                                                                

Fluxo de Autenticação                                                                                                                                                         

                                                                                                                                                                              
graph LR                                                                                                                                                                      
    A[Login] --> B[Recebe Tokens]                                                                                                                                             
    B --> C[Armazena em LocalStorage]                                                                                                                                         
    C --> D[Busca Dados do Usuário]                                                                                                                                           
    D --> E[Usuário Autenticado]                                                                                                                                              
    E --> F{Token Expirando?}                                                                                                                                                 
    F -->|Sim| G[Renova Token]                                                                                                                                                
    F -->|Não| H[Continua Usando]                                                                                                                                             
    G --> E                                                                                                                                                                   
                                                                                                                                                                              

Proteção de Rotas                                                                                                                                                             

Middleware auth                                                                                                                                                               

Protege rotas que requerem autenticação:                                                                                                                                      

                                                                                                                                                                              
definePageMeta({                                                                                                                                                              
  middleware: "auth",                                                                                                                                                         
});                                                                                                                                                                           
                                                                                                                                                                              

Middleware staff                                                                                                                                                              

Protege rotas administrativas:                                                                                                                                                

                                                                                                                                                                              
definePageMeta({                                                                                                                                                              
  middleware: ["auth", "staff"],                                                                                                                                              
});                                                                                                                                                                           
                                                                                                                                                                              

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

## 🌍 Internacionalização                                                                                                                                                        

Idiomas Disponíveis                                                                                                                                                           

| Idioma             | Código | Status     |
|--------------------|--------|------------|
| Português (Brasil) | pt-BR  | ✅ Completo |
| Inglês (EUA)       | en-US  | ✅ Completo |


Estrutura de Tradução                                                                                                                                                         

                                                                                                                                                                              
{                                                                                                                                                                             
  "components_nav-bar_home": "Home",                                                                                                                                          
  "pages_login_title": "Entre com sua conta:",                                                                                                                                
  "pages_staff_products_title": "Gerenciar Produtos"                                                                                                                          
}                                                                                                                                                                             
                                                                                                                                                                              

Convenção de Nomenclatura                                                                                                                                                     

                                                                                                                                                                              
{categoria}_{componente/página}_{chave}                                                                                                                                       
                                                                                                                                                                              

Exemplos:                                                                                                                                                                     

-  components_nav-bar_logout - Componente NavBar                                                                                                                              
-  pages_profile_title - Página de perfil                                                                                                                                     
-  composables_use-requests_unauthorized - Composable useRequests                                                                                                             

Uso no Código                                                                                                                                                                 

```vue                                                                                                                                                                              
<script setup>                                                                                                                                                                
const { t } = useI18n();                                                                                                                                                      
</script>
```                                                                                                                                                                     
```vue                                                                                                                                                                              
<template>                                                                                                                                                                    
  <h1>{{ t("pages_profile_title") }}</h1>                                                                                                                                     
</template>
```                                                                                                                                                                   
                                                                                                                                                                              

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

## 🔌 API e Serviços                                                                                                                                                             

Endpoints Principais                                                                                                                                                          

| Serviço     | Endpoint Base            | Descrição                 |
|-------------|---------------------------|----------------------------|
| Auth        | /api/auth/                | Autenticação e cadastro    |
| Products    | /api/products/            | Gerenciamento de produtos  |
| Orders      | /api/orders/              | Gerenciamento de pedidos   |
| Order Items | /api/order-items/         | Itens de pedidos           |
| Addresses   | /api/delivery-addresses/  | Endereços de entrega       |
| Users       | /api/users/me             | Dados do usuário           |
                                                                      

Serviços Implementados                                                                                                                                                        

ProductService                                                                                                                                                                

                                                                                                                                                                              
// Listar todos os produtos                                                                                                                                                   
await productService.getAllProducts()                                                                                                                                         
                                                                                                                                                                              
// Buscar produto específico                                                                                                                                                  
await productService.getProductByUuid(uuid)                                                                                                                                   
                                                                                                                                                                              
// Criar produto (staff)                                                                                                                                                      
await productService.createProduct(productData)                                                                                                                               
                                                                                                                                                                              
// Atualizar produto (staff)                                                                                                                                                  
await productService.updateProduct(uuid, productData)                                                                                                                         
                                                                                                                                                                              
// Excluir produto (staff)                                                                                                                                                    
await productService.deleteProductByUuid(uuid)                                                                                                                                
                                                                                                                                                                              

OrderService                                                                                                                                                                  

                                                                                                                                                                              
// Criar pedido                                                                                                                                                               
await orderService.createOrder(orderData)                                                                                                                                     
                                                                                                                                                                              
// Atualizar pedido                                                                                                                                                           
await orderService.updateOrder(uuid, orderData)                                                                                                                               
                                                                                                                                                                              
// Confirmar pedido                                                                                                                                                           
await orderService.confirmOrder(uuid)                                                                                                                                         
                                                                                                                                                                              

DeliveryAddressService                                                                                                                                                        

                                                                                                                                                                              
// Listar endereços do usuário                                                                                                                                                
await deliveryAddressService.getAllDeliveryAddresses()                                                                                                                        
                                                                                                                                                                              
// Criar endereço                                                                                                                                                             
await deliveryAddressService.createDeliveryAddress(addressData)                                                                                                               
                                                                                                                                                                              
// Atualizar endereço                                                                                                                                                         
await deliveryAddressService.updateDeliveryAddress(uuid, addressData)                                                                                                         
                                                                                                                                                                              
// Excluir endereço                                                                                                                                                           
await deliveryAddressService.deleteDeliveryAddress(uuid)                                                                                                                      
                                                                                                                                                                              

UserService                                                                                                                                                                   

                                                                                                                                                                              
// Buscar dados do usuário                                                                                                                                                    
await userService.fetchMyUserData()                                                                                                                                           
                                                                                                                                                                              
// Atualizar dados                                                                                                                                                            
await userService.updateMyUserData(userData)                                                                                                                                  
                                                                                                                                                                              
// Alterar senha                                                                                                                                                              
await userService.changeMyPassword(passwordData)                                                                                                                              
                                                                                                                                                                              

Mapeamento de Dados                                                                                                                                                           

A aplicação converte automaticamente entre os formatos do backend (snake_case) e frontend (camelCase):                                                                        

                                                                                                                                                                              
// Backend (snake_case)                                                                                                                                                       
{                                                                                                                                                                             
  first_name: "João",                                                                                                                                                         
  last_name: "Silva",                                                                                                                                                         
  delivery_address: {...}                                                                                                                                                     
}                                                                                                                                                                             
                                                                                                                                                                              
// Frontend (camelCase)                                                                                                                                                       
{                                                                                                                                                                             
  firstName: "João",                                                                                                                                                          
  lastName: "Silva",                                                                                                                                                          
  deliveryAddress: {...}                                                                                                                                                      
}                                                                                                                                                                             
                                                                                                                                                                              

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

## 🎨 Componentes Principais                                                                                                                                                     

NavBar                                                                                                                                                                        

Barra de navegação principal com:                                                                                                                                             

-  Logo e menu de navegação                                                                                                                                                   
-  Dropdown do usuário (quando autenticado)                                                                                                                                   
-  Links para perfil, pedidos e endereços                                                                                                                                     
-  Área administrativa (apenas para staff)                                                                                                                                    
-  Carrinho com badge de quantidade                                                                                                                                           
-  Modais de login e cadastro                                                                                                                                                 

ProductDataView                                                                                                                                                               

Visualização de produtos com:                                                                                                                                                 

-  Alternância entre lista e grid                                                                                                                                             
-  Imagens com altura padronizada                                                                                                                                             
-  Badge de promoção                                                                                                                                                          
-  Botões de adicionar ao carrinho e comprar                                                                                                                                  
-  Seleção de quantidade                                                                                                                                                      
-  Navegação por âncora                                                                                                                                                       

HeroSection                                                                                                                                                                   

Seção de destaque com:                                                                                                                                                        

-  Banner promocional                                                                                                                                                         
-  3 produtos em promoção                                                                                                                                                     
-  Cards clicáveis                                                                                                                                                            
-  Navegação direta para produtos                                                                                                                                             

Modais                                                                                                                                                                        

LoginModal                                                                                                                                                                    

-  Autenticação de usuário                                                                                                                                                    
-  Validação de credenciais                                                                                                                                                   
-  Link para cadastro                                                                                                                                                         

SignupModal                                                                                                                                                                   

-  Cadastro de novo usuário                                                                                                                                                   
-  Validação de campos                                                                                                                                                        
-  Formatação automática de CPF                                                                                                                                               
-  Confirmação de senha                                                                                                                                                       

AboutModal                                                                                                                                                                    

-  História da empresa                                                                                                                                                        
-  Missão e valores                                                                                                                                                           
-  Localização e diferenciais                                                                                                                                                 

ContactModal                                                                                                                                                                  

-  Informações de contato                                                                                                                                                     
-  Formulário de mensagem                                                                                                                                                     
-  Validação e formatação                                                                                                                                                     

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

## 🔄 Estados de Pedido                                                                                                                                                          

Fluxo Completo                                                                                                                                                                

                                                                                                                                                                              
DRAFT (Rascunho)                                                                                                                                                              
  ↓                                                                                                                                                                           
PENDING (Pendente)                                                                                                                                                            
  ↓                                                                                                                                                                           
WAITING_PAYMENT (Aguardando Pagamento)                                                                                                                                        
  ↓                                                                                                                                                                           
CONFIRMED (Confirmado)                                                                                                                                                        
  ↓                                                                                                                                                                           
PREPARATION (Em Preparação)                                                                                                                                                   
  ↓                                                                                                                                                                           
DELIVERY (Em Entrega)                                                                                                                                                         
  ↓                                                                                                                                                                           
DELIVERED (Entregue)                                                                                                                                                          
  ↓                                                                                                                                                                           
FINISHED (Finalizado)                                                                                                                                                         
                                                                                                                                                                              

Status Especial                                                                                                                                                               

 • CANCELED - Pedido cancelado (pode ocorrer em qualquer etapa)                                                                                                               

Cores por Status                                                                                                                                                              

                                                         
| Status          | Cor             | Significado               |         
|-----------------|-----------------|---------------------------|
| DRAFT           | Cinza           | Temporário/Não finalizado | 
| PENDING         | Amarelo         | Em espera                 |
| WAITING_PAYMENT | Laranja         | Ação pendente             | 
| CONFIRMED       | Azul            | Confirmado                | 
| PREPARATION     | Roxo            | Em processamento          | 
| DELIVERY        | Índigo          | Em transporte             | 
| DELIVERED       | Verde           | Entregue                  | 
| FINISHED        | Verde Esmeralda | Concluído                 | 
| CANCELED        | Vermelho        | Cancelado                 |
                                                                 

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

## 🎨 Design System                                                                                                                                                              

Paleta de Cores                                                                                                                                                               

                                                                                                                                                                              
/* Cores Principais */                                                                                                                                                        
--primary-dark: #20004b;                                                                                                                                                      
--primary-light: #3c0074;                                                                                                                                                     
--secondary: #fbbf24;                                                                                                                                                         
                                                                                                                                                                              
/* Estados */                                                                                                                                                                 
--success: #10b981;                                                                                                                                                           
--error: #ef4444;                                                                                                                                                             
--warning: #f59e0b;                                                                                                                                                           
--info: #3b82f6;                                                                                                                                                              
                                                                                                                                                                              

Padrões Visuais                                                                                                                                                               

-  Gradientes: from-[#20004b] to-[#3c0074]                                                                                                                                    
-  Bordas: border-[#ffffff22]                                                                                                                                                 
-  Backgrounds: bg-[#ffffff11]                                                                                                                                                
-  Sombras: shadow-2xl                                                                                                                                                        
-  Arredondamento: rounded-lg                                                                                                                                                 

Responsividade                                                                                                                                                                

                                            
| Breakpoint | Tamanho | Uso               | 
|------------|---------|-------------------|                                                                                                                                                               
| sm         | 640px   | Tablets pequenos  |                                                                                                                                                               
| md         | 768px   | Tablets           |                                                                                                                                                               
| lg         | 1024px  | Desktops pequenos |                                                                                                                                                               
| xl         | 1280px  | Desktops grandes  |                                                                                                                                                               
                                            

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

## 🔒 Segurança                                                                                                                                                                  

Medidas Implementadas                                                                                                                                                         

✅ Autenticação JWT - Tokens seguros                                                                                                                                       
✅ Middleware de Proteção - Rotas protegidas                                                                                                                               
✅ Validação Client-Side - Prevenção de dados inválidos                                                                                                                    
✅ Sanitização de Dados - Limpeza de inputs                                                                                                                                
✅ HTTPS Ready - Preparado para produção segura                                                                                                                            
✅ Logout Automático - Em caso de token inválido                                                                                                                           
✅ Renovação de Tokens - Sessão contínua e segura                                                                                                                          

Boas Práticas                                                                                                                                                                 

                                                                                                                                                                              
// Tokens armazenados de forma segura                                                                                                                                         
localStorage.setItem("access_token", token);                                                                                                                                  
                                                                                                                                                                              
// Renovação automática antes da expiração                                                                                                                                    
if (isTokenExpiringSoon(token)) {                                                                                                                                             
  await refreshAccessToken();                                                                                                                                                 
}                                                                                                                                                                             
                                                                                                                                                                              
// Logout em caso de erro 401                                                                                                                                                 
if (error.response?.status === 401) {                                                                                                                                         
  auth.logout();                                                                                                                                                              
}                                                                                                                                                                             
                                                                                                                                                                              

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

## 📊 Fluxos de Uso                                                                                                                                                              

-  Fluxo de Compra                                                                                                                                                               

                                                                                                                                                                              
1. Usuário navega pelo catálogo                                                                                                                                               
   ↓                                                                                                                                                                          
2. Adiciona produtos ao carrinho                                                                                                                                              
   ↓                                                                                                                                                                          
3. Acessa o carrinho                                                                                                                                                          
   ↓                                                                                                                                                                          
4. Seleciona endereço de entrega                                                                                                                                              
   ↓                                                                                                                                                                          
5. Escolhe método de pagamento                                                                                                                                                
   ↓                                                                                                                                                                          
6. Confirma o pedido                                                                                                                                                          
   ↓                                                                                                                                                                          
7. Pedido criado com status PENDING                                                                                                                                           
   ↓                                                                                                                                                                          
8. Carrinho limpo                                                                                                                                                             
   ↓                                                                                                                                                                          
9. Redirecionado para histórico de pedidos                                                                                                                                    
                                                                                                                                                                              

-  Fluxo Administrativo                                                                                                                                                          

                                                                                                                                                                              
1. Staff faz login                                                                                                                                                            
   ↓                                                                                                                                                                          
2. Acessa área administrativa                                                                                                                                                 
   ↓                                                                                                                                                                          
3. Gerencia produtos/pedidos                                                                                                                                                  
   ↓                                                                                                                                                                          
4. Atualiza status de pedidos                                                                                                                                                 
   ↓                                                                                                                                                                          
5. Clientes recebem atualizações                                                                                                                                              
                                                                                                                                                                              

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

## 🧪 Validações Implementadas                                                                                                                                                   

Formulários                                                                                                                                                                   

Cadastro de Usuário                                                                                                                                                           

-  Username obrigatório                                                                                                                                                       
-  Email válido                                                                                                                                                               
-  CPF formatado (11 dígitos)                                                                                                                                                 
-  Senhas coincidentes                                                                                                                                                        
-  Todos os campos obrigatórios                                                                                                                                               

Produto                                                                                                                                                                       

-  Nome obrigatório                                                                                                                                                           
-  Descrição obrigatória                                                                                                                                                      
-  Preço > 0                                                                                                                                                                  
-  Imagem obrigatória (máx. 5MB)                                                                                                                                              
 

Endereço                                                                                                                                                                      

-  Nome do endereço obrigatório                                                                                                                                               
-  Endereço completo obrigatório                                                                                                                                              
-  Cidade e estado obrigatórios                                                                                                                                               
-  CEP obrigatório                                                                                                                                                            

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

## 📱 Recursos Mobile                                                                                                                                                            

Otimizações                                                                                                                                                                   

✅ Design responsivo em todas as páginas                                                                                                                                                                   
✅ Touch-friendly (áreas clicáveis adequadas)                                                                                                                                                              
✅ Imagens otimizadas                                                                                                                                                                                      
✅ Formulários adaptados para mobile                                                                                                                                                                       
✅ Navegação simplificada                                                                                                                                                                                  
✅ Modais com scroll otimizado                                                                                                                                                                             

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

## 🎯 Métodos de Pagamento                                                                                                                                                       

A plataforma suporta os seguintes métodos:                                                                                                                                    

-  💳 Cartão de Crédito                                                                                                                                                       
-  💳 Cartão de Débito                                                                                                                                                        
-  📄 Boleto Bancário                                                                                                                                                         
-  📱 PIX                                                                                                                                                                     
-  💵 Dinheiro                                                                                                                                                                

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────                                                                                                                                                     
## 👥 Autor
-  Nome: Artur de Paula Coutinho
-  RGM: 29655960
-  Curso: Engenharia de Software
-  Instituição: UNICID
