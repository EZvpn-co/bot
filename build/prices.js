"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const Prices = (bot) => {
    // text
    const text = "نوع کاربری خود را انتخاب کنید:";
    // keyboard
    const keyboard = new grammy_1.InlineKeyboard()
        .text("Daily", "prices:daily")
        .text("Trade", "prices:trade")
        .text("Game", "prices:game")
        .row()
        .text("صفحه اصلی 🏠", "mainMenu");
    // Handle the /prices command.
    bot.command("prices", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.reply(text, { reply_markup: keyboard });
    }));
    // prices
    bot.callbackQuery("prices", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.editMessageText(text, { reply_markup: keyboard });
        yield ctx.answerCallbackQuery();
    }));
    // ========> sub menu
    const back_keyboard = new grammy_1.InlineKeyboard()
        .text("برگشت ↪️", "prices")
        .text("صفحه اصلی 🏠", "mainMenu");
    // ===> daily
    const dailyText = `
🔻 پکیج Daily مناسب برای وب گردی، شبکه های اجتماعی، دانلود و آپلود و سایر کارهای روزمره عادی استفاده می شود.
🔻 این پکیج دارای دو نوع سرویس می باشد: دیلی و دیلی پلاس
🔻 تفاوت سرویس دیلی پلاس در تعداد سرورها، کیفیت سرورها و همچنین توانایی استفاده در مواقع حساس می باشد.

💰 تعرفه های پکیج Daily:

🔸سرویس Daily:
یک کاربره | یک ماهه | 1$
پنج کاربره | یک ماهه | 4.5$
یک کاربره | سه ماهه | 3$
پنج کاربره | سه ماهه | 13.5$

🔸سرویس +Daily:
یک کاربره | یک ماهه | 2$
پنج کاربره | یک ماهه | 9$
یک کاربره | سه ماهه | 6$
پنج کاربره | سه ماهه | 27$
`;
    bot.callbackQuery("prices:daily", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.editMessageText(dailyText, { reply_markup: back_keyboard });
        yield ctx.answerCallbackQuery();
    }));
    // ===> trade
    const tradeText = `
🔻 پکیج Trade مناسب برای تریدرها می باشد.
🔻 این پکیج برای وبگردی، دانلود و شبکه های اجتماعی مناسب نیست.
🔻 این پکیج دارای آیپی ثابت و بدون هرگونه نشتی ip و dns می باشد.
🔻 سرویس Trade+ مناسب برای گروه ها، دفاتر و شرکت های ترید می باشد که توانایی پاسخگویی حداقل ۵۰ دیوایس را دارد.

💰 تعرفه های پکیج Trade:

🔸سرویس Trade:
یک کاربره | یک ماهه | 2$
پنج کاربره | یک ماهه | 9$
یک کاربره | سه ماهه | 6$
پنج کاربره | سه ماهه | 27$

🔸سرویس +Trade:
یک ماهه (معمولی) | 65$
یک ماهه (ویژه) | 105$
`;
    bot.callbackQuery("prices:trade", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.editMessageText(tradeText, { reply_markup: back_keyboard });
        yield ctx.answerCallbackQuery();
    }));
    // ===> game
    const gameText = `
🔻 پکیج Game مناسب برای گیمرها می باشد.
🔻 این پکیج برای وبگردی، دانلود و شبکه های اجتماعی مناسب نیست.
🔻 این پکیج دارای پینگ عالی برای اتصال کامل در بازی های مختلف می باشد.
🔻 سرویس Game+ مناسب برای گروه ها و کلاب های بازی می باشد که توانایی پاسخگویی به حداقل ۵۰ کاربر را داراست.

💰 تعرفه های پکیج Game:

🔸سرویس Game:
یک کاربره | یک ماهه | 2$
پنج کاربره | یک ماهه | 9$
یک کاربره | سه ماهه | 6$
پنج کاربره | سه ماهه | 27$

🔸سرویس +Game:
یک ماهه (معمولی) | 65$
یک ماهه (ویژه) | 105$
`;
    bot.callbackQuery("prices:game", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.editMessageText(gameText, { reply_markup: back_keyboard });
        yield ctx.answerCallbackQuery();
    }));
};
exports.default = Prices;
