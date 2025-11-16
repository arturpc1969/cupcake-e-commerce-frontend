# cupcake-e-commerce-frontend
Frontend for the cupcake e-commerce project

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Documentação do Projeto Galaxy Cupcakes                                                                                                    ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


📋 Índice                                                                                                                                     

  1 Visão Geral                                                                                                                                
  2 Tecnologias Utilizadas                                                                                                                     
  3 Estrutura do Projeto                                                                                                                      
  4 Funcionalidades                                                                                                                           
  5 Componentes Principais                                                                                                                    
  6 Serviços e API                                                                                                                            
  7 Autenticação e Autorização                                                                                                                
  8 Internacionalização                                                                                                                       
  9 Como Executar                                                                                                                             

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

🎯 Visão Geral                                                                                                                                

Galaxy Cupcakes é uma plataforma de e-commerce especializada em cupcakes gourmet, desenvolvida com Nuxt 4. A aplicação oferece uma experiência
completa de compra online, desde a navegação de produtos até o gerenciamento de pedidos, com áreas distintas para clientes e administradores.                                                                                       

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

🛠️ Tecnologias Utilizadas

Frontend                                                                                                                                      

 • Nuxt 4 - Framework Vue.js para aplicações web                                                                                              
 • Vue 3 - Framework JavaScript progressivo                                                                                                   
 • PrimeVue - Biblioteca de componentes UI                                                                                                    
 • Tailwind CSS - Framework CSS utilitário                                                                                                    
 • Vue I18n - Internacionalização (PT-BR e EN-US)                                                                                             

Gerenciamento de Estado                                                                                                                       

 • Composables - Para lógica reutilizável                                                                                                     
 • useState - Para estado reativo global                                                                                                      

Autenticação                                                                                                                                  

 • JWT (JSON Web Tokens) - Para autenticação e autorização                                                                                    
 • LocalStorage - Para persistência de tokens                                                                                                 

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

📁 Estrutura do Projeto                                                                                                                       

                                                                                                                                              
app/                                                                                                                                          
├── components/           # Componentes Vue reutilizáveis                                                                                     
│   ├── AboutModal.vue                                                                                                                        
│   ├── ContactModal.vue                                                                                                                      
│   ├── HeroSection.vue                                                                                                                       
│   ├── LoginModal.vue                                                                                                                        
│   ├── NavBar.vue                                                                                                                            
│   ├── ProductDataView.vue                                                                                                                   
│   └── SignupModal.vue                                                                                                                       
│                                                                                                                                             
├── composables/          # Lógica reutilizável                                                                                               
│   ├── useAboutModal.js                                                                                                                      
│   ├── useAuth.js                                                                                                                            
│   ├── useCart.js                                                                                                                            
│   ├── useContactModal.js                                                                                                                    
│   ├── useLoginModal.js                                                                                                                      
│   ├── useMapEndpointResponse.js                                                                                                             
│   ├── useRequests.js                                                                                                                        
│   └── useSignupModal.js                                                                                                                     
│                                                                                                                                             
├── middleware/           # Middlewares de rota                                                                                               
│   ├── auth.js                                                                                                                               
│   └── staff.js                                                                                                                              
│                                                                                                                                             
├── pages/               # Páginas da aplicação                                                                                               
│   ├── index.vue                                                                                                                             
│   ├── product/                                                                                                                              
│   │   └── index.vue                                                                                                                         
│   ├── order/                                                                                                                                
│   │   └── index.vue                                                                                                                         
│   ├── profile/                                                                                                                              
│   │   ├── index.vue                                                                                                                         
│   │   ├── edit.vue                                                                                                                          
│   │   ├── addresses/                                                                                                                        
│   │   │   ├── index.vue                                                                                                                     
│   │   │   └── new.vue                                                                                                                       
│   │   └── orders/                                                                                                                           
│   │       ├── index.vue                                                                                                                     
│   │       └── [uuid].vue                                                                                                                    
│   └── staff/                                                                                                                                
│       ├── products/                                                                                                                         
│       │   ├── index.vue                                                                                                                     
│       │   ├── new.vue                                                                                                                       
│       │   └── edit/                                                                                                                         
│       │       └── [uuid].vue                                                                                                                
│       └── orders/                                                                                                                           
│           ├── index.vue                                                                                                                     
│           └── [uuid].vue                                                                                                                    
│                                                                                                                                             
├── services/            # Serviços de API                                                                                                    
│   ├── authService.js                                                                                                                        
│   └── entity/                                                                                                                               
│       ├── deliveryAddressService.js                                                                                                         
│       ├── orderItemsService.js                                                                                                              
│       ├── orderService.js                                                                                                                   
│       ├── productService.js                                                                                                                 
│       └── userService.js                                                                                                                    
│                                                                                                                                             
├── utils/               # Utilitários                                                                                                        
│   └── jwt.js                                                                                                                                
│                                                                                                                                             
└── i18n/               # Arquivos de tradução                                                                                                
    └── locales/                                                                                                                              
        ├── pt-BR.json                                                                                                                        
        └── en-US.json                                                                                                                        
                                                                                                                                              

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

