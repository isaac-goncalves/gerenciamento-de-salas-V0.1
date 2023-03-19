SQL para gerar modelo de dados





gerar o conteudo de um csv para inserir esses dados no banco incluindo:  horario_inicio, horario_fim, id_professor, id_disciplina, semestre, id_sala, created_at, updated_at sendo que id_sala = 14 e semestre = 1 para todos. fazer muito bem feito




INSERT INTO public.grade(horario_inicio, horario_fim, id_professor, id_disciplina, semestre, id_sala, created_at, updated_at)
VALUES ('2023-03-20 08:00:00', '2023-03-20 10:00:00', 'Professor Teste', 'Disciplina Teste', '1º Semestre 2023', 'Sala 1', NOW(), NOW());

INSERT INTO public.grade(horario_inicio, horario_fim, id_professor, id_disciplina, semestre, id_sala, created_at, updated_at)
VALUES 
  ('2023-03-20 08:00:00', '2023-03-20 10:00:00', 'Professor Teste', 'Disciplina Teste', '1º Semestre 2023', 'Sala 1', NOW(), NOW()),
  ('2023-03-20 10:00:00', '2023-03-20 12:00:00', 'Professor Teste', 'Disciplina Teste', '1º Semestre 2023', 'Sala 1', NOW(), NOW()),
  ('2023-03-20 12:00:00', '2023-03-20 14:00:00', 'Professor Teste', 'Disciplina Teste', '1º Semestre 2023', 'Sala 1', NOW(), NOW()),
  ('2023-03-20 14:00:00', '2023-03-20 16:00:00', 'Professor Teste', 'Disciplina Teste', '1º Semestre 2023', 'Sala 1', NOW(), NOW()),
  ('2023-03-20 16:00:00', '2023-03-20 18:00:00', 'Professor Teste', 'Disciplina Teste', '1º Semestre 2023', 'Sala 1', NOW(), NOW());


"1º Semestre 2023						
1º Análise e Desenvolvimento de Sistemas						
sala 14		2ª	3ª	4ª	5ª	6ª
1ª aula	"das 18h45
às 19h35"	"Arquitetura e Organização de Computadores
Michel"	"Ingles I
Anna Renata"	Programação em Microinformática	"Arquitetura e Organização de Computadores
Michel"	"Matemática Discreta
Zanetti"
2ª aula	"das 19h35
às 20h25"	"Algoritimo e Lógica de Programação
Zanetti"	"Ingles I
Anna Renata"	Programação em Microinformática	"Administração Geral
Francisco"	"Matemática Discreta
Zanetti"
Intervalo	"das 20h25
às 20h35"	Intervalo	Intervalo	Intervalo	Intervalo	Intervalo
3ª aula	"das 20h35
às 21h25"	"Algoritimo e Lógica de Programação
Zanetti"	XXXXXXXX	Programação em Microinformática	"Administração Geral
Francisco"	"Matemática Discreta
Zanetti"
4ª aula	"das 21h25
às 22h15"	"Algoritimo e Lógica de Programação
Zanetti"	"Arquitetura e Organização de Computadores
Michel"	Programação em Microinformática	"Administração Geral
Francisco"	"Laboratório de Hardware
Luis Felipe"
5ª aula	"das 22h15
às 23h05"	"Algoritimo e Lógica de Programação
Zanetti"	"Arquitetura e Organização de Computadores
Michel"	"Matemática Discreta
Zanetti"	"Administração Geral
Francisco"	"Laboratório de Hardware
Luis Felipe"

