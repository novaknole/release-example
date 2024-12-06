const { execSync } = require("child_process");
const fs = require("fs-extra")
const path = require('path')

const {publish, getChangelogEntry} = require("@changesets/release-utils");

module.exports = async ({ github, context, core }) => {
    // const {published, publishedPackages} = await publish({script: 'yarn release'})

    // if(!published) {
    //     console.log("No packages were published, hence no tag/release will be created");
    //     return;
    // }

    // console.log(publishedPackages.length, ' length here')
    // for(let i = 0; i < publishedPackages.length; i++) {
    //     const name = publishedPackages[i].name;
    //     const version = publishedPackages[i].version;
    //     const tagName = `${name}@${version}`

        const workspacesInfo = JSON.parse(
            JSON.parse(execSync('yarn --silent --json workspaces info').toString()).data
        )

        // path.join(packageInfo.location, "package.json");

        const packageInfo = workspacesInfo['@glagh/giorgi-contracts-monorepo'];
        // if(packageInfo === undefined) {
        //     throw new Error("package name that was published is not found in workspace info, abort...");
        // }

        let changelogFileName = path.join(packageInfo.location, "package.json");

        console.log(changelogFileName);

        let changelog = await fs.readFile(changelogFileName, "utf8");
        console.log(changelog)
        // const changelogEntry =  getChangelogEntry(changelog, version)
        
        // if (!changelogEntry) {
        //     // we can find a changelog but not the entry for this version
        //     // if this is true, something has probably gone wrong
        //     throw new Error(
        //       `Could not find changelog entry for ${name}@${version}`
        //     );
        // }

        // await github.rest.repos.createRelease({
        //     owner: context.repo.owner,
        //     repo: context.repo.repo,
        //     name: tagName,
        //     tag_name: tagName,
        //     target_commitish: github.ref_name,
        //     body: changelogEntry.content,
        //     prerelease: process.env.PRERELEASE === 'true',
        // });
    // }
}