# APP-MOBILE-CHAT

Bienvenue dans le projet App-Mobile-Chat! Il s'agit d'une application de chat mobile développée en utilisant React Native, NodeJS, Express et MySQL.

## Comment commencer?

## Cloner le projet

Premièrement, vous devez cloner le dépôt pour obtenir le code source sur votre machine locale.

https://github.com/Tchessi/app-mobile-chat.git


## Configuration du back-end

```
Accédez au dossier back-end :
cd back-end
Installez les dépendances nécessaires :
npm install
Installez nodemon :
npm i nodemon
Lancez le serveur :
nodemon server ou node server

#Pour des tests spécifiques (avec postman par exemple), le backend répond à l'adresse: http://localhost:3000:

```
## Base de données
```
#Assurez-vous d'avoir MySQL installé sur votre machine et lancez-le.
```
bash
npm i mysql -g 
```

# Vérifier que le nom d'utilisateur et le mot de passe dans le fichier de configuration config.json correspondent à vos informations d'identification MySQL locales

Créez la base de données :
```
npx sequelize-cli db:create
```

Appliquez les migrations :

```
npx sequelize-cli db:migrate
```
```
# Example: Génerer les models et les migrations
```
Pour l'utilisateur :
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,password:string,imageUrl:string,deleted:boolean,isOnline:boolean,admin:boolean

Pour générer uniquement les migrations :
npx sequelize-cli migration:generate --name migration_name_here --model User --generate-migration
```

# Pour installer sequilize CLI
```
npm install --save-dev sequelize-cli
```

## Technologies utilisées

```
# Pour le serveur : Node.js et framework Express
# Pour la base de données : MySQL et Sequelize ORM

```

## Mesures de sécurité et de mise en place

```
# Hashage du mot de passe utilisateur avec bcrypt
# Authentification de l'utilisateur par token avec jsonwebtoken

```
## API documentation Postman
https://documenter.getpostman.com/view/17540434/2s8Z72VX2N

## TRELLO 

https://trello.com/invite/tchessisamirismailsalim/ATTI9472e90e9d0b4861b4b1a72e24a8ecd3FCA49511

## FIGMA 

https://www.figma.com/file/L9vcJYA2TyRMPZKXOhoWYB/V-2?type=design&node-id=0-1&t=OPLfuirAQ1u9q5ZN-0


# CONFIGURATION DATABASE
Crée un fichier config/config.json et mettre en place la configuration de la base de données