⚡ Funcionalidades                                                                                                                            

🛍️ Área do Cliente                                                                                                                            

Navegação e Visualização                                                                                                                      

 • Catálogo de Produtos                                                                                                                       
    • Visualização em lista ou grid                                                                                                           
    • Filtros e busca                                                                                                                         
    • Detalhes completos dos produtos                                                                                                         
    • Badge de promoção para produtos em oferta                                                                                               
    • Imagens com altura padronizada                                                                                                          
 • Hero Section                                                                                                                               
    • Banner promocional                                                                                                                      
    • Destaque de produtos em promoção                                                                                                        
    • Navegação direta para produtos                                                                                                          

Autenticação                                                                                                                                  

 • Login                                                                                                                                      
    • Autenticação via JWT                                                                                                                    
    • Persistência de sessão                                                                                                                  
    • Renovação automática de tokens                                                                                                          
 • Cadastro                                                                                                                                   
    • Formulário completo de registro                                                                                                         
    • Validação de dados                                                                                                                      
    • Formatação automática de CPF                                                                                                            
    • Validação de senhas                                                                                                                     

Carrinho de Compras                                                                                                                           

 • Gerenciamento de Carrinho                                                                                                                  
    • Adicionar/remover produtos                                                                                                              
    • Ajustar quantidades                                                                                                                     
    • Persistência em localStorage                                                                                                            
    • Badge com contador de itens                                                                                                             
    • Cálculo automático de totais                                                                                                            

Pedidos                                                                                                                                       

 • Finalização de Compra                                                                                                                      
    • Seleção de endereço de entrega                                                                                                          
    • Escolha de método de pagamento                                                                                                          
    • Revisão do pedido                                                                                                                       
    • Confirmação de compra                                                                                                                   
 • Histórico de Pedidos                                                                                                                       
    • Listagem de todos os pedidos                                                                                                            
    • Detalhes completos de cada pedido                                                                                                       
    • Acompanhamento de status                                                                                                                
    • Informações de entrega                                                                                                                  

Perfil do Usuário                                                                                                                             

 • Gerenciamento de Perfil                                                                                                                    
    • Visualização de dados pessoais                                                                                                          
    • Edição de informações                                                                                                                   
    • Formatação automática de CPF                                                                                                            
    • Validação de email                                                                                                                      
 • Endereços de Entrega                                                                                                                       
    • Cadastro de múltiplos endereços                                                                                                         
    • Edição de endereços                                                                                                                     
    • Exclusão com confirmação                                                                                                                
    • Seleção de endereço padrão                                                                                                              

Informações                                                                                                                                   

 • Modal "Sobre Nós"                                                                                                                          
    • História da empresa                                                                                                                     
    • Missão e valores                                                                                                                        
    • Localização                                                                                                                             
    • Diferenciais                                                                                                                            
 • Modal "Contato"                                                                                                                            
    • Informações de contato completas                                                                                                        
    • Formulário de mensagem                                                                                                                  
    • Validação de campos                                                                                                                     
    • Formatação de telefone                                                                                                                  

👨‍💼 Área Administrativa (Staff)                                                                                                              

Gerenciamento de Produtos                                                                                                                     

 • Listagem de Produtos                                                                                                                       
    • Visualização em grid                                                                                                                    
    • Informações completas                                                                                                                   
    • Indicadores de estoque                                                                                                                  
    • Badge de promoção                                                                                                                       
 • Adicionar Produto                                                                                                                          
    • Formulário completo                                                                                                                     
    • Upload de imagem                                                                                                                        
    • Preview de imagem                                                                                                                       
    • Validação de campos                                                                                                                     
    • Marcação de promoção                                                                                                                    
 • Editar Produto                                                                                                                             
    • Pré-preenchimento de dados                                                                                                              
    • Atualização de imagem (opcional)                                                                                                        
    • Manutenção de imagem atual                                                                                                              
    • Validação de alterações                                                                                                                 
 • Excluir Produto                                                                                                                            
    • Modal de confirmação                                                                                                                    
    • Exclusão permanente                                                                                                                     

