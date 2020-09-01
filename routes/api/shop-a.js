const express = require('express');
const router = express.Router();
const {
    creatItem,
    readItem,
    upcertItem,
    deleteItem
} = require('../../data/dal.js')

router.get('/', async function(req, res) {
    const data = await readItem();
        res.send(data);
});

router.post('/', async function(req, res) {
    const body = req.body;
    const data = await createItem(body);
        res.send(data);
});

router.put('/:id', async function(req, res )  {
    const body = req.body;
    const id = req.params.id;
    const data = await upcertItem(id, body);
        res.send(data);
    ;
});

router.delete('/:id', async function(req, res) {
    const data = await deleteItem(req.params.id); 
        res.send(data)
    });
module.exports = router;