1º Semestre 2023						
2º  Análise e Desenvolvimento de Sistemas						
sala 13		2ª	3ª	4ª	5ª	6ª
1ª aula	"das 18h45
às 19h35"	"Sistema de Informação
Luiz Evangelista"	"Ingles I
Anna Renata"	"Contabilidade
Francisco"	"Engenharia de Software I
Luiz Evangelista"	"Contabilidade
Francisco"
2ª aula	"das 19h35
às 20h25"	"Ingles II
Anna Renata"	"Ling de Programação
Zanetti"	"Ingles II
Anna Renata"	"Cálculo
Marcos Allan"	"Sistema de Informação
Luiz Evangelista"
Intervalo	"das 20h25
às 20h35"	Intervalo	Intervalo	Intervalo	Intervalo	Intervalo
3ª aula	"das 20h35
às 21h25"	"Engenharia de Software I
Luiz Evangelista"	"Ling de Programação
Zanetti"	Comunicação e Expressão	"Cálculo
Marcos Allan"	"Sistema de Informação
Luiz Evangelista"
4ª aula	"das 21h25
às 22h15"	"Engenharia de Software I
Luiz Evangelista"	"Ling de Programação
Zanetti"	Comunicação e Expressão	"Cálculo
Marcos Allan"	"Sistema de Informação
Luiz Evangelista"
5ª aula	"das 22h15
às 23h05"	"Engenharia de Software I
Luiz Evangelista"	"Ling de Programação
Zanetti"	Comunicação e Expressão	"Cálculo
Marcos Allan"	XXXXXXXX

3º  Análise e Desenvolvimento de Sistemas						
sala 12		2ª	3ª	4ª	5ª	6ª
1ª aula	"das 18h45
às 19h35"	"Estrutura de Dados
Divani"	"Ingles I
Anna Renata"	"Eng Software II
Cilmara"	"Ingles III
Anna Renata"	"Estatística Aplicada
Érica"
2ª aula	"das 19h35
às 20h25"	"Sistemas Operacionais I
Ronaldo"	"Estrutura de Dados
Divani"	"Eng Software II
Cilmara"	"Ingles III
Anna Renata"	"Estatística Aplicada
Érica"
Intervalo	"das 20h25
às 20h35"	Intervalo	Intervalo	Intervalo	Intervalo	Intervalo
3ª aula	"das 20h35
às 21h25"	Sociedade e Tecnologia	"Estrutura de Dados
Divani"	"Economia e Finanças
Francisco"	"Interação Humano Computador
Cilmara"	"Estatística Aplicada
Érica"
4ª aula	"das 21h25
às 22h15"	"Sistemas Operacionais I
Ronaldo"	"Eng Software II
Cilmara"	"Economia e Finanças
Francisco"	"Interação Humano Computador
Cilmara"	"Estatística Aplicada
Érica"
5ª aula	"das 22h15
às 23h05"	"Sistemas Operacionais I
Ronaldo"	"Eng Software II
Cilmara"	"Sistemas Operacionais I
Ronaldo"	Sociedade e Tecnologia	XXXXXXXX

1º Semestre 2023						
4º  Análise e Desenvolvimento de Sistemas						
sala 8		2ª	3ª	4ª	5ª	6ª
1ª aula	"das 18h45
às 19h35"	"Programação para dispositivos móveis
Luis Felipe"	"Ingles I
Anna Renata"	"Eng Sofware III
Ronaldo"	"Banco de dados
Cilmara"	"Programação Orientada a Objetos
Jean"
2ª aula	"das 19h35
às 20h25"	"Programação para dispositivos móveis
Luis Felipe"	"Banco de dados
Cilmara"	"Eng Sofware III
Ronaldo"	"Sistemas Operacionais II
Jean"	"Programação Orientada a Objetos
Jean"
Intervalo	"das 20h25
às 20h35"	Intervalo	Intervalo	Intervalo	Intervalo	Intervalo
3ª aula	"das 20h35
às 21h25"	"Eng Sofware III
Ronaldo"	"Banco de dados
Cilmara"	"Eng Sofware III
Ronaldo"	"Sistemas Operacionais II
Jean"	"Programação Orientada a Objetos
Jean"
4ª aula	"das 21h25
às 22h15"	"Metodologia da Pesquisa
Anna Renata"	"Inglês IV
Anna Renata"	"Programação para dispositivos móveis
Luis Felipe"	"Sistemas Operacionais II
Jean"	"Programação Orientada a Objetos
Jean"
5ª aula	"das 22h15
às 23h05"	"Metodologia da Pesquisa
Anna Renata"	"Inglês IV
Anna Renata"	"Programação para dispositivos móveis
Luis Felipe"	"Sistemas Operacionais II
Jean"	XXXXXXXX

