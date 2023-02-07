import axios from "axios";
import { Bot, InlineKeyboard, NextFunction } from "grammy";
import AccountService from ".";
import { MyContext } from "../..";
import * as apiService from "../api"


interface SubType {
    "json": string,
    "clash": string,
    "surfboard": string,
    "ss": string,
    "v2ray": string,
    "trojan": string
}


class AccountSubscriptionService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.callbackQuery(["account:subscription", /^account:agency:users:detail:([0-9]+):subscription$/], this.response)
    }



    private subscriptions: SubType | null = null
    private keyboard = async (ctx: MyContext) => {
        const keyboard = new InlineKeyboard()
        if (Array.isArray(ctx.match) && /^account:agency:users:detail:([0-9]+):subscription$/.test(ctx.match[0])) {
            keyboard.text(ctx.t("back-btn"), "account:agency:users:detail:" + ctx.match[1])
        }
        else {
            keyboard.text("Clash", "account:subscription:Clash")
            keyboard.text("Surfboard", "account:subscription:Surfboard")
            keyboard.row()
            keyboard.text("ShadowSocks", "account:subscription:ShadowSocks")
            keyboard.text("V2ray", "account:subscription:V2ray")
            keyboard.text("Trojan", "account:subscription:Trojan")
            keyboard.row()
            keyboard.text(ctx.t("back-btn"), "account")
        }
        keyboard.text(ctx.t("back-to-home-btn"), "menu")
        return keyboard
    }

    private text = async (ctx: MyContext) => {
        let _data = ''
        _data += '<b>🔗 JSON:</b>\n<pre>' + this.subscriptions?.json + '</pre>\n\n'
        _data += '<b>🔗 Clash:</b>\n<pre>' + this.subscriptions?.clash + '</pre>\n\n'
        _data += '<b>🔗 Surfboard:</b>\n<pre>' + this.subscriptions?.surfboard + '</pre>\n\n'

        _data += '<b>🔗 ShadowSocks:</b>\n<pre>' + this.subscriptions?.ss + '</pre>\n\n'
        _data += '<b>🔗 V2ray:</b>\n<pre>' + this.subscriptions?.v2ray + '</pre>\n\n'
        _data += '<b>🔗 Trojan:</b>\n<pre>' + this.subscriptions?.trojan + '</pre>'

        return `🔻 <b>اطلاعات اشتراک:</b>\n\n${_data}`
    }

    public response = async (ctx: MyContext) => {
        ctx.session.inputState = null

        try {
            let uid = ctx.session.user?.account_id
            if (Array.isArray(ctx.match) && /^account:agency:users:detail:([0-9]+):subscription$/.test(ctx.match[0])) {
                uid = parseInt(ctx.match[1])
            }

            const response = await apiService.GET()("account/subscription?user=" + uid)
            this.subscriptions = response.data.subscription
            await ctx.editMessageText(
                await this.text(ctx),
                { parse_mode: "HTML", reply_markup: await this.keyboard(ctx) }
            );
            await ctx.answerCallbackQuery();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                await ctx.reply("Error: SystemError")
            } else {
                const ee = error as { data: { msg: string } }
                await ctx.reply("Error: " + ee.data.msg)
            }
            setTimeout(async () => {
                if (Array.isArray(ctx.match) && /^account:agency:users:detail:([0-9]+):subscription$/.test(ctx.match[0])) {
                    const accountID = ctx.match[1]
                    ctx.match = [`account:agency:users:detail:${accountID}`, accountID]
                }
                new AccountService(this.bot).response(ctx)
            }, 500)
        }

        return
    }

}


export default AccountSubscriptionService