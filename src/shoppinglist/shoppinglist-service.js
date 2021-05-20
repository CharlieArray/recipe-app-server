const ShoppinglistService = {

    //GET ALL ITEMS
    getAllItems(knex, users_id){
        return(knex)
        .select('*')
        .from('shoppinglist')
        .where('users_id', users_id)
    },


    //ADD NEW ITEM TO SHOPPING LIST
    addItem(knex, data){
        return(knex)
        .insert(data)
        .into('shoppinglist')
        .returning('*')
    },


    //DELETE ITEM FROM SHOPPING LIST
    deleteItem(knex, id){
        return knex('shoppinglist')
        .where('id', id)
        .delete();
    },
    
}

module.exports = ShoppinglistService;