import { Bot, } from "grammy";

const PingPong = (bot: Bot) => {

    // Handle the /ping command.
    bot.command("ping", async (ctx) => {
        const text = `*Pong\\!*
*ChatID:* ${ctx.chat.id}
*ChatType:* ${ctx.chat.type}
*UserID:* ${ctx.msg.from?.id}`
        await ctx.reply(text, { parse_mode: 'MarkdownV2', reply_to_message_id: ctx.msg.message_id });
    });
};

export default PingPong;
