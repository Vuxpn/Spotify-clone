const fs = require('fs');
const path = require('path');
const axios = require('axios');
const colors = require('colors');
const readline = require('readline');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

class OKX {
    headers() {
        return {
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate, br, zstd",
            "Accept-Language": "en-US,en;q=0.9",
            "App-Type": "web",
            "Content-Type": "application/json",
            "Origin": "https://www.okx.com",
            "Referer": "https://www.okx.com/mini-app/racer?tgWebAppStartParam=linkCode_106663989",
            "Sec-Ch-Ua": '"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126"',
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": '"Windows"',
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0",
            "X-Cdn": "https://www.okx.com",
            "X-Locale": "en_US",
            "X-Utc": "7",
            "X-Zkdex-Env": "0"
        };
    }

    async retryWithBackoff(fn, maxRetries = 5, delay = 1000, accountNumber) {
        for (let i = 0; i < maxRetries; i++) {
            try {
                return await fn();
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.log("Lỗi 401 : Query_id đã hết hạn, bạn hãy get lại đi !".red, accountNumber);
                    throw error;
                } else if (error.response && error.response.status === 429) {
                    this.log(`Gặp lỗi 429, thử lại lần ${i + 1}...`, accountNumber);
                    await this.sleep(delay * Math.pow(2, i));
                } else {
                    throw error;
                }
            }
        }
        throw new Error('Đã hết số lần thử lại');
    }

    async postToOKXAPI(extUserId, extUserName, queryId, accountNumber) {
        return this.retryWithBackoff(async () => {
            const url = `https://www.okx.com/priapi/v1/affiliate/game/racer/info?t=${Date.now()}`;
            const headers = { ...this.headers(), 'X-Telegram-Init-Data': queryId };
            const payload = {
                "extUserId": extUserId,
                "extUserName": extUserName,
                "gameId": 1,
                "linkCode": "106663989"
            };
            return axios.post(url, payload, { headers });
        }, 5, 1000, accountNumber);
    }

    async assessPrediction(extUserId, predict, queryId, accountNumber) {
        return this.retryWithBackoff(async () => {
            const url = `https://www.okx.com/priapi/v1/affiliate/game/racer/assess?t=${Date.now()}`;
            const headers = { ...this.headers(), 'X-Telegram-Init-Data': queryId };
            const payload = {
                "extUserId": extUserId,
                "predict": predict,
                "gameId": 1
            };
            return axios.post(url, payload, { headers });
        }, 5, 1000, accountNumber);
    }

    async checkDailyRewards(extUserId, queryId, accountNumber) {
        return this.retryWithBackoff(async () => {
            const url = `https://www.okx.com/priapi/v1/affiliate/game/racer/tasks?t=${Date.now()}`;
            const headers = { ...this.headers(), 'X-Telegram-Init-Data': queryId };
            const response = await axios.get(url, { headers });
            const tasks = response.data.data;
            const dailyCheckInTask = tasks.find(task => task.id === 4);
            if (dailyCheckInTask) {
                if (dailyCheckInTask.state === 0) {
                    this.log('Bắt đầu checkin...', accountNumber);
                    await this.performCheckIn(extUserId, dailyCheckInTask.id, queryId, accountNumber);
                } else {
                    this.log('Hôm nay bạn đã điểm danh rồi!', accountNumber);
                }
            }
        }, 5, 1000, accountNumber);
    }

    async performCheckIn(extUserId, taskId, queryId, accountNumber) {
        return this.retryWithBackoff(async () => {
            const url = `https://www.okx.com/priapi/v1/affiliate/game/racer/task?t=${Date.now()}`;
            const headers = { ...this.headers(), 'X-Telegram-Init-Data': queryId };
            const payload = {
                "extUserId": extUserId,
                "id": taskId
            };
            await axios.post(url, payload, { headers });
            this.log('Điểm danh hàng ngày thành công!', accountNumber);
        }, 5, 1000, accountNumber);
    }

    log(msg, accountNumber) {
        console.log(`[Account ${accountNumber}] ${msg}`);
    }

    getFormattedFutureTime(secondsFromNow) {
        const futureTime = new Date(Date.now() + secondsFromNow * 1000);
        return futureTime.toLocaleTimeString('en-US', { hour12: false });
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async waitWithCountdown(seconds) {
        for (let i = seconds; i >= 0; i--) {
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(`===== Đã hoàn thành tất cả tài khoản, chờ ${i} giây để tiếp tục vòng lặp =====`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        console.log('');
    }

    async Countdown(seconds, accountNumber) {
        await this.sleep(seconds * 1000);
    }

    extractUserData(queryId) {
        const urlParams = new URLSearchParams(queryId);
        const user = JSON.parse(decodeURIComponent(urlParams.get('user')));
        return {
            extUserId: user.id,
            extUserName: user.username
        };
    }

    async getBoosts(queryId, accountNumber) {
        return this.retryWithBackoff(async () => {
            const url = `https://www.okx.com/priapi/v1/affiliate/game/racer/boosts?t=${Date.now()}`;
            const headers = { ...this.headers(), 'X-Telegram-Init-Data': queryId };
            const response = await axios.get(url, { headers });
            return response.data.data;
        }, 5, 1000, accountNumber);
    }

    async useBoost(queryId, accountNumber) {
        return this.retryWithBackoff(async () => {
            const url = `https://www.okx.com/priapi/v1/affiliate/game/racer/boost?t=${Date.now()}`;
            const headers = { ...this.headers(), 'X-Telegram-Init-Data': queryId };
            const payload = { id: 1 };
            const response = await axios.post(url, payload, { headers });
            if (response.data.code === 0) {
                this.log('Reload Fuel Tank thành công!'.yellow, accountNumber);
                await this.sleep(5000);
            } else {
                this.log(`Lỗi Reload Fuel Tank: ${response.data.msg}`.red, accountNumber);
            }
        }, 5, 1000, accountNumber);
    }

    async upgradeFuelTank(queryId, accountNumber) {
        return this.retryWithBackoff(async () => {
            const url = `https://www.okx.com/priapi/v1/affiliate/game/racer/boost?t=${Date.now()}`;
            const headers = { ...this.headers(), 'X-Telegram-Init-Data': queryId };
            const payload = { id: 2 };
            const response = await axios.post(url, payload, { headers });
            if (response.data.code === 0) {
                this.log('Nâng cấp Fuel Tank thành công!'.yellow, accountNumber);
            } else {
                this.log(`Lỗi nâng cấp Fuel Tank: ${response.data.msg}`.red, accountNumber);
            }
        }, 5, 1000, accountNumber);
    }

    async upgradeTurbo(queryId, accountNumber) {
        return this.retryWithBackoff(async () => {
            const url = `https://www.okx.com/priapi/v1/affiliate/game/racer/boost?t=${Date.now()}`;
            const headers = { ...this.headers(), 'X-Telegram-Init-Data': queryId };
            const payload = { id: 3 };
            const response = await axios.post(url, payload, { headers });
            if (response.data.code === 0) {
                this.log('Nâng cấp Turbo Charger thành công!'.yellow, accountNumber);
            } else {
                this.log(`Lỗi nâng cấp Turbo Charger: ${response.data.msg}`.red, accountNumber);
            }
        }, 5, 1000, accountNumber);
    }

    async getCurrentPrice(accountNumber) {
        return this.retryWithBackoff(async () => {
            const url = 'https://www.okx.com/api/v5/market/ticker?instId=BTC-USDT';
            const response = await axios.get(url);
            if (response.data.code === '0' && response.data.data && response.data.data.length > 0) {
                return parseFloat(response.data.data[0].last);
            } else {
                throw new Error('Lỗi khi lấy giá hiện tại');
            }
        }, 5, 1000, accountNumber);
    }

    askQuestion(query) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise(resolve => rl.question(query, ans => {
            rl.close();
            resolve(ans);
        }));
    }

    async getComboOption() {
        return await this.askQuestion('Bạn có muốn dừng khi số lượt còn 0 để ăn combo (y/n): ');
    }

    async getWaitTime(fuelTank) {
        const waitTimes = [910, 1090, 1260, 1460, 1630, 1810, 1990, 2170, 2350, 2530];
        return waitTimes[fuelTank.curStage] || 910;
    }

    async getThreadCount() {
        const answer = await this.askQuestion('Nhập số luồng muốn chạy: ');
        return parseInt(answer) || 5;
    }

    async processAccount(accountData, accountNumber, useComboOption, hoinangcap, hoiturbo) {
        const { extUserId, extUserName } = this.extractUserData(accountData);
        try {
            await this.checkDailyRewards(extUserId, accountData, accountNumber);

            let boosts = await this.getBoosts(accountData, accountNumber);
            boosts.forEach(boost => {
                this.log(`${boost.context.name.green}: ${boost.curStage}/${boost.totalStage}`, accountNumber);
            });
            let reloadFuelTank = boosts.find(boost => boost.id === 1);
            let fuelTank = boosts.find(boost => boost.id === 2);
            let turbo = boosts.find(boost => boost.id === 3);
            if (fuelTank && hoinangcap) {
                const balanceResponse = await this.postToOKXAPI(extUserId, extUserName, accountData, accountNumber);
                const balancePoints = balanceResponse.data.data.balancePoints;
                if (fuelTank.curStage < fuelTank.totalStage && balancePoints > fuelTank.pointCost) {
                    await this.upgradeFuelTank(accountData, accountNumber);
                    
                    boosts = await this.getBoosts(accountData, accountNumber);
                    const updatedFuelTank = boosts.find(boost => boost.id === 2);
                    const updatebalanceResponse = await this.postToOKXAPI(extUserId, extUserName, accountData, accountNumber);
                    const updatedBalancePoints = updatebalanceResponse.data.data.balancePoints;
                    if (updatedFuelTank.curStage >= fuelTank.totalStage || updatedBalancePoints < fuelTank.pointCost) {
                        this.log('Không đủ điều kiện nâng cấp Fuel Tank!'.red, accountNumber);
                    }
                } else {
                    this.log('Không đủ điều kiện nâng cấp Fuel Tank!'.red, accountNumber);
                }
            }
            if (turbo && hoiturbo) {
                const balanceResponse = await this.postToOKXAPI(extUserId, extUserName, accountData, accountNumber);
                const balancePoints = balanceResponse.data.data.balancePoints;
                if (turbo.curStage < turbo.totalStage && balancePoints > turbo.pointCost) {
                    await this.upgradeTurbo(accountData, accountNumber);
                    
                    boosts = await this.getBoosts(accountData, accountNumber);
                    const updatedTurbo = boosts.find(boost => boost.id === 3);
                    const updatebalanceResponse = await this.postToOKXAPI(extUserId, extUserName, accountData, accountNumber);
                    const updatedBalancePoints = updatebalanceResponse.data.data.balancePoints;
                    if (updatedTurbo.curStage >= turbo.totalStage || updatedBalancePoints < turbo.pointCost) {
                        this.log('Nâng cấp Turbo Charger không thành công!'.red, accountNumber);
                    }
                } else {
                    this.log('Không đủ điều kiện nâng cấp Turbo Charger!'.red, accountNumber);
                }
            }
            
            while (true) {
                const price1 = await this.getCurrentPrice(accountNumber);
                await this.sleep(4000);
                const price2 = await this.getCurrentPrice(accountNumber);

                let predict = price2 >= price1 ? 1 : 0;
                let action = predict === 1 ? 'Mua' : 'Bán';
                
                const response = await this.postToOKXAPI(extUserId, extUserName, accountData, accountNumber);
                const balancePoints = response.data.data.balancePoints;
                this.log(`${'Balance Points:'.green} ${balancePoints}`, accountNumber);

                const assessResponse = await this.assessPrediction(extUserId, predict, accountData, accountNumber);
                const assessData = assessResponse.data.data;
                const result = assessData.won ? 'Win'.green : 'Thua'.red;
                const calculatedValue = assessData.basePoint * assessData.multiplier;
                this.log(`Dự Đoán ${action} | Kết quả: ${result} x ${assessData.multiplier}! Balance: ${assessData.balancePoints}, Số lượt còn lại: ${assessData.numChance}, Nhận được: ${calculatedValue}`.magenta, accountNumber);

                if (assessData.numChance > 0) {
                    await this.sleep(1000);
                } else if (assessData.numChance <= 0) {
                    if (reloadFuelTank && reloadFuelTank.curStage < reloadFuelTank.totalStage) {
                        await this.useBoost(accountData, accountNumber);
                        boosts = await this.getBoosts(accountData, accountNumber);
                        reloadFuelTank = boosts.find(boost => boost.id === 1);
                    } else if (useComboOption) {
                        const waitTime = await this.getWaitTime(fuelTank);
                        const resumeTime = this.getFormattedFutureTime(waitTime);
                        this.log(`Số lượt còn lại là 0. Dừng ${waitTime} giây để hồi full lượt để dễ ăn combo, thời gian bắt đầu chạy lại vào lúc ${resumeTime}`, accountNumber);
                        await this.Countdown(waitTime, accountNumber);
                    } else {
                        break;
                    }
                }
            }
        } catch (error) {
            this.log(`${'Lỗi rồi:'.red} ${error.message}`, accountNumber);
        }
    }

    async main() {
        const dataFile = path.join(__dirname, 'id.txt');
        const userData = fs.readFileSync(dataFile, 'utf8')
            .replace(/\r/g, '')
            .split('\n')
            .filter(Boolean);

        const threadCount = await this.getThreadCount();
        const nangcapfueltank = await this.askQuestion('Bạn có muốn nâng cấp fuel tank không? (y/n): ');
        const hoinangcap = nangcapfueltank.toLowerCase() === 'y';
        const nangcapturbo = await this.askQuestion('Bạn có muốn nâng cấp Turbo Charger không? (y/n): ');
        const hoiturbo = nangcapturbo.toLowerCase() === 'y';
        const useComboOption = (await this.getComboOption()).toLowerCase() === 'y';

        const processAccounts = async (start, end) => {
            for (let i = start; i < end && i < userData.length; i++) {
                const queryId = userData[i];
                await this.processAccount(queryId, i + 1, useComboOption, hoinangcap, hoiturbo);
            }
        };

        while (true) {
            const workers = [];
            const accountsPerWorker = Math.ceil(userData.length / threadCount);

            for (let i = 0; i < threadCount; i++) {
                const start = i * accountsPerWorker;
                const end = start + accountsPerWorker;
                workers.push(processAccounts(start, end));
            }

            await Promise.all(workers);
            await this.waitWithCountdown(600);
        }
    }
}

if (require.main === module) {
    const okx = new OKX();
    okx.main().catch(err => {
        console.error(err.toString().red);
        process.exit(1);
    });
}

