# I'll Serve Soup 2

## Server and Database

### To start the server if running locally:

First, install all dependencies using yarn or npm before moving on. I recommend npm because yarn couldn't find _bcryptjs_ when I was setting this up.

Run _**npm run start**_ OR _**yarn start**_ to start.
By default the server runs on port 5000 if it is not found at https://ill-serve-soup2-db.herokuapp.com/

## Table of Contents

**Database Tables**
[Inventory](#Inventory) |
[Users](#Users) |
[Locations](#Locations) |

**CRUD Endpoints**
[Inventory](#inventory-1) |
[Users](#users-1) |
[User Accounts](#user-accounts) |
[Locations](#locations-1) |

NOTE: Do not include the id number in any PUT or POST requests. The system autogenerates it.

NOTE #2: You must put quotation marks around the key names in your objects, otherwise you will receive an error.

```
{ "username" : "abc123" }, not { username : "abc123" }

```

---

# **Database Schema**

## Tables

Column names are _italicized_ and **bolded**

### Inventory

Used for managing total inventory and individual items. Able to Add items, remove items, update items AND get a list of the total inventory

-   Has an auto-incrementing unique **_id_** number (you don't need to add this)

-   An item **_name_** is required and must be unique, with a max length of 255 characters

-   A **_quantity_** is optional. If you don't add a quantity, it will default to 0.

-   The **_units_** are also optional. This would be useful for entering units of measure for ingredients. Can be anything and is made to be flexible for a soup kitchen that probably does not track the inventory down to the ounce. (example: "lbs" or "bags" for dry goods, "cans" for canned goods)

_example:_

| id  | name         | quantity | units |
| --- | ------------ | -------- | ----- |
| 1   | Chicken Soup | 25       | cans  |

---

### Users

Used to manage list of users and individual users

-   Has an autoincrementing, unique **_id_** number (you don't need to add this)

-   A user **_username_** is required and must be unique, max length 255 characters

-   A user **_password_** is required, max length 255 characters.

-   A user **_name_** , max length 255 characters

-   A user **_role_** is required, max length 128 characters (Though this will depend on whoever creates the registration form, here are some examples: "admin", "cook", "assistant", "manager", "volunteer", etc. )

-   A user **_email_** , max length 255 characters

-   A user **_phone_** , max length 128 characters

_example:_

| id  | username | password   | name      | role      | email              | phone        |
| --- | -------- | ---------- | --------- | --------- | ------------------ | ------------ |
| 3   | jsmith99 | _password_ | Joe Smith | volunteer | jsmith99@email.com | 123-456-7890 |

---

### Locations

Used to manage list of locations and individual locations

-   Has an autoincrementing, unique ID number

-   A **_name_** is required and must be unique, max length 255 characters

-   A **_streetAddress_**, max length 255 characters

-   A **_city_** , max length 255 characters

-   A **_state_**, max length 128 characters

-   An **_email_** , max length 255 characters

-   A **_phone_** , max length 128 characters

_example:_

| id  | name     | streetAddress | city      | state  | zipCode | email                 | phone        |
| --- | -------- | ------------- | --------- | ------ | ------- | --------------------- | ------------ |
| 3   | Downtown | 123 Main St   | Townville | Oregon | 12345   | soupkitchen@email.com | 123-456-7890 |

---

# **Endpoints**

## Inventory

### /api/inventory

#### GET

Returns a JSON object with the entire inventory. User must be logged in to access.

Success: Returns a status of 200 and a JSON object with the inventory

#### POST

The request body must include a unique name, and can optionally include quantity and units. User must be logged in to access.

```javascript
{
	name:  "Tuna - Salad Premix", //required
	quantity:  89,
	units:  "ounces",
},
```

Success: Returns a status of 201 and a JSON object with a success message and the id number of the new item.

---

### /api/inventory/_{id}_

#### GET

Returns a JSON object with the corresponding item. User must be logged in to access.

Success: Returns a status of 200 and a JSON object containing the item.

#### PUT

The request body must include information to be updated. User must be logged in to access.

Success: Returns a status of 201 and a JSON object with a success message and the count of updated items.

#### DELETE

Permanently removes the item from the inventory. A confirmation dialog may be a good idea here. User must be logged in to access.

Success: Returns a status of 200 and a JSON object with a success message with the count of deleted items.

---

## Users

### /api/users

#### GET

Returns a JSON object with the entire users list. User must be logged in to access this.

REACT DEV >> _You need to have a way to retrieve the token that is generated._

Success: Returns a status of 200 and a JSON object containing all of the users.

---

### /api/users/_{id}_

#### GET

Returns a JSON object with the corresponding user. User must be logged in to access.

```javascript
{
    "id": 4,
    "username": "joller3",
    "name": "Jerrie Oller",
    "role": "cook",
    "email": "joller3@ebay.co.uk",
    "phone": "529-300-3099"
}
```

Success: Returns a status of 200 and a JSON object containing the requested user.

#### PUT

The request body must include information to be updated. User must be logged in to access.

Success: Returns a status of 201 and a JSON object with a success message with the count of updated items.

#### DELETE

Permanently removes the corresponding user from the database. A confirmation dialog may be a good idea here. User must be logged in to access.

Success: Returns a status of 200 and a JSON object with a success message with the count of deleted items.

---

## User Accounts

### /api/useraccounts/register

#### POST

The request body must include a unique username and a password. It can optionally include a name, role, email, and phone number. Returns a success message and the id number of the new user.

```javascript
{
	username:  "jdacthj", //unique, required
	password:  "hvTsxvWsRRl", //required
	name:  "Jaquenette D'Acth",
	role:  "volunteer",
	email:  "jdacthj@ihg.com",
	phone:  "710-804-5935",
}
```

Success: Returns a status of 201 and a JSON object with a success message and the id number of the new user.

---

### /api/useraccounts/login

#### POST

The request body must include a unique username and a password matching what is on the database. Returns a success message and a token which is required to pass to be able access restricted routes.

```javascript
{
	username:  "jdacthj", // required
	password:  "hvTsxvWsRRl", //required
}
```

REACT DEV >> _You need to have a way to store the token that is generated. LocalStorage(setItem) is a simple way_

Success: Returns a status of 201 and a JSON object with a success message and the token.

---

## Locations

### /api/locations

#### GET

Returns a JSON object with the entire locations list. User must be logged in to access.

Success: Returns a status of 200 and a JSON object containing all of the locations.

#### POST

The request body must include a unique name, and can optionally include a streetAddress, a city, state, zipCode, email, and phone. User must be logged in to access.

```javascript
{
	name:  "Independence", // unique, required
	streetAddress:  "20 Saint Paul Park",
	city:  "Bronx",
	state:  "New York",
	zipCode:  12345,
	email:  bronxsoupkitchen@email.com,
	phone:  "718-395-9875",
},
```

Success: Returns a status of 201 and a JSON object with a success message and the id number of the new location.

---

### /api/locations/_{id}_

#### GET

Returns a JSON object with the corresponding location. User must be logged in to access.

```javascript
{
	id:  6,
	name:  "Northview",
	streetAddress:  "7172 Northridge Crossing",
	city:  "Plano",
	state:  "Texas",
	zipCode:  "75074",
	email:  "estockings5@odnoklassniki.ru",
	phone:  "972-650-6963",
},
```

Success: Returns a status of 200 and a JSON object with the requested location.

#### PUT

The request body must include information to be updated. User must be logged in to access.

Success: Returns a status of 201 and a JSON object with a success with the count of updated records.

#### DELETE

Permanently removes the corresponding location from the database. A confirmation dialog may be a good idea here. User must be logged in to access.

Success: Returns a status of 200 and a JSON object with a success message and the count of the deleted records.

---

```
                .-~~~~~~~~~-._       _.-~~~~~~~~~-.
            __.'              ~.   .~              `.__
          .'//        END       \./      OF   THE    \\`.
        .'//                     |           README    \\`.
      .'// .-~"""""""~~~~-._     |     _,-~~~~"""""""~-. \\`.
    .'//.-"                 `-.  |  .-'                 "-.\\`.
  .'//______.============-..   \ | /   ..-============.______\\`.
.'______________________________\|/______________________________`.
```
