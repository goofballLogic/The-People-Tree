var express = require('express');
var router = express.Router();
var tree = require('../jsonTree.js');

function respone( err, data, res ) {

    if(err) {
        console.error(err);
        res.status(500).send('Something broke!');
    } else {
        res.json(data);
        res.end();
    }

}

router.get( "/parents", (req, res) => {
    tree.getParents(req.query.userId, req.query.generationBack, (err, data ) => respone( err, data, res ) );
});

router.get( "/children", (req, res) => {
    tree.getChildren(req.query.userId, req.query.generationBack, (err, data ) => respone( err, data, res ) );
});

router.get( "/social", (req, res) => {

    if ( req.query.socialID ) {

        switch( req.query.provider ){

            case "facebook":
                tree.getByFacebookID( req.query.socialID, (err, data ) => respone( err, data[0], res ) )
                break;
            default:
                res.status(400).sent( `Unsupported provider ${req.query.provider}` )
        }

    }

} );

module.exports = router;
