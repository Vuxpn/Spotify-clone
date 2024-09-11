import querystring from 'querystring';
import { countdown, randomInt, getConfig, contentId, sleep, getData } from './utils.js';
import { cyan, yellow, blue, green, red } from 'console-log-colors';
import AxiosHelpers from "./helpers/axiosHelper.js";
import moment from 'moment';

//config
const accounts = getData("data_blum.txt");
const proxies = getData("proxy.txt");

let timeRerun = 120; //phút
let numberThread = 10; // số luồng chạy /1 lần 

let enable_auto_play = true;
let enable_auto_task = true;

// 
function createAxiosInstance(proxy) {
    return new AxiosHelpers({
        headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "origin": "https://telegram.blum.codes",
            "priority": "u=1, i",
            "referer": "https://telegram.blum.codes/",
            'sec-ch-ua': '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24", "Microsoft Edge WebView2";v="125"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
        },
        proxy: proxy ? proxy : false
    });
}
//end config

// main
async function get_new_tokens(stt, refresh_token, axios) {
    try {
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Origin": "https://telegram.blum.codes"
        };
        const payload = { "query": refresh_token };
        const response = await axios.post('https://gateway.blum.codes/v1/auth/provider/PROVIDER_TELEGRAM_MINI_APP', payload, { headers: headers });

        if(response && response.status == 200){
            console.log(blue.bold(`[*] Account ${stt}: Get token success`));
            return response.data.token.access;
        }

        return null;
    } catch (e) {
        console.log(`Err get_new_tokens: ${e}`);
    }
}

