const { Telegraf } = require('telegraf');
const express = require('express');
const dotenv = require('dotenv');
const app = express()
dotenv.config()
const { ayol } = require('./speeks/ayol')
const { erkak } = require('./speeks/erkak')
const { famale } = require('./speeks/famale')
const { male } = require('./speeks/male')
const { jenis } = require('./speeks/jenis')
const { mujik } = require('./speeks/mujik')

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply(`Salom, ${ctx.chat.first_name} TTS (text to speek) botga xush kelibsiz. \n matinni audioga aylantirish uchun bo'limni tanlang  `, {
        reply_markup: {
            inline_keyboard: [
              [
                { text: "Til tanlash", callback_data: "til" },
            ],
            ],
          },
    })
})

var botLink = ' @tts_allbot'

bot.action('til', (ctx) =>{
    ctx.reply('Kerakli tilni tanlang \n Выберите нужный язык \n Select the desired language', {
        reply_markup: {
            inline_keyboard: [
              [
                { text: "En-en", callback_data: "en" },
                { text: "O'z-uz", callback_data: "uz" },
                { text: "Ru-ru", callback_data: "ru" }
            ],
            ],
          },
    })

})
//en
bot.action('en', (ctx) =>{
    ctx.deleteMessage()
    ctx.reply('Ingliz tili tanlandi',  {
        reply_markup: {
            inline_keyboard: [
              [ { text: "Male voice", callback_data: "male" },
                { text: "Female voice", callback_data: "famale" }],
               [ { text: "Language selection", callback_data: "til" }]
            ],
          },
    })
    // speech en
    bot.action('famale', (ctx) =>{
        ctx.deleteMessage()
        ctx.reply('A female pronunciation was chosen. \n enter text...')
        bot.on('message', async(ctx)=>{
            let text = ctx.message.text
            const famaleSpeech = await famale(text)
            ctx.replyWithAudio(famaleSpeech.audio, {
                caption: `${text} \n ${botLink}`
            })
        })
    })
    bot.action('male', (ctx) =>{
        ctx.deleteMessage()
        ctx.reply('Pronunciation was chosen by a man. \n enter text...')
        bot.on('message', async(ctx)=>{
            let text = ctx.message.text
            const maleSpeech = await male(text)
            ctx.replyWithAudio(maleSpeech.audio, {
                caption: `${text} \n ${botLink}`
            })
        })
    })
})

//uz
bot.action('uz', (ctx) =>{
    ctx.deleteMessage()
    ctx.reply('Uzbek tili tanlandi',  {
        reply_markup: {
            inline_keyboard: [
              [
                { text: "Erkak kishi ovozi", callback_data: "erkak" },
                { text: "Ayol kishi ovozi", callback_data: "ayol" }],
                [{ text: "Tilni tanlash", callback_data: "til" }]
            ],
          },
    })
//speek uz
    bot.action('ayol', (ctx) =>{
        ctx.deleteMessage()
        ctx.reply('Talafuz ayol kishi tanlandi. \n matin kiriting...')
        bot.on('message', async(ctx)=>{
            let text = ctx.message.text
            const ayolSpeech = await ayol(text)
            ctx.replyWithAudio(ayolSpeech.audio, {
                caption: `${text} \n ${botLink}`
            })
        })
    })
    bot.action('erkak', (ctx) =>{
        ctx.deleteMessage()
        ctx.reply('Talafuz erkak kishi tanlandi. \n matin kiriting...')
        bot.on('message', async(ctx)=>{
            let text = ctx.message.text
            const erkakSpeech = await erkak(text)
            ctx.replyWithAudio(erkakSpeech.audio, {
                caption: `${text} \n ${botLink}`
            })
        })
    })
})

//ru
bot.action('ru', (ctx) =>{
    ctx.deleteMessage()
    ctx.reply('Был выбран узбекский язык',  {
        reply_markup: {
            inline_keyboard: [
              [
                { text: "Мужской голос", callback_data: "mujik" },
                { text: "Женский голос", callback_data: "jenis" }],
                [{ text: "Выбор языка", callback_data: "til" }],
            ],
          },
    })
//speek ru
    bot.action('jenis', (ctx) =>{
        ctx.deleteMessage()
        ctx.reply('Было выбрано женское произношение. \n введите текст...')
        bot.on('message', async(ctx)=>{
            let text = ctx.message.text
            const jenisSpeech = await jenis(text)
            ctx.replyWithAudio(jenisSpeech.audio, {
                caption: `${text} \n ${botLink}`
            })
        })
    })
    bot.action('mujik', (ctx) =>{
        ctx.deleteMessage()
        ctx.reply('Произношение выбирал мужчина. \n введите текст...')
        bot.on('message', async(ctx)=>{
            let text = ctx.message.text
            const mujikSpeech = await mujik(text)
            ctx.replyWithAudio(mujikSpeech.audio, {
                caption: `${text} \n ${botLink}`
            })
        })
    })
})



bot.command('/support', async(ctx) => {
    await ctx.reply(`Bot support: <a href="https://t.me/rasulov_n7" >Admin: </a> \n @the_rasulov1`,{ parse_mode: "HTML" })
})
bot.command('/channel', async(ctx) => {
    await ctx.reply(`📢 Channel: @rasulovdev \n https://t.me/general_ITblog`)
})
bot.command('/help', async(ctx) => {
    await ctx.reply(`🤖 <a href="https://t.me/tts_allbot">TTS </a> Botdan qanday foydalanish mumkin.
    Qanday qilib bo'lim tanlanadi:
     1. Botga start bosgandan so'ng tugmacha orqali tilni tanlashni bosing.
     2. menu tugmachadan o'zingizga kerakli til yoki jinsni tanlang.
     3. va matin yozib yuboring.
     TTS bot sizga audio formatini yuboradi.
     `,{ parse_mode: "HTML" })
})

bot.launch();
console.log(`Running...`);

app.get('/', (req, res)=>{
    res.send("Bot is running link: <a href='https://t.me/tts_allbot'>BOT LINK</a>");
})

const port = process.env.PORT || 3000

app.listen(port, ()=>{console.log(`server is running... on port ${port}`);})
