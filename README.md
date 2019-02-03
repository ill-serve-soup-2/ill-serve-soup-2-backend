Pitch: A simple soup kitchen management software that allows inventory tracking and easy user sign up.

MVP: Users can login and view their inventory for their soup kitchen. User can create, read, update and delete items in their inventory.

Stretch Goal: Add a 'volunteer' sign up section where users can login and see kitchens in need of volunteers to help serve those in need.

DATABASE SCHEMA

Tables: (Column names are CAPITALIZED) - Inventory
Used for managing total inventory and individual items -- Has an autoincrementing unique ID number -- An item NAME is required with a max length of 255 characters -- A QUANTITY is optional. If you don't add a quantity, it will default to 0. -- UNITS are also optional. This would be useful for entering units of measure for ingredients. Can be anything and is made to be flexible for a soup kitchen that probably does not track the inventory down to the ounce. (example: "lbs" or "bags" for dry goods, "cans" for canned goods)

        Able to Add items, remove items, update items AND get a list of the total inventory

    - Users
        Used to manage list of users and individual users
        -- Has an autoincrementing, unique ID number
        -- A user NAME is required, max length 255 characters
        -- A user ROLE is required, max length 128 characters (Though this will depend on whoever creates the registration form, here are some examples: "admin", "cook", "assistant", "manager", "volunteer", etc. )
        -- A
