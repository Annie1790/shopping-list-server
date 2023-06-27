const convertDatabaseRows = (arr) => {
    let result = arr.map((object) => {
        return {
            id: object.id,
            name: object.name,
            isCompleted: object.is_completed == 1 ? true : false
        }
    });
    return result;
};

module.exports = { convertDatabaseRows };
