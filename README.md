# Curso Docker

Projeto para guardar as anotações e códigos-exemplo realizados durante o curso de docker da udemy.

_______________________________________

- PASSO A PASSO COMANDO RUN:

run: O comando run concatena e executa os seguintes comandos;

1) docker image pull;
1) docker container create;
1) docker container start;
1) docker container exec [Execucao do container em modo interativo]

_______________________________________

- MODOS DE EXECUÇÃO DE UM CONTAINER:

Existem dois modos para executar containeres com o docker. O modo daemon, que eh o modo principal, em que o container eh executado como processo e fica rodando em background, e tambem existe o modo interativo, bom para fazer experimentos, fazer testes, realizar configuracoes e ver se o container executa conforme o esperado, etc. No modo interativo eh inserido um comando apos o run do container, e apos o container executar eh mostrado ao usuario o resultado do comando que foi informado. 

Por exemplo; 

sudo docker container run debian bash --version

Esse comando vai executar o container do debian e em seguida vai rodar o comando bash --version para saber a versao do container do debian que esta sendo executado.

_______________________________________

- RUN SEMPRE CRIA NOVO CONTAINER:

O comando run sempre cria um novo container quando ele eh chamado. Atraves da adicao do comando --rm o container nao ficara listado quando o comando sudo docker container ps -a for executado.

_______________________________________

- CRIAÇÃO DE UM CONTAINER NO MODO INTERATIVO:

Eh possivel criar um container com o run e entrar nele de forma interativa para criar arquivos, por exemplo. Para isso a tag -it devera ser inserida no comando de criacao de um container. Por exemplo:

sudo docker container run -it debian bash
touch curso-docker.txt [Para criar o arquivo curso-docker.txt]
ls curso-docker.txt [Para checar se existe o arquivo]
exit [Para sair do container e voltar para o modo cliente]

_______________________________________

- NOMEANDO UM CONTAINER:

Para criar um container com um nome especifico adiciona-se a notacao --name no ato de criacao de um container. Por exemplo:

sudo docker container run --name mydeb -it debian bash

_______________________________________

- REUTILIZANDO UM CONTAINER:

Para reutilizar um container previamente criado utiliza-se o comando start somado das tags -ai para anexar o container ao docker client (terminal) na tag 'a' e a tag 'i' para executar o terminal no modo interativo. Por exemplo:

sudo docker container start -ai mydeb

Com esse comando sera startado o container mydeb, criado anteriormente, no modo interativo. Sendo possivel alterar o container ou executar o que ja existe nele.

_______________________________________

- O CONTAINER NÃO PODE FICAR TOTALMENTE ISOLADO:

O Docker perderia boa parte de suas vantagens se nao fosse possivel haver comunicacao entre um container criado e a maquina host ou entre containers. Por isso, eh possivel que haja comunicacao via porta TPC ou UDP, seja a partir de uma pasta ou volume criado compartilhado entre o host e o container, seja a partir da copia de arquivos entre o container e a maquina host ou da maquina host e o container, ou mesmo da comunicacao entre varios containers, um container que isole o front-end, outro container que isole a API, outro container com o banco de dados, mas havendo uma comunicacao entre todos eles para que a aplicacao torne-se funcional.

_______________________________________


- MAPEAR PORTAS DOS CONTAINERS COMO USUÁRIO:

Como usuario, sera baixado o servidor nginx (leia-se enginex) e mapeada a porta 8080, para que seja possivel utilizar o nginx a partir da porta mapeada;

sudo docker container run -p 8080:80 nginx 

[Com esse comando o servidor sera baixado, a porta para acesso do servico a partir do container sera atraves da porta 8080, e a porta 80 sera a porta interna ao container em que o servidor nginx sera executado. Ou seja, a porta exposta sera 8080 e a porta interna sera a 80. Esse mapeamento eh feito atraves da tag -p.]

Se eu abrir um novo terminal e digitar o comando;

curl http://localhost:8080

Sera exibido o html da pagina index do nginx. E se eu abrir o browser e acessar o mesmo localhost sera possivel visualizar a pagina do nginx

