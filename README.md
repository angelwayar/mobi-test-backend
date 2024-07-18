# Test_backend
El siguiente proyecto elaborado en NestJS, cuentas con las siguientes característica:

 - POST - `/api/file` - Permite subir un archivo ya sea de los siguiente tipos `jpg|jpeg|png|heic|webp`
 - GET - `/api/file/{page}/{limit}` - Retorna los archivos almacenados con la siguiente combinación `/api/file/0/0`.
 - GET - `/api/file/{id}` - Retorna un archivo en específico.
 - DELETE - `/api/file/{id}` - Eliminar un archivo en específico.


## Instalación

```bash
$ npm install
```

## Configuración
Se debe de configurar el archivo `.env` que se encuentra en la raíz del proyecto, actualizando las siguientes variables.

```txt
AWS_ACCESS_KEY=
AWS_SECRET_ACCESS_KEY=
AWS_S3_REGION=
AWS_BUCKET_NAME=

STR_CONNECTION=
```



## Poniendo en marcha la app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

