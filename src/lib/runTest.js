import { test } from "./tests.js"

export async function runTest({ code, data }) {
    const result = await test({ code, data, lang: "JavaScript" })
    return result
}