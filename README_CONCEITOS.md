Repositório para escrita de conceitos básicos a avançados ligados ao Docker.

# Conceitos:

Abaixo estarão listados conceitos e dicas separados por tópicos ligados ao Docker.

## O que são Containers?

Um container é um padrão de unidade de software que empacota código e todas as dependências de uma aplicação fazendo com que a mesma seja executada rapidamente de forma confiável de um ambiente computacional para outro.

Com isso, conseguimos isolar a aplicação, ou o que estamos 'containerizando', de forma a executar ela de forma isolada de todo o ecossistema externo, podendo este container se conectar a outros ou não.

## Como funcionam os Containers?

Tudo parte do princípio dos Processos que executam em um Sistema Operacional, por exemplo, os processos que são executados no Kernel do Linux. De posse desses processos, ao longo do tempo adquiriu-se a capacidade de isolá-los, ou seja, para cada processo com o tempo tornou-se possível executá-los em containers, e a isso deu-se o nome de **namespaces**.

Então a um processo principal, conhecido como processo pai, pode-se ter um namespace, e todos os processos filhos estarão associados ao processo pai e consequentemente também ao namespace.

Para cada namespace, ou processo pai, há um PID que o identifica, é possível criar diferentes usuários, é possível isolar e criar uma comunicação de rede específica, e especificar arquivos de sistema.

Além disso, há também os **Cgroups**, em que através deles é possível controlar os recursos do processo, ou seja, a memória alocada, a capacidade de processamento disponível para determinado processo ou namespace dentro da máquina como um todo.

Por fim, temos também os File System, que por padrão o tipo de File System do Docker é o OFS (Overlay File System). Nesse sistema o arquivo é organizado em camadas, ou seja, para cada nova atualização de um arquivo são adicionadas as novas camadas inseridas nele, e aí essas novas camadas passam a fazer parte da nova versão do arquivo gerada e com isso o novo bloco de arquivo principal passa a conter o que foi adicionado. Podemos entender esses novos blocos como dependências que foram adicionadas em um arquivo, arquivo esse que contém as informações referentes ao container Docker.

Essas camadas de dependências formam uma **Imagem**, que é um conjunto de dependências necessárias para simular a execução do SO no Container/Processo para que seja possível executar a aplicação, ou o que quer que seja, dentro do container.

Um desses arquivos que podem conter um conjunto de camadas, ou dependências, e que ao ser executado criará um container Docker é o Dockerfile, que é um arquivo declarativo para construir ou customizar imagens. Com ele, é possível executar uma imagem Docker e também customizar esta imagem através de comandos que podem ser inseridos no Dockerfile, tais como comandos RUN, EXPOSE, entre outros.