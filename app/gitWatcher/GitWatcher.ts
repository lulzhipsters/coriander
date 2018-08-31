import { Repository, Reset, Cred, Commit, Signature, Merge } from "nodegit";

interface WatchOptions {
    user: string;
    password: string;
    repoPath: string;
    branch: string;
    interval: number;
}

export default class GitWatcher {
    private _options: WatchOptions;
    private _currentCommit: string = "";

    constructor(options: WatchOptions) {
        this._options = options;
    }

    async watch() {
        while(true){
            let lastCommit = this._currentCommit;

            this.getLatest();

            if(lastCommit !== this._currentCommit){
                console.log(`Branch ${this._options.branch} currently at commit ${this._currentCommit}`)
            }

            await this.delay(this._options.interval);
        }
    }

    private async getLatest(){
        console.debug("Checking repo for updates");

        const repo = await Repository.open(this._options.repoPath);
        await repo.fetchAll({ 
            callbacks: {
                credentials: () => Cred.userpassPlaintextNew(this._options.user, this._options.password)
            }
        });

        const commit = await repo.getReferenceCommit(`refs/remotes/origin/${this._options.branch}`);
        this._currentCommit = commit.sha();

        await Reset.reset(repo, commit as any, Reset.TYPE.HARD, {});
    }

    private async delay(time: number){
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), time);
        });
    }
}