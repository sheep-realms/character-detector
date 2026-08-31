"use strict";

const rules = [
    {
        type: "special",
        match: { range: [0x0000, 0x0008] },
        title: "ASCII 控制字符",
        suggestions: ["control_char"]
    },
    {
        type: "normal",
        match: { range: [0x0009, 0x000D] },
        title: "ASCII 常见空白字符"
    },
    {
        type: "special",
        match: { range: [0x000E, 0x001F] },
        title: "ASCII 控制字符",
        suggestions: ["control_char"]
    },
    {
        type: "normal",
        match: " ",
        title: "空格"
    },
    {
        type: "confuse",
        match: "\u00a0\u1680\u180e\u2028\u2029\u202f\u205f\u3000",
        title: "空格"
    },
    {
        type: "special",
        match: { range: [0x007F, 0x009F] },
        title: "C1 控制字符",
        suggestions: ["control_char"]
    },
    {
        type: "confuse",
        match: { range: [0x2000, 0x200A] },
        title: "空格"
    },
    {
        type: "special",
        match: { codePoint: 0x00AD },
        label: "SH",
        title: "软连字符（Soft Hyphen）"
    },
    {
        type: "confuse",
        match: "ɑɖɗɠɡɢɣɥɦɨɪɭɱɲɳɴʀʂʌʍʏʐʙʜʟʮʯ",
        title: "国际音标扩展（IPA Extensions）",
        suggestions: ['latin_replace']
    },
    {
        type: "special",
        match: { range: [0x034F, 0x034F] },
        title: "组合字形连接符（Combining Grapheme Joiner）"
    },
    {
        type: "confuse",
        match: "ͲͳͶͷͿΆΈΉΊΌΎΑΒΕΖΗΙΚΛΜΝΟΡΤΥΧΪΫγκνορσυχόϒϓϔϘϙϜϝϲϳϹϺϻἈἉἊἋἌἍἎἏἘἙἚἛἜἝἨἩἪἫἬἭἮἯἸἹἺἻἼἽἾἿὀὁὂὃὄὅὈὉὊὋὌὍὙὛὝὟὨὩὪὫὬὭὮὯὸόᾈᾉᾊᾋᾌᾍᾎᾏᾘᾙᾚᾛᾜᾝᾞᾟᾸᾹᾺΆᾼῈΈῊΉῌῘῙῚΊῨῩῪΎῬῸΌ",
        title: "希腊字母和科普特字母（Greek and Coptic）",
        suggestions: ['latin_replace']
    },
    {
        type: "special",
        match: { range: [0x061C, 0x061C] },
        title: "阿拉伯文标记字符（Arabic Letter Mark）"
    },
    {
        type: "confuse",
        match: "ЀЁЅІЇЈЌЍЎАВЕИЙКМНОРСТУХЪЬЭЮЯавеийкмнорстухъьяѐёѕіїјћќѝўѡѢѣѴѵѶѷѿҊҋҌҍҒғҚқҜҝҞҟҠҡҢңҤҥҪҫҬҭҮүҰұҲҳҺһҼҽҾҿӀӉӊӍӎӏӐӑӒӓӖӗӢӣӤӥӦӧӮӯӰӱӲӳӺӻӼӽӾӿ",
        title: "西里尔字母（Cyrillic）",
        suggestions: ['latin_replace']
    },
    {
        type: "special",
        match: { range: [0x200B, 0x200F] },
        title: "零宽格式控制字符",
        suggestions: ["zero_width_space"]
    },
    {
        type: "special",
        match: { range: [0x202A, 0x202E] },
        title: "双向文本控制字符",
        suggestions: ["reverse_text"]
    },
    {
        type: "special",
        match: { range: [0x2060, 0x2064] },
        title: "零宽格式控制字符"
    },
    {
        type: "special",
        match: { range: [0x2066, 0x206F] },
        title: "双向文本与零宽控制字符",
        suggestions: ["reverse_text"]
    },
    {
        type: "special",
        match: { range: [0xFFF0, 0xFFF8] },
        title: "Unicode 特殊用途码位"
    },
    {
        type: "special",
        match: { range: [0xFFF9, 0xFFFB] },
        title: "注音控制字符"
    },
    {
        type: "special",
        match: { range: [0xE000, 0xF8FF] },
        title: "Unicode 私用区字符（Private Use Area）",
        suggestions: ["private_use_area"]
    },
    {
        type: "confuse",
        match: { range: [0x2F00, 0x2FD5] },
        title: "康熙部首（Kangxi Radicals）",
        suggestions: ["kangxi"]
    },
    {
        type: "special",
        match: { range: [0xD800, 0xDFFF] },
        title: "UTF-16 代理项码位（Surrogate）"
    },
    {
        type: "special",
        match: { range: [0xFDD0, 0xFDEF] },
        title: "Unicode 非字符（Noncharacter）"
    },
    {
        type: "special",
        match: { codePoint: 0xFEFF },
        title: "零宽不折行空格（Zero Width No-Break Space）",
        suggestions: ["zero_width_space"]
    },
    {
        type: "special",
        match: { range: [0xFFF9, 0xFFFB] },
        title: "互线性注释（Interlinear annotation）"
    },
    {
        type: "special",
        match: { range: [0xFFFC, 0xFFFD] },
        title: "替换字符（Replacement characters）"
    },
    {
        type: "special",
        match: /\p{M}/u,
        title: "组合附加符号（Combining Mark）",
        suggestions: ["combining_mark"]
    },
    {
        type: "special",
        match: { range: [0xF0000, 0xFFFFD] },
        title: "Unicode 补充私用区字符",
        suggestions: ["private_use_area"]
    },
    {
        type: "special",
        match: { range: [0x100000, 0x10FFFD] },
        title: "Unicode 补充私用区字符",
        suggestions: ["private_use_area"]
    },
];

for (let plane = 0; plane <= 0x10; plane++) {
    const base = plane << 16;
    rules.push({
        type: "special",
        match: { codePoint: base + 0xFFFE },
        title: "Unicode 非字符（Noncharacter）"
    });
    rules.push({
        type: "special",
        match: { codePoint: base + 0xFFFF },
        title: "Unicode 非字符（Noncharacter）"
    });
}