Gerenciamento de Pedidos                                                                                                                      

 • Listagem de Pedidos                                                                                                                        
    • Visualização de todos os pedidos                                                                                                        
    • Filtro por status                                                                                                                       
    • Informações do cliente                                                                                                                  
    • Preview de produtos                                                                                                                     
    • Estatísticas rápidas                                                                                                                    
 • Detalhes do Pedido                                                                                                                         
    • Informações completas                                                                                                                   
    • Produtos do pedido                                                                                                                      
    • Dados do cliente                                                                                                                        
    • Endereço de entrega                                                                                                                     
    • Atualização de status                                                                                                                   
 • Status de Pedidos                                                                                                                          
    • DRAFT (Rascunho)                                                                                                                        
    • PENDING (Pendente)                                                                                                                      
    • CONFIRMED (Confirmado)                                                                                                                  
    • PREPARATION (Em Preparação)                                                                                                             
    • DELIVERY (Em Entrega)                                                                                                                   
    • WAITING_PAYMENT (Aguardando Pagamento)                                                                                                  
    • DELIVERED (Entregue)                                                                                                                    
    • FINISHED (Finalizado)                                                                                                                   
    • CANCELED (Cancelado)                                                                                                                    

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

🧩 Componentes Principais                                                                                                                     

NavBar                                                                                                                                        

Localização: app/components/NavBar.vue                                                                                                        

Funcionalidades:                                                                                                                              

 • Logo e navegação principal                                                                                                                 
 • Menu dropdown do usuário                                                                                                                   
 • Links para perfil, pedidos e endereços                                                                                                     
 • Área administrativa (apenas para staff)                                                                                                    
 • Carrinho com badge de quantidade                                                                                                           
 • Modais de login e cadastro                                                                                                                 
 • Logout                                                                                                                                     

ProductDataView                                                                                                                               

Localização: app/components/ProductDataView.vue                                                                                               

Funcionalidades:                                                                                                                              

 • Visualização em lista ou grid                                                                                                              
 • Adicionar ao carrinho                                                                                                                      
 • Compra direta                                                                                                                              
 • Seleção de quantidade                                                                                                                      
 • Badge de promoção                                                                                                                          
 • Imagens com altura padronizada                                                                                                             
 • Navegação por âncora                                                                                                                       

HeroSection                                                                                                                                   

Localização: app/components/HeroSection.vue                                                                                                   

Funcionalidades:                                                                                                                              

 • Banner promocional                                                                                                                         
 • Destaque de 3 produtos em promoção                                                                                                         
 • Cards clicáveis                                                                                                                            
 • Loading state                                                                                                                              
 • Navegação para produtos                                                                                                                    

Modais                                                                                                                                        

LoginModal                                                                                                                                    

 • Autenticação de usuário                                                                                                                    
 • Validação de credenciais                                                                                                                   
 • Link para cadastro                                                                                                                         

SignupModal                                                                                                                                   

 • Cadastro de novo usuário                                                                                                                   
 • Validação de campos                                                                                                                        
 • Formatação de CPF                                                                                                                          
 • Confirmação de senha                                                                                                                       
 • Link para login                                                                                                                            

AboutModal                                                                                                                                    

 • História da empresa                                                                                                                        
 • Missão e valores                                                                                                                           
 • Localização                                                                                                                                
 • Diferenciais                                                                                                                               

ContactModal                                                                                                                                  

 • Informações de contato                                                                                                                     
 • Formulário de mensagem                                                                                                                     
 • Validação de campos                                                                                                                        
 • Formatação de telefone                                                                                                                     

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

🔌 Serviços e API                                                                                                                             

AuthService                                                                                                                                   

Localização: app/services/authService.js                                                                                                      

Métodos:                                                                                                                                      

 • login(userLoginData) - Autenticação                                                                                                        
 • signup(userData) - Cadastro                                                                                                                
 • logout() - Encerrar sessão                                                                                                                 

ProductService                                                                                                                                

Localização: app/services/entity/productService.js                                                                                            

