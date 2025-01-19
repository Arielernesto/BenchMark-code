

export async function test({ data, code, lang }){
    let result
    switch (lang) {
        case lang == "JavaScript":
            result = await JavaScript(data, code)
            break;
    
        default:
            result = await JavaScript(data, code)
            break;
    }

    return result
}

async function JavaScript(data, code){
    const duration = 1000
    const worker = new Worker(new URL('../workers/testWorker.js', import.meta.url))
    worker.postMessage({ code, data, duration})

    return new Promise(resolve => {
        worker.onmessage = event => {
            resolve(event.data)
        }
    })
}