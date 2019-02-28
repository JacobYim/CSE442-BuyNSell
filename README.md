# CSE442-BuyNSell
This is the repository for the CSE442 BuyNSell Web app project.
Project Description 
Hundreds of students graduate each year all having to get rid of their belongings (furniture, textbooks, etc.) Our mission is to connect students to buy and sell their used or unused items in a more organized and safe way for UB Students as opposed to (Craigslist, Facebook Marketplace, letgo).  

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
> 5. Enjoy it.

> # Heroku #
> 1. Please signup for the Heroku.
> 2. install heroku from [heroku website](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) with following the instruction. 

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

If you have any sql commands which should run in the db when it started, put the sql file to in db.

# How to connect with Heroku
 To connect with Heroku,
> 
> `heroku login`  
> `heroku container:login`  
> `heroku create`  
> `docker build -t registry.heroku.com/<your-app-number>/web .`  
> `docker push registry.heroku.com/<your-app-number>/web`  
> `heroku container:release web -a <your-app-number>`  
> `heroku open -a <your-app-number>`  
> 

When stop the app,
> 
> `heroku ps:scale web=0`
> 
Restart,
> 
> `heroku ps:scale web=1`
> 