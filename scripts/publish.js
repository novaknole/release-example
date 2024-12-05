const {publish} = require("@changesets/release-utils");

module.exports = ({ github, context }) => {
    publish({script: 'changeset publish'})
}