Se eu rodar o comando abaixo, sera possivel ver que o nginx esta realmente ativo;

sudo docker container ps

Para parar o processo eh so ir no terminal em que o processo esta sendo executado e dar um CTRL/Command + C

_______________________________________

- MAPEAR DIRETÓRIOS PARA O CONTAINER:

Sera possivel mapear uma pasta no host para uma pasta no container com o comando abaixo:

sudo docker container run -p 8080:80 -v $(pwd)/not-found:/usr/share/nginx/html nginx

[Com esse comando ele novamente expoe as portas, e mapeia a pasta da maquina host seguido da pasta da aplicacao indicada posteriormente, que nesse caso eh o nginx. Nesse exemplo ocorrera um erro ao atualizar o browser no caminho localhost:8080, pois a pasta da maquina host nao tera nada dentro.]

OBS.: O comando $(pwd) mapeia a pasta na qual esta sendo navegado no terminal.

Apos isso, se eu criar uma pasta de nome curso-docker/exercicio-volume/html/index.html, colocar um conteudo qualquer no index.html, e refazer o mapeamento do comando anterior para esta pasta criada, eh possivel que o localhost quando executado exiba na verdade o arquivo index.html da maquina host. Segue comando abaixo;

sudo docker container run -p 8080:80 -v $(pwd)/html:/usr/share/nginx/html nginx

Ao rodar o comando e dar um refresh no browser, eh possivel perceber que sera exibido na verdade o index.html criado.

_______________________________________

- RODAR UM SERVIDOR WEB EM BACKGROUND:

Sera executado o container em background, ou seja, o container sera executado em modo daemon sem que haja uma interacao por meio do terminal tornando a execucao do processo nao visivel. E eh esse um dos grandes diferenciais do Docker, executar os processos em modo background/daemon. Para isso, utiliza-se o comando abaixo:

sudo docker container run -d --name ex-daemon-basic -p 8080:80 -v $(pwd)/html:/usr/share/nginx/html nginx

[Com o comando o container eh executado em background no modo daemon (-d), com o nome especificado (--name), nas portas especificadas (-p), com o mapeamento de host e servidor especificados (-v), e sobre a imagem nginx]

Com isso, o terminal não fica paralizado com a execucao do container, e eh possivel verificar que o container/processo esta realmente sendo executado atraves do comando abaixo:

sudo docker container ps

Para parar a execucao do container/processo em execucao eh possivel faze-lo com o comando abaixo, para isso eh importante observar que eh necessario saber o nome do container:

sudo docker container stop ex-daemon-basic

_______________________________________

- GERENCIAR O CONTAINER EM BACKGROUND:

Existem tres comando basicos para gerenciamento de um container, isso considerando que o container foi previamente criado como na secao anterior:

sudo docker container start ex-daemon-basic
sudo docker container restart ex-daemon-basic
sudo docker container stop ex-daemon-basic

_______________________________________

- MANIPULAÇÃO DE CONTAINERS EM MODO DAEMON:

Ha outros comandos para manipulacao de containers docker, e alguns deles realizam as mesmas funcoes;

sudo docker container ls [Lista os containers ativos]

sudo docker container list [Lista os contariners ativos]

sudo docker container ps [Lista os cantainers ativos]

sudo docker           ps [Lista os containers ativos, mas eh um comando na forma antiga]

sudo docker container ls -a [Lista todos os containers que ja foram criados, independente se estiver ativo]

sudo docker container list -a [Lista todos os containers que ja foram criados, independente se estiver ativo]

sudo docker container ps -a [Lista todos os containers que ja foram criados, independente se estiver ativo]

sudo docker container logs ex-daemon-basic [Mostra os logs do container que vc especificar, para isso o container precisa estar startado.]

sudo docker container inspect ex-daemon-basic [Mostra em formato JSON caracteristicas do container, como o tipo de imagem em que se baseia, aonde esta o diretorio de log, informacoes sobre rede, etc. Para esse comando eh necessario que o container esteja sendo executado, no modo daemon ou interativo.]

