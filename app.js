const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const _ = require("lodash");


const date = require(__dirname + '/date.js');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());


// Connecting to a database using Mongoose
mongoose.connect("mongodb+srv://Admin-Emmanuel:Nuwell123@todolist.pu5ghma.mongodb.net/TodoListDB");


// Creating a Schema for Items
const itemsSchema = {
    name: {
        type: String,
    }
};

//Mongoose Model
const Item = mongoose.model("Item", itemsSchema)

const item1 = new Item({
    name: "Welcome To Your TodoList"
});

const item2 = new Item({
    name: "Create a TodoList"
});

const item3 = new Item({
    name: "Hit the + button to add a new item"
});

const item4 = new Item({
    name: "Hit the - button to delete an item"
});


const defaultItems = [item1, item2, item3, item4];


const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);


app.get("/", function(req, res) {

    const hour = date.getDay();

    const day = date.getDate();



    Item.find({}, function(err, ItemsFound) {

        if (ItemsFound.length === 0) {
            Item.insertMany(defaultItems, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully added to the TodoList");
                }
            });
            res.redirect("/")
        } else {
            res.render("list", {
                ListDay: hour,
                ListTime: day,
                ListTitle: "Today",
                newItems: ItemsFound
            });
        }

    });

});


app.get("/:customListName", function(req, res) {

    const hour = date.getDay();

    const day = date.getDate();

    const customListName = _.capitalize(req.params.customListName);


    List.findOne({ name: customListName }, function(err, foundList) {
        if (!err) {
            if (!foundList) {
                // Create a new list

                const list = new List({
                    name: customListName,
                    items: defaultItems
                });

                list.save();
                res.redirect("/" + customListName);
            } else {
                // Show existing list
                res.render("list", {
                    ListDay: hour,
                    ListTime: day,
                    ListTitle: foundList.name,
                    newItems: foundList.items
                });
            }
        }
    });
});


// Adding items to the TodoList 

app.post("/", function(req, res) {

    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
        name: itemName
    });

    if (listName === "Today") {
        item.save();
        res.redirect("/");
    }
    // Problem Unsolved
    // else {
    //     List.findOne({ name: listName }, function(err, foundList) {
    //         foundList.newItems.push(item);
    //         foundList.save();
    //         res.redirect("/" + listName);
    //     });
    // }
});



// Item.deleteOne({
//         _id: "632cd70ed6956771d4df10c5"
//     },
//     function(err) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("successfully deleted");
//         }
//     });

app.post("/deleteItem", function(req, res) {
    const deletedItemId = (req.body.deletedItems)
    const listName = req.body.listName;

    if (listName === "Today") {
        Item.findByIdAndRemove(deletedItemId, function(err) {
            if (!err) {
                console.log("Successfully deleted Item in your TodoList")

                res.redirect("/")
            }
        });
    } else {
        List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: deletedItemId } } }, function(err, foundList) {
            if (!err) {
                res.redirect("/" + listName);
            }
        });
    }


});



// app.get("/work", function(req, res) {
//     res.render("list", {
//         ListTitle: "Work list",
//         newAchievements: workItems
//     });
// })






app.listen(3000, function() {
    console.log("server is running on port 3000");
});