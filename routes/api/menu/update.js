


'use strict'

const { ObjectId } = require('@fastify/mongodb')

module.exports = async function(fastify, opts) {
    fastify.put('/:id', async function (request, reply) {
            const marketId = process.env.RESTAURANT_ID
            const marketread = this.mongo.db.collection('restaurants')
            const findmarket = await marketread.findOne({_id: ObjectId(marketId), "menu": { $elemMatch : { "_id": ObjectId(request.params.id)}}}, { projection: {"menu": 1}})
            // const filter = findmarket.menu.filter(elt => elt._id.toString() === request.params.id)[0];

            if (findmarket === null) {
                reply
                 .code(400)
            } else {
                const query = {"menu._id": ObjectId(request.params.id)}
                if (request.body.name !== undefined) {
                    const updateDocument = {$set: {"menu.$.name": request.body.name}}
                    const update = await marketread.updateOne(query, updateDocument);
                } 
                if (request.body.price !== undefined) {
                    const updateDocument = {$set: {"menu.$.price": request.body.price}}
                    const update = await marketread.updateOne(query, updateDocument);
                } else {
                    reply
                     .code(404)
                }
                //const result = await marketread.findOne({_id: ObjectId(marketId)})
                reply
                 .code(200)
                 .header('Content-Type', 'application/json; charset=utf-8')
                 .send({_id: request.params.id, ...request.body})
            }
    })
}