![image](https://github.com/isaac-goncalves/gerenciamento-de-salas-V0.1/assets/82903174/830c58c9-604e-4acc-b1e7-fa9538e8f458)
![image](https://github.com/isaac-goncalves/gerenciamento-de-salas-V0.1/assets/82903174/7bf8ed1e-c6b3-44bd-9e32-19b10e90560f)
![image](https://github.com/isaac-goncalves/gerenciamento-de-salas-V0.1/assets/82903174/dc5e6fc4-cd65-4413-8628-8117158f26e7)
![image](https://github.com/isaac-goncalves/gerenciamento-de-salas-V0.1/assets/82903174/01fcf2f2-f604-4030-901a-984de07d644e)
![image](https://github.com/isaac-goncalves/gerenciamento-de-salas-V0.1/assets/82903174/cc283221-3a02-40dc-8787-55ec6e623aaa)
![image](https://github.com/isaac-goncalves/gerenciamento-de-salas-V0.1/assets/82903174/40df6581-32fc-4f7e-8136-1c05d90f38e7)


docker build -t frontend-sgsa . //constroi a imagem do frontend
docker run -p 4173:3000 frontend-sgsa //roda o container do frontend
docker run -p 4173:3000 --name frontend-sgsa-v1 frontend-sgsa //roda o container do frontend
docker run -d --rm -p 5173:5173 --name frontend-sgsa-v1 frontend-sgsa

Promp para arrumar a visão de professores

i need to improve this functino on typescript

i need to fix the time i have this timings 


****
 "quarta": [
    {
      "id": 139,
      "horario_inicio": "21:25",
      "horario_fim": "22:15",
      "dia_da_semana": 3,
      "semestre": 6,
      "created_at": "2023-04-15T23:43:42.997Z",
      "updated_at": "2023-04-15T23:43:42.997Z",
      "professor": "Pedro Jacob",
      "disciplina": "Ética",
      "laboratorio": "Sala-17",
      "agendamentos": []
    },
    {
      "id": 140,
      "horario_inicio": "22:15",
      "horario_fim": "23:05",
      "dia_da_semana": 3,
      "semestre": 6,
      "created_at": "2023-04-15T23:43:42.997Z",
      "updated_at": "2023-04-15T23:43:42.997Z",
      "professor": "Pedro Jacob",
      "disciplina": "Ética",
      "laboratorio": "Sala-17",
      "agendamentos": []
    },
    {
      "disciplina": "Intervalo"
    },
    {
      "disciplina": "Nenhuma Aula"
    },
    {
      "disciplina": "Nenhuma Aula"
    },
    {
      "disciplina": "Nenhuma Aula"
    }
  ],

the data has to compare to this values and keep the order of the classes and the position of intervalo 

const strings = [
    '1ª Aula: 18:45 - 19:35',
    '2ª Aula: 19:35 - 20:25',
    '3ª Aula: 20:25 - 20:35',
    '4ª Aula: 20:35 - 21:25',
    '5ª Aula: 21:25 - 22:15'
  ];

  comandos para rodar o ngrok

  ngrok http 3333

  ngrok http 5173
