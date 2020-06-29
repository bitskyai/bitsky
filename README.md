# Munew Engine and UI

This docker image includes [Munew engine](https://docs.munew.io/overview#munew-engine) and UI.
This docker image expose `9099` port.

## Configuration

### Environment Variables

> All `TYPEORM_` are for [typeorm](https://typeorm.io/), you can find all the environment variables from [Using environment variables](https://typeorm.io/#/using-ormconfig/using-environment-variables). For now, only tested with environemnt variables list in below, if you use other environment variables, you take your own risk

1. `TYPEORM_CONNECTION`: **Optional**. Database connection type. Currently, available values [`sqlite`, `mongodb`]. Default will use `sqlite`.
2. `TYPEORM_DATABASE`: **Optional/Reuired**. Database name. Required when your `TYPEORM_CONNECTION` isn't `sqlite`.

   For the sqlite, if you want to persist your data after docker container was killed, you can add a volumn when start docker, and configure the absolute path. For example, you did `docker -v /host/shared:/mnt/shared`, then you can configure this value `/mnt/shared/munew.sql`.

3. `TYPEORM_HOST`: **Optional/Reuired**. Database host. Required when your `TYPEORM_CONNECTION` isn't `sqlite`. Example: `munew123.mlab.com`
4. `TYPEORM_PORT`: **Optional/Reuired**. Database host port. Required when your `TYPEORM_CONNECTION` isn't `sqlite`. Example: `27017`
5. `TYPEORM_USERNAME`: **Optional**. Database username. Example: `dbuser`
6. `TYPEORM_PASSWORD`: **Optional**. Database password. Example: `welcome`
7. `PORT`: **Optional**. Port number for this example server. Default value is `9099`, when you run it in docker mode, you can map host port to `9099`

## Local

If you want to run it local, make sure you already installed [NodeJS](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/).

1. Install node_modules. `yarn install`
2. Start server
   ```
   npm start
   ```
   It start a server on local, you can access it [http://localhost:9099](http://localhost:9099)

> You also can change **Environment Variables**

## Docker

### Use SQLite

```
docker run -p 9099:9099  munew/engine-ui
```

This will use `SQLite` if you close docker container, then database file also will be deleted

### Use MongoDB

Find detail of the environment values from [Add or modify Environment Variables](https://docs.munew.io/how-tos/configure-munew-in-heroku#add-or-modify-environment-variables).

```
docker run -e TYPEORM_CONNECTION=mongodb \
           -e TYPEORM_HOST=ds123456.mlab.com \
           -e TYPEORM_DATABASE=munew \
           -e TYPEORM_PORT=55728 \
           -e TYPEORM_USERNAME=dbuser \
           -e TYPEORM_PASSWORD=dbpassword \
           -p 9101:9099 \
           munew/engine-ui
```

This is an example of connect to [mlab.com](https://mlab.com), make sure you change **TYPEORM_HOST**, **TYPEORM_DATABASE**, **TYPEORM_PORT**, **TYPEORM_USERNAME**, **TYPEORM_PASSWORD**, and port mapping

## Heroku

You can simply deploy this example to Heroku by click this button:
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