async function daily_reward(stt, access_token, axios) {
    const headers = {
        "Authorization": `Bearer ${access_token}`,
    };
    const payload = {};
    try {
        const response = await axios.post('https://game-domain.blum.codes/api/v1/daily-reward?offset=-420', payload, { headers: headers });

        if (response.status === 200) {
            return response.data;
        }
    } catch (e) {
        if (e.response) {
            if (e.response.status === 400) {
                return e.response.data;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}


async function get_balance(stt,access_token,axios)
{
    try{
        const headers = {
            "Authorization": `Bearer ${access_token}`,
        };

        let response = await axios.get("https://game-domain.blum.codes/api/v1/user/balance", { headers: headers});
        if(response && response.status == 200){
            return response.data;
        }
        return null;
    }catch(e){
        console.log(`Err get balance: ${e}`);
    }
}

async function play_game(stt, access_token, axios, playPasses) {
    for (let i = 0; i < playPasses; i++) {
        try {
            const headers = {
                "Authorization": `Bearer ${access_token}`,
            };

            const responsePlay = await axios.post('https://game-domain.blum.codes/api/v1/game/play', null, { headers: headers });

            if (responsePlay.status == 200) {
                console.log(`Account ${stt}: Playing game 30s...`);
                const gameId = responsePlay.data.gameId;
                await sleep(30);

                if (gameId) {
                    let points = randomInt(196, 249);
                    let payloadClaim = {
                        "gameId": gameId,
                        "points": points.toString()
                    }

                    const responseClaim = await axios.post('https://game-domain.blum.codes/api/v1/game/claim', payloadClaim, { headers: headers });

                    if (responseClaim.status == 200) {
                        console.log(`Account ${stt}: Claim successful: ${points} Points`);
                    } else {
                        console.log(`Account ${stt}: Failed to claim: ${responseClaim.data}`);
                    }
                }
            }
        } catch (e) {
            console.error(`err ${e}`);
        }
    }
}

async function farming(stt, access_token, axios, url)
{
    try{
        let headers = {
            'Authorization': `Bearer ${access_token}`,
        }

        const response = await axios.post(url, null, {headers: headers});
        if(response){
            // console.log(response);
            console.log(`Account ${stt}: Done!`);
        }
        return;
    }catch(e){
        console.log(`farm err:`);
    }
}
async function friend_claim(stt, access_token, axios){
    try{
        let headers = {
            'Authorization': `Bearer ${access_token}`,
        }

        let response = await axios.get('https://gateway.blum.codes/v1/friends/balance', {headers: headers});
        if(response){
            if(response.data.canClaim){
                response = await axios.post("https://gateway.blum.codes/v1/friends/claim", null, {headers: headers});
                if(response){
                    console.log(green.bold(`Account ${stt}: Claim reward Friend Success!`));
                }
            }else{
                let canClaimAt = response.data.canClaimAt;
                if (canClaimAt) {
                    const claimTime = moment(parseInt(canClaimAt) / 1000);
                    const currentTime = moment();
                    const timeDiff = moment.duration(claimTime.diff(currentTime));
                    const hours = timeDiff.hours();
                    const minutes = timeDiff.minutes();
                    console.log(yellow.bold(`Account ${stt}: Claim reward Friend after ${hours} housr ${minutes} minute`));
                } else {
                    console.log(yellow.bold(`Account ${stt}: Account not friend!`));
                }
            }
        }

    }catch(e){
        console.log(red.bold(`Account ${stt}: Claim Reward Friend Err!`));
    }
}
async function startTask(stt, access_token, axios, taskId){
    try{
        let headers = {
            'Authorization': `Bearer ${access_token}`,
        }
        let payload = {};

        const task_start_url = `https://game-domain.blum.codes/api/v1/tasks/${taskId}/start`;
        let res = await axios.post(task_start_url, payload, { headers });
        if(res && res.status == 200){
            let { title } = res.data
            console.log(`Account ${stt}: Task ${title} starting`);
        }
    }catch(e){
        console.log(e);
        console.log(red.bold(`Account ${stt}: startTask Err!`));
    }
}

async function auto_task(stt, access_token, axios) {
    try {
        let headers = {
            'Authorization': `Bearer ${access_token}`,
        }

        const task1 = await axios.get('https://game-domain.blum.codes/api/v1/tasks', { headers: headers });
        const taskList1 = task1.data;
        if (taskList1) {
            for (const task of taskList1) {
                const task_id = task.id;
                const title = task.title;
                const reward = task.reward;
                if (task.status == "NOT_STARTED") {

                    if (["d057e7b7-69d3-4c15-bef3-b300f9fb7e31", "a90d8b81-0974-47f1-bb00-807463433bde", "a4ba4078-e9e2-4d16-a834-02efe22992e2", "5ecf9c15-d477-420b-badf-058537489524", "283e970f-c253-4af1-9d41-9635938e22c5"].includes(task_id)) {
                        if (task.progressTarget && parseFloat(task.progressTarget.progress) < parseFloat(task.progressTarget.target)) {
                            continue;
                        }
                    }
                    // if(!["24c2fe53-f381-4382-abc8-b5792f8080e7"].includes(task_id)) {
                    //     continue;
                    // }
                    await startTask(stt, access_token, axios, task_id);

                    await sleep(randomInt(4, 6));
                }
            }
        }

        // done task
        const tasksResponse = await axios.get('https://game-domain.blum.codes/api/v1/tasks', { headers: headers });
        const tasklist2 = tasksResponse.data;
        if (tasklist2) {
            for (const task of tasklist2) {
                const task_id = task.id;
                const title = task.title;
                const reward = task.reward;

                if (task.status === "DONE") {
                    const task_claim_url = `https://game-domain.blum.codes/api/v1/tasks/${task_id}/claim`;
                    await axios.post(task_claim_url, null, { headers });
                    console.log(`Account ${stt}: Task ${title} claimed: ${reward}`);
                    await sleep(randomInt(4, 6));
                }
            }
        }
    } catch (error) {
        console.error("Error auto_task:", error.message);
    }
}

async function main(stt, account, axios)
{
    try{
        let userData;
        let refresh_token = querystring.unescape(account).split('tgWebAppData=')[1].split('&tgWebAppVersion')[0];
        
        let access_token = await get_new_tokens(stt, refresh_token, axios);
        if(access_token){
            userData = await get_balance(stt,access_token,axios);
            if(userData){
                let daily_rd = await daily_reward(stt,access_token,axios);
                if(daily_rd){
                    if(daily_rd.message == "same day"){
                        console.log(yellow.bold(`[*] Account ${stt}: Hôm nay đã điểm danh!`))
                    }else if(daily_rd.message == "OK"){
                        console.log(green.bold(`[*] Account ${stt}: Điểm danh hằng ngày thành công!`))
                    }
                } else {
                    console.log(red.bold(`[*] Account ${stt}: Không thể check dữ liệu điểm danh!`))
                }

                if(userData.availableBalance){
                    console.log(blue.bold(`[*] Account ${stt}: Balance: ${userData.availableBalance}`)); 
                }

                // enable enable_auto_play
                if(enable_auto_play){
                    let playPasses = parseInt(userData.playPasses);
                    if(playPasses>0){
                        console.log(cyan.bold(`[*] Account ${stt}: Run Drop game [${playPasses}]!`))
                        await play_game(stt, access_token, axios, playPasses);
                    }
                }
                //enđ

                // farming
                if(!userData.farming){
                    await farming(stt, access_token, axios, 'https://game-domain.blum.codes/api/v1/farming/start');
                }

                let farmBalance = parseFloat(userData.farming.balance);
                if (farmBalance >= 57) {
                    try {
                        await farming(stt, access_token, axios, 'https://game-domain.blum.codes/api/v1/farming/claim');
                        await farming(stt, access_token, axios, 'https://game-domain.blum.codes/api/v1/farming/start');
                    } catch (e) {
                        await farming(stt, access_token, axios, 'https://game-domain.blum.codes/api/v1/farming/start');
                    }
                }
                //end farming

                // friend claim
                await friend_claim(stt, access_token, axios);
                // end

                if(enable_auto_task){
                    let tasks = await auto_task(stt, access_token, axios)
                }
            }
        }

    }catch(e){
        console.log(`Main Err: ${e}`);
    }
}

async function runMulti() {
    const createChunks = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };
    let countPrx = proxies.length;
    if(numberThread > countPrx) {
        if(countPrx >=30){
            numberThread = 30;
        }else if(countPrx > 0){
            numberThread = countPrx
        }
    }
    const accountChunks = createChunks(accounts, numberThread);

    for (const chunk of accountChunks) {
        let proxy = null;

        const tasks = chunk.map(async (account, index) => {
            const globalIndex = accounts.indexOf(account);

            if (proxies.length > 0) {
                proxy = proxies[globalIndex % proxies.length];
            }

        if (account) {
            const axiosInstance = createAxiosInstance(proxy);
            let stt = Number(globalIndex) + Number(1);
            const maskedProxy = proxy?.slice(0, -10) + '**********';
            console.log(`[#] Account: ${stt}, Proxy: ${maskedProxy}`);
            console.log(`[#] Account: ${stt} Check IP...`);
            let checkIp = await checkIP(axiosInstance);
            console.log(`[#] Account: ${stt} Run at IP: ${checkIp}`);
            await main(stt, account,axiosInstance);
        }
    });

    console.log(`Số luồng chạy: ${tasks.length} ...`);
    
    await Promise.all(tasks);
}
}

// default
async function checkIP(axios) {
    try {
        const rs = await axios.get("https://api.myip.com");
        const ip = rs.data?.ip;
        const country = rs.data?.country;
        return `${ip} - Country: ${country}`;
    } catch (err) {
        console.log("err checkip: ", err);
        return null;
    }
}

async function mainLoopMutil() {
    while (true) {
        await runMulti();
        await countdown(timeRerun*60);
    }
}
mainLoopMutil();