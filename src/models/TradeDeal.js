const mongoose = require('mongoose');
const Schema = mongoose.Schema
const TradeDealSchema = new Schema({
    seller: {
        type: Schema.Types.ObjectId,
        ref = "DiscordUser"
    },
    buyq: Number,
    sellq: Number,
    stock: Number,
    sellServer: String,
    buyServer: String
})