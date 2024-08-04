# Pokedex

#### Project based on free Pokédex API: https://pokeapi.co/docs/v2

## Application made with React.js based on PokeApi

This project is an example that was built along the React course. Every part of this project is sample code which shows how to do following:

- Create routing using [react-router](https://reactrouter.com/en/main)
- Create a simple database using [json-server](https://www.npmjs.com/package/json-server)
- Add [notistack](https://notistack.com/) pop-up notifiations
- Validate inputs with [zod](https://zod.dev/)
- Implement [MUI Components](https://mui.com/)
- User unique ID with [uuid](https://www.npmjs.com/package/uuid)

# Installation

Navigate to folder where application is, open terminal and paste:

```sh
npm i
npm run dev
```

These commands install node modules and run an application along with json-server database.

# Database

## User structure:

```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string",
  "favourites": [],
  "created": [],
  "stats": []
}
```

## Pokemons structure:

### Pokemon added to favourites:

```json
{
  "id": "number",
  "name": "string",
  "weight": "number",
  "base_experience": "number",
  "height": "number",
  "abilities": [],
  "img": "string"
}
```

### Example of pokemon created by user:

```json
{
  "id": "b171088f-9930-43f6-bae3-f77715db4d47",
  "name": "Tram",
  "weight": 100,
  "height": 132,
  "base_experience": 23,
  "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/153.png"
}
```

### Modified stats of dueled pokemon

```json
{
  "id": "b5ab8d9b-58e9-409f-9e40-f7c51209d1b7",
  "base_experience": 133,
  "win": 1,
  "lose": 0
}
```
