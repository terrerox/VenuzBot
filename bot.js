import axios from "axios";
import dotenv from "dotenv";
import Telegraf from "telegraf";
dotenv.config();

const bot = new Telegraf(process.env.LOCAL_TOKEN);

bot.start((ctx) => {
  ctx.reply(`Welcome ${ctx.from.first_name} ${ctx.from.last_name}`);
});

bot.settings((ctx) => {
  ctx.reply("settings");
});

bot.command(["mycommand", "mycommand2"], (ctx) => {
  ctx.reply("Testing with different commands");
});

bot.hears("say hi", (ctx) => {
  ctx.reply("Hi");
});

bot.command("/echo", ({ reply, message }) => {
  const msg = message.text.replace("/echo", "");
  reply(msg);
});
bot.command("/wk", ({ reply, message }) => {
  const search = message.text.replace("/wk", "");
  let url = encodeURI(
      `https://es.wikipedia.org/api/rest_v1/page/summary/${search}`
    ),
    extract;
  const getWikiInfo = async url => {
    try {
      const info = await axios.get(url);
      extract = info.data.extract;
      reply(`Your result:\n\n${extract}`)
    } catch (e) {
      reply('I had a problem, try to search again') 
    }
  };
  getWikiInfo(url);
});
bot.launch();
