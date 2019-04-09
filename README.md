<p align="center">
    <h1 align="center">Simple Notes Application</h1>
    <br>
</p>

Simple Notes application build with [Yii 2](http://www.yiiframework.com/) and [React JS](https://reactjs.org).

HOW TO START THE APP IN DEV MODE
-------------------

```bash
    docker-compose up -d &&
    docker exec -ti notes-rest sh -c "composer install" &&
    docker exec -ti notes-rest sh -c "php init --env=Development --overwrite=all" &&
    docker exec -ti notes-rest sh -c "php yii migrate up --interactive=0"
```

DIRECTORY STRUCTURE
-------------------

```
common
    config/              contains shared configurations
    mail/                contains view files for e-mails
    models/              contains model classes used in both backend and frontend    
console
    config/              contains console configurations
    controllers/         contains console controllers (commands)
    migrations/          contains database migrations
    models/              contains console-specific model classes
    runtime/             contains files generated during runtime
frontend
    src/                 contains the React app source files
    public/              contains the public files for the frontend
rest
    common/              contains shared components between different API versions
    config/              contains frontend configurations
    exceptions/          contains custom exceptions
    runtime/             contains files generated during runtime
    v1/                  contains files for version 1 of the RESTfull API
    web/                 contains the entry script and Web resources
environments/            contains environment-based overrides
```