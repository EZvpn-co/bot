import { Bot, InlineKeyboard } from "grammy";

const bot = new Bot("5817494017:AAE--FH-fCndLpZzrBDg_quJxuRa29SVVzc");

// Define keyboards
const mainMenuKeyboard = new InlineKeyboard()
        .text("تعرفه ها", "prices")
        .row()
        .text("دانلود", "downloads")
        .text("آموزش ها", "tutorials")
        .row()
        .text("عیب یابی", "diagnosis")
        .text("سوالات متداول", "faq")
        .row()
        .text("لیست سرورها", "servers")
        .row()
        .url("پشتیبانی", "EZvpnAdmin.t.me")

const pricesKeyboard = new InlineKeyboard()
        .text("وب گردی", "dailyPrices")
        .row()
        .text("ترید", "tradePrices")
        .row()
        .text("گیم", "gamePrices")
        .row()
        .text("صفحه اصلی", "mainMenu")

const downloadsKeyboard = new InlineKeyboard()
        .text("Android", "AndroidDownloads")
        .row()
        .text("iOS", "iOSDownloads")
        .row()
        .text("Windows", "WindowsDownloads")
        .row()
        .text("macOS", "macOSDownloads")
        .row()
        .text("صفحه اصلی", "mainMenu")

const tutorialsKeyboard = new InlineKeyboard()
        .text("Android", "AndroidTutorials")
        .row()
        .text("iOS", "iOSTutorials")
        .row()
        .text("Windows", "WindowsTutorials")
        .row()
        .text("macOS", "macOSTutorials")
        .row()
        .text("صفحه اصلی", "mainMenu")

const diagnosisList = [
    [
        "عیب یابی اول",
        "متن عیب یابی اول",
    ],
    [
        "عیب یابی دوم",
        "متن عیب یابی دوم",
    ]
]

const faqList = [
    [
        "سوالات متداول اول",
        "متن سوالات متداول اول",
    ],
    [
        "سوالات متداول دوم",
        "متن سوالات متداول دوم",
    ]
]

// Define texts
const mainMenuText = 'از منوی زیر انتخاب کنید:';
const pricesText = "نوع استفاده خود را انتخاب کنید:"
const dailyPricesText = `🔻 تعرفه های پکیج Daily:

سرویس Daily:
یک دیوایس، یک ماهه = 1$
پنج دیوایس، یک ماهه = 4.5$
یک دیوایس، سه ماهه = 3$
پنج دیوایس، سه ماهه = 13.5$

سرویس +Daily:
یک دیوایس، یک ماهه = 2$
پنج دیوایس، یک ماهه = 9$
یک دیوایس، سه ماهه = 6$
پنج دیوایس، سه ماهه = 27$`
const tradePricesText = `🔻 تعرفه های پکیج Trade:

سرویس Trade:
یک دیوایس، یک ماهه = 2$
پنج دیوایس، یک ماهه = 9$
یک دیوایس، سه ماهه = 6$
پنج دیوایس، سه ماهه = 27$

سرویس +Trade:
کمپانی، یک ماهه = 65$
کمپانی (vip)، یک ماهه = 105$`
const gamePricesText = `🔻 تعرفه های پکیج Game:

سرویس Game:
یک دیوایس، یک ماهه = 2$
پنج دیوایس، یک ماهه = 9$
یک دیوایس، سه ماهه = 6$
پنج دیوایس، سه ماهه = 27$

سرویس +Game:
کلاب، یک ماهه = 65$
کلاب (vip)، یک ماهه = 105$`

const downloadsText = "پلتفورم مدنظر را انتخاب کنید:"
const tutorialsText = "پلتفورم مدنظر را انتخاب کنید:"

const diagnosisText = "از منو انتخاب کنید:"
const faqText = "از منو انتخاب کنید:"

// **********************************************************************************


// Handle the /start command.
bot.command("start", (ctx) => {
    let text = 'سلام به *EZvpn* خوش اومدید :)';
    text += '\nجهت استفاده از ربات بر روی /menu کلیک کنید';
    ctx.reply(text)
});