sudo docker container exec ex-daemon-basic uname -or [Mostra que tipo de SO esta sendo executado dentro do container.]

sudo docker image ls [Lista todas as imagens que estao em execucao]

sudo docker volume ls [Lista todos os volumes que estao criados na maquina local]

sudo docker image rm <nome da imagem> [Remove uma imagem especifica]

_______________________________________

- SITUAÇÕES PARA CONSTRUIR AS PRÓPRIAS IMAGENS:

1) Definir a propria imagem para o processo de integracao continua;
1) Portabilidade entre ambientes, um ambiente de testes, um ambiente de producao, um ambiente de desenvolvimento de forma padronizada;
1) Aproximar o ambiente do desenvolvedor para o ambiente em producao, com as mesmas caracteristicas de SO, mesmas versoes de SO e de programas em execucao, mesmos patchs. Evitando bugs;
1) Personalizar imagens publicas para adaptar a necessidade pessoal ou necessidades do projeto.

_______________________________________

- DIFERENÇAS ENTRE CONTAINER E IMAGEM:

Uma imagem seria o equivalente a uma classe, ou seja, eh um contrato de como a imagem deverá ser executada. Já o container seria o objeto, através da imagem executada é gerado um processo isolado, que eh o container em si.
Ou seja, o container possui todas as caracteristicas da imagem ou das imagens em execucao, e uma imagem pode gerar N containeres. O container possuirá acesso ao sistema de arquivos montado na imagem, alem de possuir acesso a alguns arquivos do SO da maquina host.

OBS.: Uma imagem eh um modelo de sistemas de arquivos, montada em camadas subsequentes formando um sistema de arquivos, e possui acesso de somente leitura.

_______________________________________

- APROFUNDANDO IMAGENS:

Imagens, assim como containers, tambem possuem um hash identificador de 256 bits. Como decorar esses hashs eh complicado, recomenda-se nomear ou tagear as imagens de acordo com a utilidade da imagem criada;

sudo docker image pull redis:latest [Para baixar/pullar a ultima versao do redis]

sudo docker image inspect redis [Para inspecionar a imagem]

sudo docker imagem tag redis:latest cod3r-redis [Para renomear a imagem]

sudo docker image rm <nome da imagem> [Para excluir uma imagem]

OBS.: Deve-se tomar muito cuidado ao usar imagens na versao latest para ambientes de desenvolvimento e ambientes de producao, pois ao usar a versao latest pode ser que saia alguma atualizacao do software na qual a imagem eh baseada e com isso gere bugs graves na aplicacao. Por isso, eh recomendavel que utilize-se versoes fechadas e especificas, e sempre que for necessario modificar a versao que esse procedimento seja feito manualmente para evitar que bugs explodam em producao.

_______________________________________

- COMANDOS PARA GERENCIAMENTO DE IMAGENS:

sudo docker image ls [Listar as imagens em execucao]
sudo docker image pull [Baixa uma imagem diretamente do hub]
sudo docker image rm <nome da imagem:tag> [Remove uma ou mais imagens separadas por espaco]
sudo docker image inspect <nome da imagem> [Mostra um JSON contendo varias informacoes da imagem]
sudo docker image tag <nome da imagem:tag> <novo nome da imagem> [Copia e renomeia a imagem para um nome especificado]
sudo docker image build [Pega um arquivo descritor no docker e constroi a imagem a partir dele]
sudo docker image push [Apos criada a imagem com o build, ou ao criar uma nova tag com uma imagem pre-existente, da-se o push para subir a imagem para o repositorio remoto, que pode ser um repositorio fechado da empresa ou um docker hub]

_______________________________________

- DOCKER HUB X DOCKER REGISTRY:

O Docker Registry eh um servico server-side para registro e obtencao de imagens, disponibiliza uma API para que se possa resgatar e enviar imagens a partir desse servico pela API. Por exemplo, pode-se ter um Registry privado para a empresa com as imagens especificas da empresa. 

