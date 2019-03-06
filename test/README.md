# Acceptance Test

## List of Feature
- Sign In
- Log In

## Introduction to Files in Test Directory
> - chromedriver : driver to use selenium with the chrome browser
> - signin_acceptance_test.py : acceptance test file of signin function written by python3
> - login_acceptance_test.py : acceptance test file of login function written by python3

## Signin-acceptance test

> In this test, test the following cases :  
>
> 1. the empty string input case has to be blocked. ex> ''  
> 
> 2. the space string input case has to be blocked. ex ) ' '
>   
> 3. invalid email case has to be blocked. ex) 'erewsdf@sdf', 'werwer.dsfs', 'sdfsdfsdf'  
> 
> 4. invalid ubid case has to be blocked. ex) over 8 numbers.  
> 
> 5. invalid input cases which have ';', '.', and '='.
> 
> 6. The valid input cases
> 
> 7. Duplicated valid input cases

Before running signin_acceptance_test.py, run the server and database.

1. Move to upper directory, CSE442-BuyNSell
   ```
   cd  ..
   ```
2. Make the docker image buynsell and run docker-compose to run database.
     
   (Note : This instruction assume that already Docker and node.js have been installed)
   ```
   docker build -t buynsell .
   docker-compose up -d
   ```
3. Run the server on your machine
   ```
   node server.js
   ```

4. Turn on another terminal, move to the current `CSE442-BuyNSell/test` directory, and run the test file.

    (Note : please wait a while the server and database container set to be run status)

    ```
    python3 signin_acceptance_test.py
    ```
5. If you re-run the test or run after the other test, restart the server and database because server is depend on the database and there is test cases depend on the database. Please follow below sequence.
   
   At terminal 1 (server), 
   ```
   ctl + c 
   docker-compose down
   docker-compose up -d
   node server.js
   ```

    (Note : please wait a while the server and database container set to be run status)

   At terminal 2 (test),
   ```
    python3 signin_acceptance_test.py
    ```

## login-acceptance test

> In this test, test the following cases :  
>
> 1. the empty string input case has to be blocked. ex> ''  
> 
> 2. the space string input case has to be blocked. ex ) ' '
>   
> 3. invalid email case has to be blocked. ex) 'erewsdf@sdf', 'werwer.dsfs', 'sdfsdfsdf'  
> 
> 4. invalid input cases which have ';', '.', '(', ')', ' ' ' and '='.
> 
> 5. The valid input cases

Before running signin_acceptance_test.py, run the server and database.

1. Move to upper directory, CSE442-BuyNSell
   ```
   cd  ..
   ```
2. Make the docker image buynsell and run docker-compose to run database.
     
   (Note : This instruction assume that already Docker and node.js have been installed)
   ```
   docker build -t buynsell .
   docker-compose up -d
   ```
3. Run the server on your machine
   ```
   node server.js
   ```

4. Turn on another terminal, move to the current `CSE442-BuyNSell/test` directory, and run the test file.

    (Note : please wait a while the server and database container set to be run status)

    ```
    python3 login_acceptance_test.py
    ```
5. If you re-run the test or run after the other test, restart the server and database because server is depend on the database and there is test cases depend on the database. Please follow below sequence.
   
   At terminal 1 (server), 
   ```
   ctl + c 
   docker-compose down
   docker-compose up -d
   node server.js
   ```
    (Note : please wait a while the server and database container set to be run status)

   At terminal 2 (test),
   ```
    python3 login_acceptance_test.py
    ```