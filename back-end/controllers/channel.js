const fs = require('fs');
const db = require('../database');
const { Channel } = db.sequelize.models;


exports.createChannel = (req, res, next) => {
    const channel = new Channel({
        ...req.body,
        creatorUserId: req.user.id,
    });
    channel
        .save()
        .then(() => res.status(201).json({ message: 'Channel created !' }))
        .catch((error) => res.status(400).json({ error }));
    }

exports.getChannels = (req, res, next) => {
    Channel.findAll()
        .then((channels) => res.status(200).json({ channels }))
        .catch((error) => res.status(400).json({ error }));
    }

exports.getOneChannel = (req, res, next) => {
    Channel.findOne({ where: { id: req.params.id } })
        .then((channel) => res.status(200).json({ channel }))
        .catch((error) => res.status(400).json({ error }));
    }

exports.modifyChannel = (req, res, next) => {
    Channel.findOne({ where: { id: req.params.id } })
        .then((channel) => {
            if (channel.creatorUserId !== req.user.id) {
                res.status(400).json({ error: "You don't have the authorization" });
            }
            channel
                .update({ ...req.body })
                .then(() => res.status(200).json({ message: 'Channel updated !' }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error: error.message }));
    }

exports.deleteChannel = (req, res, next) => {
    Channel.findOne({ where: { id: req.params.id } })
        .then((channel) => {
            if (channel.creatorUserId !== req.user.id) {
                res.status(400).json({ error: "You don't have the authorization" });
            }
            channel
                .destroy()
                .then(() => res.status(200).json({ message: 'Channel deleted !' }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error: error.message }));
    }