Ja o Docker Hub eh um SaaS. É um produto na nuvem disponibilizado pelo Docker, e ele contem um Registry, mas o Hub eh maior, contem o Registry mas contem tbm uma interface grafica, que o Registry n possui. No Docker Hub ha uma serie de imagens oficiais, e elas sao geradas pelo time do proprio Docker, sao eles que mantem essas imagens. Pelo fato das imagens oficiais terem uma boa documentacao e padronizacao, eh preferivel utilizar as imagens oficiais mantidas pela propria equipe do Docker, sendo ate mais facil obter suporte e atualizacoes mais frequentes.

_______________________________________

- MEU PRIMEIRO BUILD:

Atraves da construcao de um descritor sera criada a primeira imagem.

Cria-se um arquivo descritor de nome Dockerfile em uma pasta especificada com os comandos que se deseja rodar. No caso do exemplo, foi criado o arquivo Dockerfile no seguinte path:

/curso-docker/primeiro-build/Dockerfile

Para gerar uma imagem a partir desse descritor roda-se os comandos abaixo:

sudo docker image build -t ex-simple-build . [Gera uma imagem atraves do build, com a tag -t de nome ex-simple-build e o arquivo descritor (Dockerfile) sera procurado na pasta local em que o terminal esta, a pasta local eh representado pelo ponto(.)]

sudo docker image ls [Para checar se a imagem foi criada de fato]

sudo docker container run -p 80:80 ex-simple-build [Cria um container a partir da imagem buildada anteriormente, na porta externa 80 e porta interna 80]

Para certificar que o container esta sendo executado de fato basta abrir o browser e digitar localhost:80 ou executar o seguinte comando

sudo docker container ls

_______________________________________

- USO DAS INSTRUÇÕES DE PREPARAÇÃO:

Aqui sera criado um Dockerfile que recebera argumentos para deixar pontos de personalizacao na hora de gerar a imagem. Apos escrito o Dockerfile indicando o(s) argumento(s), digita-se o comando abaixo para o build;

sudo docker image build -t ex-build-arg . [O terminal precisa estar na pasta do Dockerfile devido ao .]

Depois executa-se o comando abaixo para exibir o valor do ARG S3_BUCKET

sudo docker container run ex-build-arg bash -c 'echo $S3_BUCKET'

Pode-se gerar uma nova imagem passando como parametro um novo valor para S3_BUCKET

sudo docker image build --build-arg S3_BUCKET=myapp -t ex-build-arg . [O terminal precisa estar na pasta do Dockerfile devido ao .]

Executando-se novamente o comando abaixo, dessa vez retornara como resultado myapp, que foi passado por parametro no comando anterior

sudo docker container run ex-build-arg bash -c 'echo $S3_BUCKET'

_______________________________________

- USO DAS INSTRUÇÕES DE POVOAMENTO:

Aqui sera criado um Dockerfile com um comando RUN e uma instrucao para adicionar um conteudo dentro de um arquivo, so que apos o comando RUN sera inserido um comando COPY para que seja copiado o conteudo que esta no host para dentro da imagem no qual o caminho tbm sera especificado. Apos criado o Dockerfile executa-se o comando abaixo

sudo docker image build -t ex-build-copy .

Sera gerada a imagem, apos isso executa-se o container atraves da imagem criada no comando anterior

sudo docker container run -p 80:80 ex-build-copy

Com isso o container estara em execucao, que podera ser checado no browser atraves do localhost:80

_______________________________________

- USO DAS INSTRUÇÕES PARA EXECUÇÃO DE UM CONTAINER. TÓPICOS (1) E (2):

(1)

Cria-se uma pasta chamada build-dev dentro de /curso-docker;

Dentro de /build-dev cria-se um index.html e um run.py, cujo conteúdos podem ser observados na pasta /curso-docker/build-dev salva no Google Drive de rodolphoess@gmail.com;

(2)

