
'use strict'
const { ObjectId } = require('@fastify/mongodb')

module.exports = async function(fastify, opts) {
    fastify.delete('/:id', async function(request, reply) {
        const restaurant = await this.mongo.db.collection("restaurants")
            const marketId = process.env.RESTAURANT_ID
            const findmenu = await restaurant.findOne({_id: ObjectId(marketId), "menu": {$elemMatch : {"_id": ObjectId(request.params.id)}}}, { projection: {"menu": 1}})
            
            if (findmenu === null) {
                reply
                 .code(403)
            } else {
                const filter = findmenu.menu.filter(elt => elt._id.toString() !== request.params.id);
                console.log(filter);
                const query = {"menu._id": ObjectId(request.params.id)}
                const updateDocument = {$set: {"menu": filter}}
                const update = await restaurant.updateOne(query, updateDocument);
                const result = await restaurant.findOne({_id: ObjectId(marketId)})
                reply
                 .code(204)
            }
    })
}
