const os = require('os');
const pidusage = require('pidusage');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

module.exports = {
    config: {
        name: 'uptime',
        aliases: ["up", "state"],
        version: '1.6.9',
        author: "Nazrul",
        countDown: 5,
        role: 0,
        shortDescription: 'Show all Information of Uptime',
        longDescription: { en: 'Show all uptime information of bot' },
        category: 'system',
        guide: { en: '{p}upt' }
    },

    byte2mb(bytes) {
        const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        let l = 0, n = parseInt(bytes, 10) || 0;
        while (n >= 1024 && ++l) n /= 1024;
        return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
    },

    getUptime(seconds) {
        return `${~~(seconds / 2592000) ? ~~(seconds / 2592000) + 'M ' : ''}${~~(seconds % 2592000 / 86400) ? ~~(seconds % 2592000 / 86400) + 'd ' : ''}${~~(seconds % 86400 / 3600) ? ~~(seconds % 86400 / 3600) + 'h ' : ''}${~~(seconds % 3600 / 60) ? ~~(seconds % 3600 / 60) + 'm ' : ''}${~~(seconds % 60)}s`;
    },

    async getDiskSpaceInfo() {
        try {
            const { stdout } = await execPromise('df -h / | tail -1');
            const parts = stdout.trim().split(/\s+/);
            return { total: parts[1], used: parts[2], available: parts[3] };
        } catch {
            return { total: 'N/A', used: 'N/A', available: 'N/A' };
        }
    },

    async getCpuUsage() {
        return new Promise((resolve, reject) => {
            exec('top -b -n2 | grep "Cpu(s)" | tail -n 1', (err, stdout) => {
                if (err) return reject(err);
                const usageMatch = stdout.match(/(\d+\.\d+)\s*us/);
                if (usageMatch) {
                    resolve(parseFloat(usageMatch[1]));
                } else {
                    resolve('N/A');
                }
            });
        });
    },

    onStart: async ({ api, event, usersData, threadsData }) => {
        try {
            const [usage, allUsers, allThreads, diskSpaceInfo, cpuUsage] = await Promise.all([
                pidusage(process.pid),
                usersData.getAll(),
                threadsData.getAll(),
                module.exports.getDiskSpaceInfo(),
                module.exports.getCpuUsage()
            ]);

            const uptimeSeconds = Math.floor(process.uptime());
            const systemUptime = os.uptime();
            const totalUsers = allUsers.length;
            const totalGroups = allThreads.length;
            const totalMemory = module.exports.byte2mb(os.totalmem());
            const freeMemory = module.exports.byte2mb(os.freemem());

            const cpuInfo = os.cpus();
            const cpuModel = cpuInfo.length > 0 ? cpuInfo[0].model : 'N/A';
            const cpuCores = cpuInfo.length;

            let pkgCount = 0;
            try {
                const pkgJson = require(`${process.cwd()}/package.json`);
                pkgCount = Object.keys(pkgJson.dependencies || {}).length;
            } catch {
                pkgCount = 'N/A';
            }

            const msg = `
📅 Date: ${new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka", hour12: true })}

🚀 Bot Uptime: ${module.exports.getUptime(uptimeSeconds)}
🚀 System Uptime: ${module.exports.getUptime(systemUptime)}

💻 CPU Usage: ${cpuUsage !== 'N/A' ? `${cpuUsage.toFixed(1)}%` : 'N/A'}
💻 CPU Cores: ${cpuCores}
💻 CPU Model: ${cpuModel}
💻 RAM Usage: ${module.exports.byte2mb(usage.memory)} / ${totalMemory}
💻 Free Memory: ${freeMemory}

📦 Installed Packages: ${pkgCount}

👥 Total Users: ${totalUsers}
👥 Total Groups: ${totalGroups}

💾 Disk Used: ${diskSpaceInfo.used} / Total: ${diskSpaceInfo.total}
💾 Available Disk: ${diskSpaceInfo.available}
`.trim();

            api.sendMessage(msg, event.threadID, null, event.messageID);
        } catch (err) {
            api.sendMessage(`❌ Error fetching uptime info:\n${err.message}`, event.threadID, null, event.messageID);
        }
    }
};