Nessa parte da aula será criado um novo descritor Dockerfile. O conteúdo do Dockerfile é possível observar no Google Drive de rodolphoess@gmail.com em CURSOS/Docker/curso-docker/build-dev/Dockerfile;
sudo docker image build -t ex-build-dev . [Cria a imagem com a tag ex-build-dev a partir do descritor/Dockerfile na pasta em que o terminal está]

sudo docker container run -it -v $(pwd):/app -p 80:8000 --name python-server ex-build-dev [Executa o container no modo interativo para ser possível ver os logs no terminal; mapeia o volume a partir da pasta em que o terminal está no host devido ao $(pwd) e mapeando para a pasta /app do container; com as portas 80 interna e 8000 para acesso pelo browser; o container terá nome python-server; e será criado a partir da imagem ex-build-dev]

OBS.: É interessante colocar sempre no final do descritor as layers que mudam com mais frequência, assim quando for feito o build o descritor não será recompilado totalmente, apenas as linhas finais que mudaram. Colocando essas layers no início, será recompilado desde a layer que mudou até o final da imagem.

_______________________________________

- SUBINDO UMA IMAGEM PARA O DOCKERHUB:

sudo docker image tag ex-simple-build rodolphoerick/simple-build:1.0 [Cria uma nova tag para uma imagem, que nesse caso foi a ex-simple-build, e o nome da nova tag será rodolphoerick/simple-build cuja a versão é a 1.0]

sudo docker login --username=rodolphoerick

sudo docker image push rodolphoerick/simple-build:1.0 [Sobe para o DockerHub a imagem criada com o nome e tag especificadas no primeiro comando]

_______________________________________

- REDES:

É interessante conhecer e saber aplicar o conceito de redes no Docker, visto que nem todas as aplicações darão acesso a uma rede com acesso externo, tais como banco de dados.

O Docker por padrão utiliza um tipo de rede conhecido como Bridge Network. Assim como a tradução, trata-se realmente de uma ponte que faz a ligação entre um ou mais containeres com a rede do host. Além dessa função de interface/ponte, a camada que representa a bridge serve também como uma forma de isolamento entre o container e o host, apesar de ser possível criar a conexão entre o container diretamente com o host sem passar pela Bridge.

Além da Bridge Network, que é o tipo de rede padrão do Docker, há outros três tipos: None Network, Host Network e Overlay Network.

None Network: caso haja um container que não precise de comunicação externa, e consequentemente não precise de acesso à rede, é indicado utilizar o tipo None. Containeres desse tipo geralmente possuem utilização unicamente interna, realizam processamento exclusivamente para a própria aplicação.

Host Network: o uso desse modelo ocorre justamente quando a interface da Bridge Network não é utilizada na comunicação entre o(s) container(es) e a conexão entre container e host ocorre de forma direta, não ocorrendo isolamento entre o docker container e os serviços do host.

Overlay Network: é utilizado para realizar a clusterização de vários containeres. Esse tipo de rede não foi abordado neste curso de docker.

_______________________________________

- REDE TIPO NONE:

 É um container que não tem nenhum tipo de rede, por isso esse ou esses containeres são totalmente isolados, sem acesso a outros containeres ou ao mundo exterior, por isso ninguém conseguirá acessar ele via rede, o acesso dá-se apenas via terminal e o container com o tipo de rede none terá acesso a volumes locais. Esses containeres são os mais seguros.

Para criar um container com tipo de rede none pode-se seguir a linha de comando abaixo:

sudo docker container run -d --net none debian [-d para rodar no modo daemon, e --net none é exatamente para selecionar como tipo de rede o none, e debian para criar um container a partir da imagem do debian]

_______________________________________

- REDE TIPO BRIDGE:

Cada container terá a sua interface, e entre o container e o host terá a interface com a camada bridge. Nessa aula será testada a comunicação entre dois containeres, através de pings realizados de um para outro, assim como a comunicação entre o container e a rede exterior como o Google, por exemplo.

Além disso, é criada uma nova rede e um novo container é criado nessa nova rede. Por padrão, no Docker não há comunicação entre Dockers de redes diferentes. Mas, através de configurações é possível fazer com que os containeres em diferentes redes passem a se comunicar.

