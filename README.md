# PREREQUISITE
# Project is Designed and Developed on the following version
 
   1. npm --version - [6.14.4]
   2. node --version - [v10.21.0]
   3. mongo --version - [MongoDB shell version v4.2.8]
   3. For User Friendly environmnet of MongoDB Database MongoDB Compass has been used (Version 1.20.5)
 
# How to run install require dependencies
   `**Note: Before Hitting the `npm install` make sure you are on the root directory of the project.`
 
   1. npm install
 
   `This one command will install all the required dependencies.`

# Database Dependencies

   `The MongoDB database is being used for this project`

   `The existing Database with 31 product is saved under Database Directory in database.json file`
   
   `Need to import the database.json into your local MongoDB.`
    Note: `DATABASE Name: restaurant`
         `COLLECTION Name: dishes`
    Note: `Refer the official website of mongo for how to import database to your local MongoDB environment.`


# Run the project with below command
   `node server.js`
 
   `The project will start running on Port 3000 if the port 3000 is not occupied. or else it will throw.`
 
# Some Key feature About Project
  
   1. There are two icon present on the screen:
 
       a. Add Item [Left Bottom]: `This will open a page where you can add a new product to the database.`
                  
         **Note: The image which you will upload to database must be in jpg format and image
                 should present in the images folder of the Project.
      
       b. Order Now [Right Bottom]: `This icon will redirect to page where you can see your selected item list with total money charged for it.`
 
   2. Modify Food item: `You can anytime come back to the main page to modify the selected item list from the Order page.`
 
   3. `The functionality of filter based on Food type i.e.; Veg and Non-Veg`
 
   4. `The functionality of filter based on Food Category i.e.; Starter, Breakfast, Salads, Meal,   Beverage.`
 
   5. `The functionality of Sorting the food item list based on the Price and Time to serve.`

   6. `You are not allowed to go to order now page if item is not selected.`

   7. `You can not select any particular iteam more than 10.`
 
   ** Note: `Search Box is Present But the feature is not provided.`
