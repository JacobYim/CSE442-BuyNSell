# CSE442-BuyNSell
This is the repository for the CSE442 BuyNSell Web app project.
Project Description 
Hundreds of students graduate each year all having to get rid of their belongings (furniture, textbooks, etc.) Our mission is to connect students to buy and sell their used or unused items in a more organized and safe way for UB Students as opposed to (Craigslist, Facebook Marketplace, letgo).  

---
# Pre-requirement #

Before running our codes, we need to setup the below components.

- ## Docker ##

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

# How to Run the Server with the Docker #

> 1. Downloads the codes of this repository and move to the directory.  
> ```
> git clone https://github.com/JacobYim/CSE442-BuyNSell.git
> ```
> 2. Builds the Dockerfile to image.
> ```
> docker build -t buynsell .
> ```
> Note: make sure that the Docker is running.
>
> 3. Run Docker Image at the port 2000.
> ```
> docker run --rm -it -p 2000:2000 buynsell
> ```
> 4. Approach [http://127.0.0.1:2000/](http://127.0.0.1:2000/) with Web Browser.
> 5. When quit the server, press `control + C`
>   