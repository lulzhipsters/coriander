const config = {
    listenPort: parseInt(process.env.HOST_PORT),

    corsAllowed: process.env.HEADERS_CORSALLOWED,

    dataFolderPath: process.env.DATA_PATH,
    staticContentPath: process.env.DATA_CONTENTPATH,
    postDataPath: process.env.DATA_POSTSPATH,

    defaultPostsPerPage: parseInt(process.env.API_POSTSPERPAGE),

    gitRepoUrl: process.env.GIT_REPO,
    gitUser: process.env.GIT_USER,
    gitPassword: process.env.GIT_PASSWORD,
    gitBranch: process.env.GIT_BRANCH,
    gitFetchInterval: parseInt(process.env.GIT_FETCHINTERVAL),
    gitWatchEnabled: process.env.GIT_WATCH == 'true'
}

export default config;