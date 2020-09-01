const {ObjectID, MongoClient} = require('mongodb');
const assert = require('assert');

const url = process.env.DB_URL;
const db_name = process.env.DB_NAME;
const col_name = process.env.COL_NAME;
const options = {
    useUnifiedTopology: true
}

const readItem = () => {
    const iou = new Promise((resolve, reject) => {
    MongoClient.connect(url, options, (err, client) => {
        assert.equal(err, null);
        const db = client.db(db_name);
        const collection = db.collection(col_name);
        collection.find({}).toArray((err, docs) => {
            assert.equal(err, null);
            resolve(docs);
            client.close();
        })
      });
    });
    return iou;
};
const readItemByID = (id) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options, (err, client) => {
            assert.equal(err, null);           
            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.find({_id: new ObjectID(id)}).toArray((err, docs) => {
                assert.equal(err, null);
                resolve(docs[0]);
                client.close();
                })
            });
        });
    return iou;
}

const createItem = (item) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options, (err, client) => {
            assert.equal(err, null);
            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.insertOne(item, (err, result) => {
                assert.equal(err, null);
                resolve(result.ops[0]);
                client.close();
            })
        });
    });
    return iou;
}

const upcertItem = (id, item) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options, (err, client) => {
            assert.equal(err, null);
            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.findAndModify({ _id: new ObjectID(id)}, 
            null,
            {$set: {...item}},
            {upsert: true},
            (err, result) => {
                assert.equal(err, null);
                readItemByID(id)
                    .then(item => resolve(item))
                    .then(() => client.close ());
            })
        });
    });
    return iou;
}
const deleteItem = (id) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options, (err, client) => {
            assert.equal(err, null);
            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.findOneAndDelete({_id: new ObjectID(id) }, (err, result)=>{
                assert.equal(err, null);
                resolve(result,);
                client.close();
            });
        });
    });
  return iou;
};
module.exports = {
    creatItem,
    readItem,
    upcertItem,
    deleteItem
}