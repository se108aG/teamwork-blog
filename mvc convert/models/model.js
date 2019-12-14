const model = module.exports = {}
const MongoClient = require('mongodb').MongoClient
const uri =
  'mongodb+srv://user:123@fangrolf-ielcr.gcp.mongodb.net/test?retryWrites=true&w=majority'
var client

model.open = async function () {
    client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('db connected')
}

model.getCursor = async function (db, collection) {
    db = await client.db(db)
    var cursor = await db.collection(collection).find({}).project({_id: 0})

    return cursor
}

model.userLogin = async function (db, collection, data) {
    db = await client.db(db)
    await db.collection(collection).insertOne({
        account: data.account,
        uuid: data.uuid
    })
}

model.userRegist = async function(db, collection, data) {
    db = await client.db(db)
    await db.collection(collection).insertOne({
        account: data.account,
        password: data.password
    })
}

model.po = async function(db, collection, data) {
    db = await client.db(db)
    await db.collection(collection).insertOne({
        title: data.title,
        content: data.content,
        publisher: data.publisher // 等同帳號
    })
}
//方洛飛大傻逼 都不寫註解

model.close = async function () {
    await client.close()
}