1º Semestre 2023						
5º  Análise e Desenvolvimento de Sistemas						
sala 11		2ª	3ª	4ª	5ª	6ª
1ª aula	"das 18h45
às 19h35"	XXXXXXXX	"Ingles I
Anna Renata"	"Programação Web
Luis Felipe"	"Sistemas distribuidos
Jean"	"Segurança da Informação
Luiz Evangelista"
2ª aula	"das 19h35
às 20h25"	"Segurança da Informação
Luiz Evangelista"	"Redes de Computadores
Jean"	"Programação Web
Luis Felipe"	"Lab Eng Software
Luiz Evangelista"	"Pgm Linear e Aplicações
Divani"
Intervalo	"das 20h25
às 20h35"	Intervalo	Intervalo	Intervalo	Intervalo	Intervalo
3ª aula	"das 20h35
às 21h25"	"Sistemas distribuidos
Jean"	"Redes de Computadores
Jean"	"Programação Web
Luis Felipe"	"Lab Eng Software
Luiz Evangelista"	"Pgm Linear e Aplicações
Divani"
4ª aula	"das 21h25
às 22h15"	"Sistemas distribuidos
Jean"	"Redes de Computadores
Jean"	"Inglês V
Anna Renata"	"Lab Eng Software
Luiz Evangelista"	"Pgm Linear e Aplicações
Divani"
5ª aula	"das 22h15
às 23h05"	"Sistemas distribuidos
Jean"	"Redes de Computadores
Jean"	"Inglês V
Anna Renata"	"Lab Eng Software
Luiz Evangelista"	"Pgm Linear e Aplicações
Divani"

1º Semestre 2023						
6º  Análise e Desenvolvimento de Sistemas						
sala 6		2ª	3ª	4ª	5ª	6ª
1ª aula	"das 18h45
às 19h35"	"Empreendedorísmo
Francisco"	"Ingles I
Anna Renata"	"Inteligência Artificial
Jean"	"Laboratório de Redes
José Geraldo"	XXXXXXXX
2ª aula	"das 19h35
às 20h25"	"Empreendedorísmo
Francisco"	"Gestão e Governança de Tecnologia da Informação
Manuela"	"Inteligência Artificial
Jean"	"Laboratório de Redes
José Geraldo"	"Gestão de Projetos
Francisco"
Intervalo	"das 20h25
às 20h35"	Intervalo	Intervalo	Intervalo	Intervalo	Intervalo
3ª aula	"das 20h35
às 21h25"	"Ingles VI
Anna Renata"	"Gestão e Governança de Tecnologia da Informação
Manuela"	"Inteligência Artificial
Jean"	"Ingles VI
Anna Renata"	"Gestão de Projetos
Francisco"
4ª aula	"das 21h25
às 22h15"	"Gestão de Equipes
Wagner"	"Gestão e Governança de Tecnologia da Informação
Manuela"	"Ética e Responsabilidade Profissional
Pedro Jacob"	"Laboratório de Redes
José Geraldo"	"Gestão de Projetos
Francisco"
5ª aula	"das 22h15
às 23h05"	"Gestão de Equipes
Wagner"	"Gestão e Governança de Tecnologia da Informação
Manuela"	"Ética e Responsabilidade Profissional
Pedro Jacob"	"Laboratório de Redes
José Geraldo"	"Gestão de Projetos
Francisco"

"

contar quantos nomes de pessoa unicos tem nesses dados e fazer uma tabela com o id e uma coluna com o nome da pessoa e outra com a quantidade de vezes que ela aparece 