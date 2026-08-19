"use strict";

function matchRule(rule, codePoint, char) {
    const match = rule.match;

    if (typeof match === "string") {
        return match.includes(char);
    }

    if (typeof match === "number") {
        return codePoint === match;
    }

    if (match.codePoint !== undefined) {
        return codePoint === match.codePoint;
    }

    if (match.range !== undefined) {
        return codePoint >= match.range[0] && codePoint <= match.range[1];
    }

    return false;
}

function findRule(codePoint, char) {
    for (const rule of rules) {
        if (matchRule(rule, codePoint, char)) {
            return rule;
        }
    }
    return null;
}

function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function unicodeCodePoint(codePoint) {
    return `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}`;
}

function renderText(text) {
    const fragment = document.createDocumentFragment();
    let normalCount = 0;
    let confuseCount = 0;
    let specialCount = 0;
    let totalCount = 0;

    for (const char of text) {
        const codePoint = char.codePointAt(0);
        const rule = findRule(codePoint, char);

        totalCount++;

        if (!rule) {
            fragment.append(document.createTextNode(char));
            continue;
        }

        if (rule.type === "normal") {
            normalCount++;
        } else if (rule.type === "confuse") {
            confuseCount++;
        } else if (rule.type === "special") {
            specialCount++;
        }

        const span = document.createElement("span");
        span.className = `char ${rule.type}`;
        span.dataset.title = labels[codePoint]?.title ?? rule.title ?? "";
        span.dataset.group = rule.title ?? "";
        span.dataset.codePoint = unicodeCodePoint(codePoint);
        span.textContent = labels[codePoint]?.label ?? rule.label ?? char;

        fragment.append(span);
    }

    output.replaceChildren(fragment);
    totalCountElement.textContent = totalCount.toLocaleString();
    normalCountElement.textContent = normalCount.toLocaleString();
    confuseCountElement.textContent = confuseCount.toLocaleString();
    specialCountElement.textContent = specialCount.toLocaleString();
}

const input = document.querySelector("#input");
const output = document.querySelector("#output");
const totalCountElement = document.querySelector("#totalCount");
const normalCountElement = document.querySelector("#normalCount");
const confuseCountElement = document.querySelector("#confuseCount");
const specialCountElement = document.querySelector("#specialCount");

const tooltip = document.querySelector("#tooltip");
const tooltipTitle = document.querySelector("#tooltipTitle");
const tooltipGroup = document.querySelector("#tooltipGroup");
const tooltipCode = document.querySelector("#tooltipCode");

let renderTimer = null;

function scheduleRender() {
    clearTimeout(renderTimer);
    renderTimer = setTimeout(() => {
        renderText(input.value);
    }, 500);
}

input.addEventListener("input", scheduleRender);

output.addEventListener("mouseover", event => {
    const target = event.target.closest(".char");

    if (!target || !output.contains(target)) {
        return;
    }

    tooltipTitle.textContent = target.dataset.title || "未命名字符";
    tooltipGroup.textContent = target.dataset.title !== target.dataset.group ? target.dataset.group || "" : "";
    tooltipCode.textContent = target.dataset.codePoint;

    tooltip.classList.add("visible");
    positionTooltip(event);
});

output.addEventListener("mousemove", event => {
    if (event.target.closest(".char")) {
        positionTooltip(event);
    }
});

output.addEventListener("mouseout", event => {
    const target = event.target.closest(".char");
    const relatedTarget = event.relatedTarget;

    if (!target || (relatedTarget && target.contains(relatedTarget))) {
        return;
    }

    tooltip.classList.remove("visible");
});

function positionTooltip(event) {
    const margin = 10;
    const rect = tooltip.getBoundingClientRect();

    let left = event.clientX + margin;
    let top = event.clientY + margin;

    if (left + rect.width > window.innerWidth - margin) {
        left = event.clientX - rect.width - margin;
    }

    if (top + rect.height > window.innerHeight - margin) {
        top = event.clientY - rect.height - margin;
    }

    tooltip.style.left = `${Math.max(margin, left)}px`;
    tooltip.style.top = `${Math.max(margin, top)}px`;
}

function example() {
    input.value = `Ηеllο,\u2002Wоrld!\n本⼯具是⼀款可以帮你检查⽂本中或无意或有意插入的易混淆字符和不可见字符。\n绿⾊高亮字符为常见空白字符，例如空格“ ”。\n黄⾊高亮字符为易混淆字符，这些字符与常见字符很相似。\n红⾊高亮字符为异常字符，包括但不限于零宽空格\u200b、控制字符。\u0000\n\u202e。息信细详看查以可上本⽂亮高到停悬标鼠将`;
    input.dispatchEvent(new Event('input'));
}

renderText("");