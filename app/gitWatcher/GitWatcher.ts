import { Repository, Reset, Cred, Commit, Signature, Merge, Clone } from "nodegit";
import * as fs from "fs";
import config from "../Config";

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
        await this.initRepo();

        while(true){
            let lastCommit = this._currentCommit;

            await this.getLatest();

            if(lastCommit !== this._currentCommit){
                console.log(`Branch ${this._options.branch} currently at commit ${this._currentCommit}`)
            }

            await this.delay(this._options.interval);
        }
    }

    private get credentialCallback() {
        return () => Cred.userpassPlaintextNew(this._options.user, this._options.password);
    }

    private async initRepo() {
        const repoPath = this._options.repoPath;

        //check if the repo already exists
        const dirExists = await this.dirExists(repoPath);

        //make the dir
        if(!dirExists){
            console.log("Making dir: " + repoPath);
            await this.makeDir(repoPath);
        }

        //check if the repo exists
        const repoExists = await this.repoExists(repoPath);

        //init the repo
        if(!repoExists){
            console.log(`cloning repo at: ${config.gitRepoUrl} to: ${repoPath}`)

            const cloneOptions = {
                fetchOpts: {
                    callbacks: {
                        certificateCheck: () => 1,
                        credentials: this.credentialCallback
                    }
                }
            };

            await Clone.clone(config.gitRepoUrl, repoPath, cloneOptions);
        }
    }

    private async getLatest(){
        console.debug("Checking repo for updates");

        const repo = await Repository.open(this._options.repoPath);
        await repo.fetchAll({ 
            callbacks: {
                credentials: this.credentialCallback
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

    private async repoExists(path: string){
        try {
            const repo = await Repository.open(path);

            return !!repo;

        } catch (e) {
        }

        return false;
    }

    private async dirExists(path: string){
        try {
            const stats = await this.getDirStats(path);
    
            if(stats.isDirectory) {
                return true;
            }
        } catch (e) {
        }

        return false;
    }

    private async makeDir(path: string){
        return new Promise((resolve, reject) => {
            fs.mkdir(path, err => {
                if(err){
                    reject(err);
                }
                resolve();
            })
        })
    }

    private async getDirStats(path: string) {
        return new Promise<fs.Stats>((resolve, reject) => {
            fs.stat(path, (err, stats) => {
                if(err){
                    reject(err);
                }

                resolve(stats);
            })
        });
    }
}