// Handle the /menu command.
bot.command("menu", (ctx) => {
    ctx.reply(mainMenuText, { reply_markup: mainMenuKeyboard })
});

// mainMenu
bot.callbackQuery("mainMenu", async (ctx) => {
  await ctx.editMessageText(mainMenuText, { reply_markup: mainMenuKeyboard });
});


// =================> prices
// prices
bot.callbackQuery("prices", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(pricesText, { reply_markup: pricesKeyboard });
});
// dailyPrices
bot.callbackQuery("dailyPrices", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply(dailyPricesText);
});
// tradePrices
bot.callbackQuery("tradePrices", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply(tradePricesText);
});
// gamePrices
bot.callbackQuery("gamePrices", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply(gamePricesText);
});
// =================> prices

// =================> downloads
// downloads
bot.callbackQuery("downloads", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(downloadsText, { reply_markup: downloadsKeyboard });
});
// AndroidDownloads
bot.callbackQuery("AndroidDownloads", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply('AndroidDownloads');
});
// iOSDownloads
bot.callbackQuery("iOSDownloads", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply('iOSDownloads');
});
// WindowsDownloads
bot.callbackQuery("WindowsDownloads", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply('WindowsDownloads');
});
// macOSDownloads
bot.callbackQuery("macOSDownloads", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply('macOSDownloads');
});
// =================> downloads

// =================> tutorials
// tutorials
bot.callbackQuery("tutorials", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(tutorialsText, { reply_markup: tutorialsKeyboard });
});
// AndroidTutorials
bot.callbackQuery("AndroidTutorials", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply('AndroidTutorials');
});
// iOSTutorials
bot.callbackQuery("iOSTutorials", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply('iOSTutorials');
});
// WindowsTutorials
bot.callbackQuery("WindowsTutorials", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply('WindowsTutorials');
});
// macOSTutorials
bot.callbackQuery("macOSTutorials", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply('macOSTutorials');
});
// =================> tutorials

// =================> diagnosis
// diagnosis
bot.callbackQuery("diagnosis", async (ctx) => {
  await ctx.answerCallbackQuery();
  const diagnosisKeyboard = new InlineKeyboard()
  diagnosisList.map((v, index) => {
    diagnosisKeyboard.text(v[0], 'diagnosis-' + (index+1)).row()
  })
  diagnosisKeyboard.text("صفحه اصلی", "mainMenu")
  await ctx.editMessageText(diagnosisText, { reply_markup: diagnosisKeyboard });
});
// diagnosis answer
bot.callbackQuery(/(diagnosis-)\d{1,3}/g, async (ctx) => {
  await ctx.answerCallbackQuery();
  const q = parseInt(ctx.match.toString().replace("diagnosis-", "")) - 1
  await ctx.reply(diagnosisList[q][1]);
});
// =================> diagnosis

// =================> faq
// faq
bot.callbackQuery("faq", async (ctx) => {
  await ctx.answerCallbackQuery();
  const faqKeyboard = new InlineKeyboard()
  faqList.map((v, index) => {
    faqKeyboard.text(v[0], 'faq-' + (index+1)).row()
  })
  faqKeyboard.text("صفحه اصلی", "mainMenu")
  await ctx.editMessageText(faqText, { reply_markup: faqKeyboard });
});
// faq answer
bot.callbackQuery(/(faq-)\d{1,3}/g, async (ctx) => {
  await ctx.answerCallbackQuery();
  const q = parseInt(ctx.match.toString().replace("faq-", "")) - 1
  await ctx.reply("faq" + q);
});
// =================> faq

// =================> servers
// servers
bot.callbackQuery("servers", async (ctx) => {
  await ctx.answerCallbackQuery({
    text: "You can see Servers list :)",
  });
});
// =================> servers

// Handle other messages.
bot.on("message", (ctx) => ctx.reply("میفهمم اما متوجه نمیشم :("));

// Start the bot.
bot.start();