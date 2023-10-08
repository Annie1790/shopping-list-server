// const extractTagFromRow = (row) => {
//     return {
//         "id": row["tag_id"],
//         "name": row["tag_name"],
//         "color": row["color"]
//     };
// };

// const extractItemFromRow = (row) => {
//     return {
//         "id": row["id"],
//         "name": row["name"],
//         "isCompleted": row["is_completed"] == 1,
//         "tags": []
//     }
// };

// const addTagFromRowIfExist = (obj, row) => {
//     if (row["tag_id"] != null && row["tag_name"] != null && row["color"] != null) {
//         obj.tags.push(extractTagFromRow(row));
//     }
// };

// const fullShopItemFromRows = (rows) => {
//     rows.sort((a, b) => a["id"] - b["id"]);

//     if (rows.length === 0) {
//         return []
//     }

//     const results = [];

//     let currentObject = extractItemFromRow(rows[0]);
//     addTagFromRowIfExist(currentObject, rows[0]);

//     for (let i = 1; i < rows.length; i++) {
//         const currentRow = rows[i];
//         if (currentObject["id"] == currentRow["id"]) {
//             addTagFromRowIfExist(currentObject, currentRow);
//         }
//         else {
//             results.push(currentObject);
//             currentObject = extractItemFromRow(currentRow);
//             addTagFromRowIfExist(currentObject, currentRow);
//         }
//     }

//     results.push(currentObject);
//     return results;
// };

const convertDatabaseRows = (arr) => {
    arr.forEach((item) => {
        if (item.tags_json) {
            item.tags_json = item.tags_json.filter((tag) => tag !== null)
        }
    })
}

const convertIngredientsObjToArr = (arr) => {
    return arr.map((segment) => {
        return [segment.ingredient_name, segment.ingredient_category];
    })
}

const insertIngredientsToJunction = (recipeId, ingredientsArr) => {
    let result = [];
    for (let segment of ingredientsArr) {
        result.push([recipeId.recipe_id, segment.ingredient_id]);
    }
    return result;
}


module.exports = { convertDatabaseRows, convertIngredientsObjToArr, insertIngredientsToJunction };
