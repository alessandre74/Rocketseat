<div align="center" style="padding-bottom:30px">
<img src ="./src/assets/logo.svg" width="30%" />
</div>

<div align="center" style="padding-bottom:30px; background:transparent">
<img src ="./assets/myCars.gif" style="background:transparent" />
</div>

## 💻 Projeto

RentX é um aplicativo de aluguel de carros desenvolvido no curso Ignite da Rocketseat.

## 🚀 Tecnologias utilizadas

- [Expo CLI](https://expo.dev/)
- [Axios](https://github.com/axios/axios)
- [WatermelonDB](https://github.com/Nozbe/WatermelonDB)
- [React Native FastImage](https://github.com/DylanVann/react-native-fast-image)
- [Recat Native NetInfo](https://github.com/react-native-netinfo/react-native-netinfo)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [React Native Calendars](https://github.com/wix/react-native-calendars)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
- [LottieFiles](https://lottiefiles.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Styled Components](https://styled-components.com/)

### Instalação

Clone o repositório da API no endereço abaixo

```
https://github.com/rocketseat-education/ignite-react-native-rentx/tree/main/server
```

Acesse o diretório do projeto

```
cd server
```

Instale as dependências

```
yarn ou sudo yarn
```

Inicie o server

```
yarn start
```

Clone o repositório do Aplicativo

```
git clone git@github.com:alessandre74/Rocketseat/tree/main/mobile/expo/rentx-mobile.git
```

Acesse o diretório do projeto

```
cd rentx-mobile
```

Instale as dependências

```
yarn ou sudo yarn
```

Devido um problema no framework database WatermelonDB, segue abaixo alguns passos:

```
Ir até a pasta node_modules/@nozbe/simdjson/src e copiar os arquivos simdjson.cpp
e simdjson.h, é só copiar e colar na pasta node_modules/@nozbe/watermelondb/native/shared.
Estamos utilizando a versão 0.24.0, e no momento do desenvolvimento do projeto, essa versão
apresentava esse problema. Depois desse procedimento, no terminal, ir até a pasta ios e rodar
o comando pod install. Não esqueça de voltar para a pasta do projeto rentx-mobile.

```

Start o projeto

```
yarn start
```

Inicie o aplicativo iOS

```
yarn run ios
```

Inicie o aplicativo Android

```
yarn run android
```

## 📄 License

Este projeto está sob a licença MIT