sudo docker container run -d --name container1 alpine sleep 1000 [Cria um container que por padrão terá o tipo de rede bridge]

sudo docker container run -d --name container2 alpine sleep 1000 [Cria o segundo container que por padrão tbm terá o tipo de rede bridge]

sudo docker network create --driver bridge rede_nova [Para criar uma nova rede do tipo bridge e de nome rede_nova]

sudo docker network ls [Para ver as redes criadas]

sudo docker container run -d --name container3 --net rede_nova alpine sleep 1000 [Cria um container, mas dessa vez na outra rede que foi criada também do tipo bridge. Caso não seja especificado o --net rede_nova o Docker por padrão cria em cima da rede bridge que já existe default]

sudo docker container exec -it container1 ifconfig [Para recuperar as informações do container3 e recuperar o endereço de IP dele]

sudo docker container exec -it container3 ping <ipDoContainer1> [Para pingar o container1 a partir do container3. Lembrando que esses dois containeres estão em redes diferentes, por isso possivelmente aparecerá um erro e o ping não conseguirá ser efetuado]

sudo docker network connect bridge container3 [Através desse comando é configurada a comunicação de comunicação entre a rede bridge e ao container3, e consequentemente à rede_nova que foi criada anteriormente. Realizando novamente a tentativa de ping, conforme comando acima, é possível observar que haverá conexão entre o container3 e o container1. Isso porque após a configuração passou a haver duas interfaces de rede, uma que possui conexão com a rede nova e outra que possui conexão com a rede padrão bridge]

sudo docker network disconnect bridge container3 [Para realizar a desconexão entre redes. Nesse caso foi desconectada a rede padrão bridge com o container3 e consequentemente com a rede_nova]

_______________________________________

- REDE TIPO HOST:

Nesse tipo de rede não há mais a interface do tipo de rede bridge entre a interface de rede da máquina host e a interface de rede do container. A conexão entre as redes desses dois atores ocorre de forma direta, sem a intermediação da interface da rede bridge. Devido a isso, o nível de segurança e proteção é mais baixo devido à ausência da camada bridge, há um acesso direto entre as interfaces de rede e por isso uma velocidade maior na comunicação de rede.

sudo docker container run -d --name container4 --net host alpine sleep 1000 [Para criar um container no modo daemon -d, de nome container4, no tipo de rede host, e a partir da imagem da alpine dormindo por 1000seg]

sudo ifconfig [Para ver as conexões de rede do computador local]

sudo docker container exec -it container4 ifconfig [Para ver as conexões de rede do container que foi criado acima. É possível observar que as interfaces de rede serão as mesmas da máquina host possui]

_______________________________________

- ESTRUTURA INICIAL PROJETO CADASTRO SIMPLES:

Criou-se uma série de pastas e arquivos para simulação de um front-end, back-end e banco de dados usando MongoDB. Para criar o back-end foi usado o node, e para criar o arquivo node usou-se os comandos abaixo:

npm init -y
npm i --save express@4.15.3 mongoose@4.11.1 node-restful@0.2.6 body-parser@1.17.2 cors@2.8.3

Foram criados alguns arquivos e pastas: app.js; package-lock.json; package.json; node_modules

Não será necessário o node_modules, por isso foi excluída essa pasta através do comando abaixo:

rm -rf node_modules/

_______________________________________

- CONFIGURANDO O AMBIENTE COM COMPOSE:

Após criados os arquivos front-end, back-end com configuração para o banco, cria-se o arquivo docker-compose.yml, que é um arquivo yaml em que a hierarquia dentro do arquivo comporta-se através da identação do código. Após escrito o docker-compose, vai-se para a pasta aonde o arquivo docker-compose.yml está, que é na /node-mongo-compose e executa-se o comando abaixo para subir os containers e a aplicação por consequência:

docker-compose up

Para testar se está funcionando após subir tudo, no browser acessar o localhost que por padrão acessará a porta 80 para testar o front-end e também localhost:3000 para acessar o back-end, que foi conforme foi configurado no docker-compose