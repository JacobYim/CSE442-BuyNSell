# CSE442-BuyNSell
This is the repository for the CSE442 BuyNSell Web app project.
Project Description 
Hundreds of students graduate each year all having to get rid of their belongings (furniture, textbooks, etc.) Our mission is to connect students to buy and sell their used or unused items in a more organized and safe way for UB Students as opposed to (Craigslist, Facebook Marketplace, letgo).  

# Explanation of Files/Folders #

>## 1. db ##
> - contains files for the postgre database
>## 2. node_modules ##
> - contains node.js middleware for website functions (i.e. body_parser, nodehasher, pg)
>## 3. tests ##
> - contains all unit tests for website key functions
>## 4. views ##
> - contains all ejs templates to render site's html 
---
# Pre-requirement #

Before running our codes, we need to setup the below components.

## Docker ##

# How to Install #

> # Docker #   
> 1. Please make a docker account at [This link](https://hub.docker.com/signup).
> 2. Downloads the docker install file at the below links depends on the Operating System.  
> 
> * [Mac OS](https://hub.docker.com/editions/community/docker-ce-desktop-mac) 
> * [Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows) 
>  
> 3. After executing the downloaded file, open the `termial` or `cmd`.
> 4. Type the below codes to check successfully Docker is installed.
> ```
> docker version            // to check that you have the latest release installed
> docker run hello-world    // to verify that Docker is pulling images and running as expected
>```  
> 5. Enjoy it. https://www.bufbuynsell.net

# How to Run the Server #

> 1. Downloads the codes of this repository and move to the directory.  
> ```
> git clone https://github.com/JacobYim/CSE442-BuyNSell.git
> ```
> Note: make sure that the Docker is running.
>
> 2. Run Docker Image at the port 8080.
> ```
> docker build -t buynsell .
> docker-compose up -d
> node server.js
> ```
> (Note : the `docker-compose` has components to make server docker, so it tries to the server docker at 8080. However it does not survive becuase the database connection is not set)
>
> If does not works, please type the following command at terminal: `npm install pg`.
> 
> 3. Approach [http://0.0.0.0:8080](http://0.0.0.0:8080/) with Web Browser.
> 
> 4. When want to **quit the server** press `control + C` key on keyboad at the terminal typed `node server.js`  
>    When want to **quit database** press `docker-compose down` on the terminal. 
> 
> 5. When want to run shell of the server, type the command `docker exec -it <container id> /bin/bash`

> 6. If there is changes, type the below.
> ```
> docker-compose down
> docker images
> docker image rm -f buynsell postgres
> docker build -t buynsell .
> docker-compose up -d
> ```

# How to access Databsase 
After running the command `docker-compose up -d` (where `-d` tag make run in the background) and `docker ps`,
use `docker exec -it <container name> psql -U postgres -W postgres`. And type the password.

If you want to access in bash shell,
```
docker exec -it <container name> bash  // enter into docker with  bash
su - postgres
psql
```

# Acceptance Test
Acceptance test file for the feature listed below :
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

are in the test directory. Please read the README.md file in test directory to run acceptance test.

# Website:
The webapp is deployed on aws.
Web link: https://www.bufbuynsell.net
