'use strict'
const { ObjectId } = require('@fastify/mongodb')

module.exports = async function(fastify, opts) {
    fastify.get('/', async function (request, reply) {
        // 우리 매장 정보 수정
        // 토큰 값에 id값 밀어 넣기
            const tokenmarketId = process.env.RESTAURANT_ID
            const market = this.mongo.db.collection('restaurants')
            const result = await market.findOne({_id : ObjectId(tokenmarketId)})

                reply
                 .code(200)
                 .header('Content-Type', 'application/json; charset=utf-8')
                 .send(result)
            }
        )}