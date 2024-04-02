# Acceptance Test

## List of Feature
- Sign In
- Log In
- add item
- show item in category
- add user image
- change user image and information
- change password
- user-session
- logout
- category page paging
- category pages redirecting

## Introduction to Files in Test Directory
> - chromedriver : driver to use selenium with the chrome browser
> - sprint2-test.py : acceptance test file for sprint2 features written by python3
> - Sprint3-test_category_page.py : acceptance test file for category features written by python3

## sprint2 features test

Before running sprint2-test.py, run the server and database.

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
    python3 sprint2-test.py
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
    python3 sprint2-test.py
    ```
## sprint3 features test

Before running sprint2-test.py, run the server and database.

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
    python3 Sprint3-test_category_page.py
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
    python3 Sprint3-test_category_page.py
    ```