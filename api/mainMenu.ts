import { Bot, InlineKeyboard } from "grammy";

const MainMenu = (bot: Bot, admins: number[]) => {

    // text
    const text = "🔻 از منوی زیر انتخاب کنید:";

    // keyboard
    const keyboard = new InlineKeyboard()
        .text("💰 تعرفه‌ها", "prices")
        .row()
        .text("📥 مرکز دانلود", "downloads")
        .text("📚 بخش آموزش", "tutorials")
        .row()
        .text("⚙️ عیب‌یابی", "diagnosis")
        .text("❓سوالات متداول", "faq")
        .row()
        .text("🖥 سرورها", "servers")
        .row()
        .url("💬 پشتیبانی", "EZvpnAdmin.t.me");



    // Handle the /menu command.
    bot.command("menu", async (ctx) => {
        if (admins.includes(ctx.msg.from?.id!)) keyboard.text("🎛 مدیریت", "management")
        await ctx.reply(text, { reply_markup: keyboard });
    });

    // mainMenu
    bot.callbackQuery("mainMenu", async (ctx) => {
        if (admins.includes(ctx.callbackQuery.from?.id!)) keyboard.text("🎛 مدیریت", "management")
        await ctx.editMessageText(text, { reply_markup: keyboard });
        await ctx.answerCallbackQuery();
    });
};

export default MainMenu;