Métodos:                                                                                                                                      

 • getAllProducts() - Listar produtos                                                                                                         
 • getProductByUuid(uuid) - Buscar produto                                                                                                    
 • createProduct(productData) - Criar produto                                                                                                 
 • updateProduct(uuid, productData) - Atualizar produto                                                                                       
 • deleteProductByUuid(uuid) - Excluir produto                                                                                                
 • uploadProductImage(uuid, imageFile) - Upload de imagem                                                                                     

OrderService                                                                                                                                  

Localização: app/services/entity/orderService.js                                                                                              

Métodos:                                                                                                                                      

 • getAllOrders() - Listar pedidos                                                                                                            
 • getOrderByUuid(uuid) - Buscar pedido                                                                                                       
 • createOrder(orderData) - Criar pedido                                                                                                      
 • updateOrder(uuid, orderData) - Atualizar pedido                                                                                            
 • confirmOrder(uuid) - Confirmar pedido                                                                                                      
 • deleteOrder(uuid) - Excluir pedido                                                                                                         

OrderItemsService                                                                                                                             

Localização: app/services/entity/orderItemsService.js                                                                                         

Métodos:                                                                                                                                      

 • getAllOrdersItems() - Listar pedidos do usuário                                                                                            
 • getAllOrdersItemsStaff() - Listar todos os pedidos (staff)                                                                                 
 • getOrderItemsByUuid(uuid) - Buscar pedido do usuário                                                                                       
 • getOrderItemsByUuidStaff(uuid) - Buscar pedido (staff)                                                                                     
 • updateOrderItem(uuid, orderItemData) - Atualizar pedido                                                                                    

DeliveryAddressService                                                                                                                        

Localização: app/services/entity/deliveryAddressService.js                                                                                    

Métodos:                                                                                                                                      

 • getAllDeliveryAddresses() - Listar endereços                                                                                               
 • getDeliveryAddressByUuid(uuid) - Buscar endereço                                                                                           
 • createDeliveryAddress(addressData) - Criar endereço                                                                                        
 • updateDeliveryAddress(uuid, addressData) - Atualizar endereço                                                                              
 • deleteDeliveryAddress(uuid) - Excluir endereço                                                                                             

UserService                                                                                                                                   

Localização: app/services/entity/userService.js                                                                                               

Métodos:                                                                                                                                      

 • fetchMyUserData() - Buscar dados do usuário                                                                                                
 • updateMyUserData(userData) - Atualizar dados                                                                                               
 • deleteMyUser() - Excluir conta                                                                                                             
 • deactivateMyUser(userData) - Desativar conta                                                                                               
 • changeMyPassword(userData) - Alterar senha                                                                                                 

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

🔐 Autenticação e Autorização                                                                                                                 

Sistema de Autenticação                                                                                                                       

Composable: useAuth()                                                                                                                         

Funcionalidades:                                                                                                                              

 • Gerenciamento de tokens JWT (access e refresh)                                                                                             
 • Persistência em localStorage                                                                                                               
 • Renovação automática de tokens                                                                                                             
 • Verificação de expiração                                                                                                                   
 • Logout automático em caso de erro 401                                                                                                      

Estados:                                                                                                                                      

 • accessToken - Token de acesso                                                                                                              
 • refreshToken - Token de renovação                                                                                                          
 • user - Dados do usuário logado                                                                                                             
 • isAuthenticated - Status de autenticação                                                                                                   
 • isStaff - Indica se é usuário administrativo                                                                                               

Middlewares                                                                                                                                   

auth.js                                                                                                                                       

Localização: app/middleware/auth.js                                                                                                           

Função: Protege rotas que requerem autenticação                                                                                               

Comportamento:                                                                                                                                

 • Verifica se o usuário está autenticado                                                                                                     
 • Redireciona para /product se não autenticado                                                                                               

staff.js                                                                                                                                      

Localização: app/middleware/staff.js                                                                                                          

Função: Protege rotas administrativas                                                                                                         

Comportamento:                                                                                                                                

 • Verifica se o usuário é staff                                                                                                              
 • Redireciona para /product se não for staff                                                                                                 
 • Exibe mensagem de acesso negado                                                                                                            

Proteção de Rotas                                                                                                                             

