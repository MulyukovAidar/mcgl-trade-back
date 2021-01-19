const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    discordId: { type: String, required: true },
    username: { type: String, required: true },
    tradeDeals: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "TradeDeal"
    }]
});

const DiscordUser = module.exports = mongoose.model('User', UserSchema);    