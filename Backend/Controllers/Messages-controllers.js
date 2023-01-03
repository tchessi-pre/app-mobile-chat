const messagesMongo = require("../models/Messages");
const fs = require("fs");

exports.createMessages = (req, res, next) => {
    const messagesObject = JSON.parse(req.body.messages);
    delete messagesObject._id;
    const messages = new messagesMongo({
        ...messagesObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
        }`,
    });
    messages
        .save()
        .then(() => {
        res.status(201).json({
            message: "messages bien enregistrée !",
        });
        })
        .catch((error) => {
        res.status(400).json({
            error: error,
        });
        });
    };

exports.getAllMessages = (req, res, next) => {
    messagesMongo.find()
    .then((messages) => {
        res.status(200).json(messages);
    })
    .catch((error) => {
        res.status(400).json({
        error: error,
        });
    });
};

exports.getOneMessages = (req, res, next) => {
    messagesMongo.findOne({
    _id: req.params.id,
    })
    .then((messages) => {
        res.status(200).json(messages);
    })
    .catch((error) => {
        res.status(404).json({
        error: error,
        });
    });
};

exports.deleteMessages = (req, res, next) => {
    messagesMongo.findOne({ _id: req.params.id })
    .then((message) => {
        if (message.imageUrl != null) {
        const filename = message.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {});
        }
        Messages.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Message supprimée !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};


exports.modifyMessages = (req, res, next) => {
    const messageObject = req.file
        ? {
            ...JSON.parse(req.body.message),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
            }`,
        }
        : { ...req.body };
    Messages.updateOne({ _id: req.params.id }, { ...messageObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Message bien modifiée !" }))
        .catch((error) =>
        res.status(403).json({ error: error, message: "Requête non autorisée !" })
        );
    };

    exports.getPseudo = (req, res, next) => {
    user
        .find({ pseudo: req.params.id })
        .then((user) => res.status(200).json(user))
        .catch((erreur) => res.status(500).json(erreur));
    };