Rotas Protegidas (auth):                                                                                                                      

 • /profile/* - Perfil do usuário                                                                                                             
 • /order - Finalização de pedido                                                                                                             

Rotas Protegidas (staff):                                                                                                                     

 • /staff/products/* - Gerenciamento de produtos                                                                                              
 • /staff/orders/* - Gerenciamento de pedidos                                                                                                 

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

🌍 Internacionalização                                                                                                                        

Idiomas Suportados                                                                                                                            

 • Português (pt-BR) - Idioma padrão                                                                                                          
 • Inglês (en-US)                                                                                                                             

Estrutura de Tradução                                                                                                                         

Arquivos:                                                                                                                                     

 • i18n/locales/pt-BR.json                                                                                                                    
 • i18n/locales/en-US.json                                                                                                                    

Categorias de Strings:                                                                                                                        

 • components_* - Componentes                                                                                                                 
 • pages_* - Páginas                                                                                                                          
 • composables_* - Composables                                                                                                                
 • middleware_* - Middlewares                                                                                                                 

Uso


const { t } = useI18n();                                                                                                                      
                                                                                                                                              
// Em template                                                                                                                                
{{ t("components_nav-bar_home") }}                                                                                                            
                                                                                                                                              
// Em script                                                                                                                                  
const message = t("pages_login_error-generic");                                                                                               
                                                                                                                                              

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

🚀 Como Executar                                                                                                                              

Pré-requisitos                                                                                                                                

 • Node.js 18+                                                                                                                                
 • npm ou yarn                                                                                                                                
 • Backend da API rodando                                                                                                                     

Instalação                                                                                                                                    

                                                                                                                                              
# Clonar o repositório                                                                                                                        
git clone [url-do-repositorio]                                                                                                                
                                                                                                                                              
# Entrar no diretório                                                                                                                         
cd galaxy-cupcakes                                                                                                                            
                                                                                                                                              
# Instalar dependências                                                                                                                       
npm install                                                                                                                                   
                                                                                                                                              

Configuração                                                                                                                                  

Crie um arquivo .env na raiz do projeto:                                                                                                      

                                                                                                                                              
NUXT_PUBLIC_API_BASE=http://localhost:8000                                                                                                    
                                                                                                                                              

Executar em Desenvolvimento                                                                                                                   

                                                                                                                                              
npm run dev                                                                                                                                   
                                                                                                                                              

A aplicação estará disponível em http://localhost:3000                                                                                        

Build para Produção                                                                                                                           

                                                                                                                                              
# Gerar build                                                                                                                                 
npm run build                                                                                                                                 
                                                                                                                                              
# Executar em produção                                                                                                                        
npm run start                                                                                                                                 
                                                                                                                                              

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

📝 Convenções de Código                                                                                                                       

Nomenclatura                                                                                                                                  

 • Componentes: PascalCase (ex: NavBar.vue)                                                                                                   
 • Composables: camelCase com prefixo use (ex: useAuth.js)                                                                                    
 • Páginas: kebab-case (ex: profile/edit.vue)                                                                                                 
 • Serviços: camelCase com sufixo Service (ex: productService.js)                                                                             

Estrutura de Componentes                                                                                                                      

                                                                                                                                              
<script setup>                                                                                                                                
// Imports                                                                                                                                    
// Composables                                                                                                                                
// Estado                                                                                                                                     
// Funções                                                                                                                                    
// Lifecycle hooks                                                                                                                            
</script>                                                                                                                                     
                                                                                                                                              
<template>                                                                                                                                    
  <!-- Template -->                                                                                                                           
</template>                                                                                                                                   
                                                                                                                                              
<style scoped>                                                                                                                                
/* Estilos */                                                                                                                                 
</style>                                                                                                                                      
                                                                                                                                              

