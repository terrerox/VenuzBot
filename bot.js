import dotenv from 'dotenv'
import Telegraf from 'telegraf'
dotenv.config();

const bot = new Telegraf(process.env.LOCAL_TOKEN)

bot.start((ctx) => {
    ctx.reply(`Welcome ${ctx.from.first_name} ${ctx.from.last_name}`)
})

bot.settings((ctx) => {
    ctx.reply('settings')
})

bot.command(['mycommand','mycommand2'], (ctx) => {
    ctx.reply('Testing with different commands')
})

bot.hears('say hi', (ctx) => {
    ctx.reply('Hi')
})

bot.on('text', ctx => {
    ctx.reply('you texting something')
})

bot.on('sticker', ctx => {
    ctx.reply('you like stickers!')
})

bot.launch()