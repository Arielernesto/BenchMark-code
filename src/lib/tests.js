

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
    const worker = new Worker('./src/workers/testWorker.js')
    worker.postMessage({ code, data, duration})

    return new Promise(resolve => {
        worker.onmessage = event => {
            resolve(event.data)
        }
    })
}