
import { runTest } from "./lib/runTest.js"

//  -------------------------------------------------
const $globalCode = document.querySelector('#global')
const $sendButton = document.querySelector('.send-button')
const $bars = document.querySelectorAll('.bar')
const $percentages = document.querySelectorAll('.percentage')
const COLORS = ['green', 'yellow', 'orange', 'red'] 
async function runTestCases() {
    const $testCases = document.querySelectorAll('.test-case')

    $bars.forEach(bar => bar.setAttribute('height', 0))
    $percentages.forEach(percentage => percentage.textContent = "...")
    const promises = Array.from($testCases).map(async ($testcase, index) => {
        const code = $testcase.querySelector('.code').value
        const $ops = $testcase.querySelector('.ops')

        $ops.textContent = "Loading..."

        const result = await runTest({ code, data: $globalCode.value})
        $ops.textContent = `${result.toLocaleString()} ops/s`

        return result
    })

    const results = await Promise.all(promises)

    const maxOps = Math.max(...results)

    const sortedResults = results
    .map((result, index) => ({ result, index}))
    .sort((a,b) => b.result - a.result)
    results.forEach((result, index) => {
        const bar = $bars[index]
        const percentage = $percentages[index]

        const indexColor = sortedResults.findIndex(x => x.index == index)
        const color = COLORS[indexColor]
        const height = result / maxOps * 300
        bar.setAttribute('height', height)

        const percentageValue = Math.round(result / maxOps * 100)
        bar.setAttribute('fill', color)
        percentage.textContent = `${percentageValue}%`
    })
}

runTestCases()

$sendButton.addEventListener('click', () => {
    runTestCases()
})