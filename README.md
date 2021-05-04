# RIB
Retail Internet Banking build using Java, React, Spring-boot, Hibernate


# RIB-Prototype
The folder "RIB-Prototype" contains the Html,CSS and Javascript prototype of the project
To view the project go to [RIB-Prototype](https://ojaswa-chaurasia-saggezza.github.io/RIB/RIB-Prototype)

# How to run the project

## Pre-requisites
- Node v14.15.4 (or above)
- npm 6.14.10 (or above)
- Eclipse 2020-12 (4.18.0)
- Java 15
- MySQL 8

## Setup

Download the project zip and unzip it in the desired folder or clone the project.

### Frontend setup

1. Go to the ["rib"](rib) folder of the project.
2. Open cmd in that location
3. Type `npm install`

### Backend setup

1. Open Eclipse
2. Go to File -> Import -> Existing Maven Project -> Browse to this ["rib-backend"](rib-backend) folder
3. Let Eclipse import the necessary dependencies.

The [reference documentation](https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/html/) includes detailed [installation instructions](https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/html/getting-started.html#getting-started-installing-spring-boot)

### Running the project

1. Run the backend
    1. Open the backend in eclipse.
    2. Open the [application.properties](rib-backend/src/main/resources/application.properties) file
        1. Change the 1<sup>st</sup> line to ` spring.datasource.url = [URL to your mysql database]`
        2. Change the 2<sup>nd</sup> line to `spring.datasource.username = [Username for DB]`
        3. Change the 3<sup>rd</sup> line to `spring.datasource.password = [Password for DB]` 
    3. Run the [RibApplication.java](rib-backend/src/main/java/com/rib/rib/RibApplication.java) file as Java Application
    4. Your backend would start running at port 8080.
2. Run the frontend
    1. Go to the [Rib](rib) folder
    2. Open cmd
    3. Type `npm start`
    4. Your frontend would start running at port 3000.
3. To generate dummy data go to [localhost:8080/api/v1/Customer/GenerateDummyData](http://localhost:8080/api/v1/Customer/GenerateDummyData).
4. Now open [localhost:3000](http://localhost:3000).
5. Signup as either of the following 
    - Username - Shanti &emsp; Password - Shanti
    - Username - Ojaswa &emsp; Password - Ojaswa
    - Username - Nayan &emsp; Password - Nayan
6. Now you should be able to navigate inside the project.


# Developers
Shanti Mukati
Ojaswa chaurasia
Nayan Verma