Padrão de Cores                                                                                                                               

 • Primária: Roxo (#20004b, #3c0074)                                                                                                          
 • Secundária: Amarelo (#fbbf24)                                                                                                              
 • Sucesso: Verde                                                                                                                             
 • Erro: Vermelho                                                                                                                             
 • Aviso: Laranja                                                                                                                             
 • Info: Azul                                                                                                                                 

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

🎨 Design System                                                                                                                              

Componentes UI                                                                                                                                

 • PrimeVue - Biblioteca principal de componentes                                                                                             
 • Tailwind CSS - Estilização utilitária                                                                                                      

Padrões Visuais                                                                                                                               

 • Gradientes: from-[#20004b] to-[#3c0074]                                                                                                    
 • Bordas: border-[#ffffff22]                                                                                                                 
 • Backgrounds: bg-[#ffffff11]                                                                                                                
 • Sombras: shadow-2xl                                                                                                                        
 • Arredondamento: rounded-lg                                                                                                                 

Responsividade                                                                                                                                

 • Mobile First: Design otimizado para mobile                                                                                                 
 • Breakpoints: sm, md, lg, xl (Tailwind padrão)                                                                                              
 • Grid Responsivo: Ajuste automático de colunas                                                                                              

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

🔄 Fluxo de Dados                                                                                                                             

Carrinho de Compras                                                                                                                           

 1 Usuário adiciona produto ao carrinho                                                                                                       
 2 Dados salvos em localStorage                                                                                                               
 3 Badge atualizado na navbar                                                                                                                 
 4 Persistência entre sessões                                                                                                                 

Finalização de Pedido                                                                                                                         

 1 Usuário acessa carrinho                                                                                                                    
 2 Seleciona endereço de entrega                                                                                                              
 3 Escolhe método de pagamento                                                                                                                
 4 Confirma pedido                                                                                                                            
 5 Pedido criado no backend                                                                                                                   
 6 Carrinho limpo                                                                                                                             
 7 Redirecionamento para histórico                                                                                                            

Gerenciamento de Produtos (Staff)                                                                                                             

 1 Staff acessa área administrativa                                                                                                           
 2 Lista produtos existentes                                                                                                                  
 3 Adiciona/edita/exclui produtos                                                                                                             
 4 Upload de imagens                                                                                                                          
 5 Atualização em tempo real                                                                                                                  

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

📊 Estados de Pedido                                                                                                                          

Fluxo Normal                                                                                                                                  

                                                                                                                                              
DRAFT → PENDING → CONFIRMED → PREPARATION → DELIVERY → DELIVERED → FINISHED                                                                   
                                                                                                                                              

Fluxos Alternativos                                                                                                                           

                                                                                                                                              
PENDING → WAITING_PAYMENT → CONFIRMED                                                                                                         
PENDING → CANCELED                                                                                                                            
CONFIRMED → CANCELED                                                                                                                          
                                                                                                                                              

Cores por Status                                                                                                                              

 • DRAFT: Cinza                                                                                                                               
 • PENDING: Amarelo                                                                                                                           
 • CONFIRMED: Azul                                                                                                                            
 • PREPARATION: Roxo                                                                                                                          
 • DELIVERY: Índigo                                                                                                                           
 • WAITING_PAYMENT: Laranja                                                                                                                   
 • DELIVERED: Verde                                                                                                                           
 • FINISHED: Verde Esmeralda                                                                                                                  
 • CANCELED: Vermelho                                                                                                                         

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

🛡️ Segurança                                                                                                                                  

Proteções Implementadas                                                                                                                       

 • JWT Authentication - Tokens seguros                                                                                                        
 • Middleware de Autenticação - Proteção de rotas                                                                                             
 • Validação de Formulários - Client-side e server-side                                                                                       
 • Sanitização de Dados - Prevenção de XSS                                                                                                    
 • HTTPS - Comunicação segura (produção)                                                                                                      

Boas Práticas                                                                                                                                 

 • Tokens armazenados em localStorage                                                                                                         
 • Renovação automática de tokens                                                                                                             
 • Logout em caso de token inválido                                                                                                           
 • Validação de permissões (staff)                                                                                                            

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

📱 Funcionalidades Mobile                                                                                                                     

Otimizações                                                                                                                                   

 • Design Responsivo - Adaptação automática                                                                                                   
 • Touch Friendly - Botões e áreas clicáveis adequadas                                                                                        
 • Menu Hamburguer - Navegação otimizada                                                                                                      
 • Imagens Otimizadas - Carregamento rápido                                                                                                   
 • Formulários Adaptados - Inputs mobile-friendly                                                                                             

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

🐛 Tratamento de Erros                                                                                                                        

Estratégias                                                                                                                                   

 • Try-Catch - Captura de erros assíncronos                                                                                                   
 • Toast Notifications - Feedback visual ao usuário                                                                                           
 • Loading States - Indicadores de carregamento                                                                                               
 • Fallbacks - Conteúdo alternativo em caso de erro                                                                                           
 • Logs - Console.error para debugging                                                                                                        

Mensagens de Erro                                                                                                                             

 • Traduzidas (i18n)                                                                                                                          
 • Descritivas                                                                                                                                
 • Acionáveis (sugerem solução)                                                                                                               

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

📄 Licença                                                                                                                                    

Este projeto é proprietário da Galaxy Cupcakes.                                                                                               

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

👥 Equipe                                                                                                                                     

Desenvolvido com ❤️ pela equipe Galaxy Cupcakes                                                                                               

Galaxy Cupcakes - Sabor que vem das estrelas ⭐🧁
