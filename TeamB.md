
# Team B API


A brief description of what this project does and who it's for


## Acknowledgements

 - POSTMAN 
 - VSCODE
 - DOCKER
 


## Deployment

After pull down the project setup .env and download the node 

```bash
    cd /backend (or cd b and press tab)
    npm i
```



## .env

![App Screenshot](https://ik.imagekit.io/hoangdat0704/teambenv.PNG)

```bash
MONGO_URI = mongodb+srv://admin:iamadmin@monolithic-cluster.xgeha.mongodb.net/?retryWrites=true&w=majority&appName=Monolithic-Cluster
PORT = 6000
```
## Docker Deployment 

[Install Docker window ](https://docs.docker.com/desktop/setup/install/windows-install/)

Window can get bug. The best solution is search [Youtube](https://www.youtube.com/) or ask this [guy]

![App Screenshot](https://ik.imagekit.io/hoangdat0704/helper.PNG)

If he cant fix it, just download virtualbox linux and download Docker on it. Goodluck 



[Install Docker mac ](https://docs.docker.com/desktop/setup/install/mac-install/)



## API Reference

### Charity


#### Get all charities

```http
  GET /charity/all
```



#### Get charity by id

```http
  GET /charity/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Add charity 

```http
  POST /charity/create
```

#### Editor charity
```http
  PUT /charity/update/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


#### Delete charity

```http
   DELETE /charity/delete/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

### Donor 

#### Get all donors 

```http
  GET /donor/all
```



#### Get donor by id

```http
  GET /donor/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Add donor 

```http
  POST /donor/create
```

#### Editor donor
```http
  PUT /donor/update/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


#### Delete donor

```http
   DELETE /donor/delete/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |