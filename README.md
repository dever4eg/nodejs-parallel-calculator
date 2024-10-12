# Expression Evaluation Service

## Description

A calculator that evaluates given mathematical expression in parallel.

## Processing Flow

1. **Expression Validation**
- Validates the mathematical expression for syntax errors such as unexpected characters, wrong parentheses, consecutive operators, etc.

2. **Expression Splitting**
- Splits the expression into sub-expressions. The design allows for different strategies to be implemented.
- Currently, only one strategy is implemented, which runs in parallel only top-level parentheses.

3. **Parallel Execution of Sub-expressions**
- Uses worker threads to evaluate sub-expressions in parallel for improved performance.
- Maximum number of worker threads is restricted to 4. can be configured.

4. **Replace Sub-expressions with Their Results**
- Replaces the evaluated sub-expressions with their results in the main expression.

5. **Evaluate the Final Expression**
- Evaluates the final simplified expression to produce the result.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Evaluate expression

To evaluate an expression, you can use the following curl command:

```shell
curl --location 'localhost:8080/evaluate' \
--header 'Content-Type: application/json' \
--data '{
    "expression": "(1-1 )*2+3 *( 1-3+4)+10/2+(1-3+4)"
}'
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
