import axios from "axios";
import { Bot, InlineKeyboard, NextFunction } from "grammy";
import { MyContext } from "../../..";
import * as apiService from "../../../api"
import MenuService from "../menu";
import AgencyNewUserService from "./new_user";
import AgencyUsersService from "./users";



class AgencyService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.callbackQuery("account:agency:acceptTOS", this.acceptTOS)
        this.bot.callbackQuery(/^account:agency(.*)$/, this.checkAgency)
        this.bot.callbackQuery("account:agency", this.response)

        new AgencyUsersService(this.bot).run()
        new AgencyNewUserService(this.bot).run()
    }


    private text = async (ctx: MyContext) => {
        const account = ctx.session.account
        const agency = ctx.session.agency!

        return `🖥 <b>Agency Panel</b>

<b>💰 Wallet:</b> ${account.money}$
<b>🌀 Percent:</b> ${agency.percent}%

<b>👥 Users:</b> ${agency.accounts}
<b>💵 Paybacks:</b> ${agency.paybacks}$

<b>🧲 Invitation:</b> <pre>${agency.code}</pre>
`
    }

    private keyboard = async (ctx: MyContext) => {
        const keyboard = new InlineKeyboard()

        keyboard.text("👥 مدیریت کاربران", "account:agency:users")
        keyboard.text("➕ کاربر جدید", "account:agency:new_user")
        keyboard.row()

        keyboard.text(ctx.t("back-to-home-btn"), "menu");
        return keyboard
    }

    public response = async (ctx: MyContext) => {
        ctx.session.inputState = null
        await ctx.editMessageText(
            await this.text(ctx),
            { parse_mode: "HTML", reply_markup: await this.keyboard(ctx) }
        );
        await ctx.answerCallbackQuery();
    }




    // #################################

    private checkAgency = async (ctx: MyContext, _next: NextFunction) => {
        const account = ctx.session.account
        if (account.is_agent) {
            try {
                const response = await apiService.GET()("account/agency?user=" + account.id)
                ctx.session.agency = response.data
                return await _next()
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    await ctx.reply("Error: SystemError")
                } else {
                    const ee = error as { data: { msg: string } }
                    await ctx.reply("Error: " + ee.data.msg)
                }
                setTimeout(async () => {
                    new MenuService(this.bot).response(ctx)
                }, 500)
            }
            return await _next()
        }
        else {
            const agencyTos = `🔻 <b>قوانین و شرایط دریافت پنل فروش:</b>

🇮🇷 تابع قوانین جمهوری اسلامی ایران 🇮🇷
حداقل موجودی اکانت 25 دلار
همین دیگه کافیه`
            const keys = new InlineKeyboard()
            keys.text("✅ می پذیرم", "account:agency:acceptTOS")
            keys.row()
            keys.text(ctx.t("back-to-home-btn"), "menu");
            await ctx.answerCallbackQuery({
                show_alert: true,
                text: "💡 لطفا قوانین و شرایط دریافت پنل فروش را با دقت مطالعه و تایید کنید"
            });
            await ctx.editMessageText(
                agencyTos,
                { parse_mode: "HTML", reply_markup: keys }
            );
        }
    }

    private acceptTOS = async (ctx: MyContext, _next: NextFunction) => {

        // ====> check rules
        const account = ctx.session.account


        if (account.money < 25) {
            await ctx.answerCallbackQuery({
                show_alert: true,
                text: "❌ شرط داشتن حداقل موجودی را رعایت نکرده اید. لطفا با پشتیبانی در ارتباط باشید"
            })
            new MenuService(this.bot).response(ctx)
        }

        // start
        else {

            try {
                await apiService.POST()("account/beAgent?user=" + account.id)
                await ctx.answerCallbackQuery({
                    show_alert: true,
                    text: "✅ پنل فروش با موفقیت باز گردید"
                });
                const keys = new InlineKeyboard()
                keys.text("🔓 ورود به پنل", "account:agency")
                await ctx.editMessageText(
                    "🔻 برای ورود کلیک کنید:",
                    { parse_mode: "HTML", reply_markup: keys }
                );
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    await ctx.reply("Error: SystemError")
                } else {
                    const ee = error as { data: { msg: string } }
                    await ctx.reply("Error: " + ee.data.msg)
                }
                setTimeout(async () => {
                    new MenuService(this.bot).response(ctx)
                }, 500)
            }


        }
    }


}


export default AgencyService