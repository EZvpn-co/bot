import { Bot, InlineKeyboard, } from "grammy";
import { Admins as admins } from "../config";

const Admin = (bot: Bot) => {

    const keyboard = new InlineKeyboard()
        .text("📡 سرورها", "admin:servers")
        .text("📟 نودها", "admin:nodes")
        .row()
        .text("👥 کاربران", "admin:users")
        .row()
        .text("صفحه اصلی 🏠", "mainMenu")

    // Handle the /ping command.
    bot.command("management", async (ctx) => {
        let _text, _keyboard
        if (!admins.includes(ctx?.from?.id!)) {
            _text = `شما دسترسی های لازم رو نداری 🚫`
        }
        else {
            _text = `به بخش مدیریت خوش اومدی
            چیکار میتونم انجام بدم برات؟`
            _keyboard = keyboard
        }
        await ctx.reply(_text, { reply_markup: _keyboard });
    });
};

export default Admin;
