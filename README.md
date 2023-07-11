# shopping-list-server

**All queries are returning a promise where I check the completion and failure for each scenario.**

### Database:

**There are 3 databases at the moment.**

1. `grocery_list`:  id(primary key), name(text), is_completed(boolean)
2. `tag-list`: id(primary key), name(text), rank(real), bg_color(text), text_color(text)
3. `grocery_tag_junction`: junction table, grocery_id(foreign key), tag_id(foreign key)

### `shopItem.js` now has the updated POST and PUT request handler:

`POST`: adds the new grocery list item to the database.

- back-end receives object with `name` and `is_completed`;
- checks if `req.body` has `is_completed` in it, if not then add to it;
- checks all the data types, if any is not a match, then returns **405** status;
- if an error occurs in the server, return **500** status.

`PUT`: updates the selected grocery_list name, and complete status. 

- back-end receives object with `name`, `id`, `is_completed`;
- checks if `req.body` has `is_completed` in it, If not then add to it;
- checks all the data types, if any is not a match, then returns **405** status;


### `shopItemById.js` now has the updated DELETE request handler:

- back-end receives `id`;
- converts `param.id` to Number;
- checks if `param.id` is not a number, returns **400** status;
- returns **204** if successful, if `param.id` doesn't exist, then **404** status;
- otherwise, if an error occurs in the server, it returns **500** status;

### `shopItemByStatus.js` now has the updated GET request handler:

- back-end receives a query for `is_completed` status;
- checks if `req.body.is_completed` exists in the `req.body`, if not then an empty string `""` is added to the var;
- checks each scenario if we wish to send back the completed, not completed, all status `is_completed` shop items;
- if an error occurs in server, returns a **500** status;
- else, calls `sendResults` function which will change any null value to an empty array, and sends **200** status;

### `tags.js` now has the updated GET, POST, DELETE request handler:

`GET`: returns the tag list items to the front-end, therefore the user can choose which tag to add to a grocery item;

- query is written by @igalex 
- checks if the query has any result;
- if yes, returns the query with **200** status;
- if server error occurs, returns **500** status;
- if the query is falsy, returns **404** status;

`POST`: posts to `grocery_tag_junction`:

- back-end receives the selected `grocery_id` and `tag_id`;
- checks if req.body contains the correct data types, else it returns **405** status;
- if promise is fulfilled, returns **201** status;
- if an error occurs in the server, returns **500** status;

`DELETE`:  deletes the selected row from `grocery_tag_junction`:

- back-end receives the selected `grocery_id` and `tag_id`;
- converts `grocery_id` and `tag_id` to Number;
- if any is not a number, then returns **400** status;
- after promise, if fulfilled, checks if any value exist, if not then returns **404** status;
- else sends **204** status;
- if server error occurs, returns **500** status;

