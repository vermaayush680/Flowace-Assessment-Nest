# Flowace Interview Assessment


# Requirements
The requirement was to create a sports scheduling API that manages overlapping schedule conflicts.

## Approach
Used Nest to build the APIs, Prisma as the ORM library and MySQL as the database.

All the API end points can be found on http://localhost:3000/api. Just open the url on any browser to view the API documentation.
Also the Postman dump is present in the root directory for ease of access.

### Managing the overlapping schedules

The approach for this is given below: 

```
new_start < existing_end
AND new_end   > existing_start;
```

This condition gives us all the schedules with an overlapping start or end time.
Now we try to avoid this overlap by changing our schedule if possibe.

There are 3 possible cases: 
Case 1: The start and end time of our new schedule completely overlap with the start and end time of an already present schedule
Case 2: The end time of our new schedule overlaps with the start time of an already present schedule
Case 3: The start time of our new schedule overlaps with the end time of an already present schedule

All of these cases are handled in the schedule Controller present in the src file.


### Workspace Layout

The workspace contains the following folders:
1. models
2. prisma
3. src
4. tests

The prisma folder contains the schema.prisma file containing the ORM data.

The models file contains the database schema and a data population sql file.

The src folder contains 4 folders:

1. auth : Containing all the apis and controllers of the jwt authentication.
2. schedule : Containing all the apis and controllers of the schedules.
3. user : Containing all the apis and controllers of the users.
4. prisma : Containing all the apis and controllers of the prisma ORM.


### Setup and How to use

Inorder to install the dependencies, use the command ```npm i```

The .env file contains a test JWT token and database URL.
Configure the database url as per your configuration 
The url has the following format: 

```
mysql://USER:PASSWORD@HOST:PORT/DATABASE
```

Alternatively you can change the password for the root user to 'ayushver01' and 
follow without changingg the database url.

Command to alter password: 
```
ALTER USER 'root'@'localhost' IDENTIFIED BY 'ayushver01';
```

Inorder to populate the database, the models folder has both the Create and Insert qeuries.

Alternatively we can populate the database using prisma too.
Just use the command 
```
npx prisma db push
```

This creates the schema for you but doesn't insert values into it.

To start the server, use ``` npm run start:dev ```

All the API end points can be found on http://localhost:3000/api. Just open the url on any browser to view the API documentation.
Also the Postman dump is present in the root directory for ease of access.

The API are jwt authenticated so you can either use the test token present in the .env folder or generate a new one using the auth/login API.
