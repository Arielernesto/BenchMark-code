onmessage = async event => {
    const { code, data, duration } = event.data
    let codeTest
    try {
        codeTest = await eval(`(async () => {
            let PERF__ops = 0;
            let PERF__start = Date.now();
            let PERF__end = Date.now() + ${duration};
            
            ${data}
    
            while (Date.now() < PERF__end) {
                ${code};
                PERF__ops++;
            }
            return PERF__ops
        })()`)
    } catch (error) {
        console.log(error)
        codeTest = 0
    }

    postMessage(codeTest)
}