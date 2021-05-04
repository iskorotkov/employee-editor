# Employee Editor

[![Netlify Status](https://api.netlify.com/api/v1/badges/460fa220-42d1-4e0c-9ed0-242357d0535c/deploy-status)](https://app.netlify.com/sites/employee-editor/deploys)

Deployed to [Netlify](https://employee-editor.netlify.app/).

Employee Editor allows you to create, edit and delete info about employees.

- [Employee Editor](#employee-editor)
  - [Build](#build)
  - [Run](#run)
  - [Project structure](#project-structure)

Features:

- CRUD;
- persistent storage backed by Local Storage;
- form validation;
- loading possible employee positions from hh.ru;
- list of employee's colleagues;
- list of user defined tags for each employee;
- automated deployment to Netlify;

## Build

To build production version use:

```shell
yarn build
```

Production-ready app will be stored in `./build` folder.

## Run

To start development server use:

```shell
yarn start
```

## Project structure

- src
  - components - all components;
    - ColleaguesSelector - custom `select` element for selecting several colleagues for each employee;
    - EmployeeForm - form used for creating and editing employees;
    - EmployeeList - list of all employees;
    - Floating - React wrapper for `.floating` Bootstrap 5 class.
    - PositionSelector - custom `select` element for selecting employee position that loads possible variants from hh.ru;
    - TagInput - a card for editing an employee custom tag;
    - TagsList - a list of employee tags;
  - data - core objects and interfaces;
  - formatting - data and employee data formatting;
  - localStorage - localStorage-based employees repository;
  - styles - style configuration for various components.
