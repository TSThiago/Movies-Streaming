# Watchflix
### Projeto de conclusão do módulo 5 do curso Desenvolvimento Web Front-End com React da Flit.

### Em Geral:
- Este é um projeto React, o qual usamos as seguintes tecnologias, Axios, Vite, Formik, Redux, Context, Sass, SweetAlert2 e DronaHQ. 
- Aplicamos a Arquitetura Front End para estruturar o projeto, criando pastas como por exemplo: shared/adapters; types; services/api; store (para o redux) entre outras.
Fique à vontade para conferir e nos dar um feedback. Obrigado!

### Pontos Específicos:
- O projeto é composto por 5 páginas: Home, Página do Filme, Últimos Assistidos, Top Movies e Favoritos. Também possui um sistema de Login e Sign Up e uma barra de pesquisa para pesquisar o filme pelo nome.
- As páginas de Favoritos e de Últimos assistidos só aparecem na NavBar somente depois do usuário efetuar o login.
- Nas páginas individuais dos filmes, os botões de Play e de Favoritar só funcionam quando o usuário fizer o login também. Caso sejam clicados enquanto o usuário não logar, irá ser redirecionado para a página de login e irá aparecer um modal, feito com a lib SweetAlert2.
- Na página de cadastro, o formulário tem validações feitas pelo Formik e os dados são salvos numa API feita no DronaHQ.
- Na página de login, quando algum dos dados estiver errado, aparecerá um modal, feito com a lib SweetAlert2, com uma mensagem de erro e, 
quando efetuado com sucesso, aparecerá um modal com uma mensagem de sucesso. Os dados do usuário ficam salvos em um state do redux depois do login.

### Quanto a organização do grupo:
- Na página Home, a NavBar (Thiago) e o Footer (Marcos), a sessão de filmes (Marcos).
- Página do Filme, quanto a lógica para aparecer as informações (Marcos), lógica do botão para adicionar nos favoritos e botão player (Thiago).
- Sistema de Login, Sign Up (Thiago),
- Barra de pesquisa (Marcos),
- Página Últimos assistidos, Top Movies e Favoritos (Thiago),
- Responsividade: Marcos e Thiago,
- Criação das APIs externas: Thiago.

### APIs:
As requisições são obtidas de um API do The Movie Data Base:
https://developers.themoviedb.org/3/getting-started/introduction.

##Você pode acessá-lo por meio deste link: 
https://movies-streaming-l9rme8ao2-tsthiago.vercel.app/