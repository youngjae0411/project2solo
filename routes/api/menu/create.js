
'use strict'

//const { ObjectId } = require("@fastify/mongodb");

module.exports = async function (fastify, opts) {
  fastify.post('/', async function (request, reply) {
        const restaurant = this.mongo.db.collection("restaurants")
        const restaurantId = process.env.RESTAURANT_ID
        const query = {_id: this.mongo.ObjectId(restaurantId)}
        const updateDocument = {
            $push: {"menu":{ _id: this.mongo.ObjectId(), ...request.body }}
        };
        const result = await restaurant.updateOne(query, updateDocument);
        console.log(result)
        reply
            .code(201)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({ _id: this.mongo.ObjectId(), ...request.body })
  })
}