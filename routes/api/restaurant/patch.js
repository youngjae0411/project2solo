
'use strict'
const { ObjectId } = require('@fastify/mongodb')

module.exports = async function(fastify, opts) {
    fastify.patch('/', async function (request, reply) {
            const tokenmarketId = process.env.RESTAURANT_ID //동백커피
            const market = this.mongo.db.collection('restaurants')
            const marketId = await market.findOne({_id : ObjectId(tokenmarketId)})

            if (marketId === null) {
                reply
                 .code(403)
            } else {
                const update = await market.findOneAndUpdate({
                    _id : ObjectId(tokenmarketId)
                }, {
                    $set : request.body
                })
                const result = await market.findOne({_id: ObjectId(tokenmarketId)})
                reply
                 .code(200)
                 .header('Content-Type', 'application/json; charset=utf-8')
                 .send(result)
            }
    })
}