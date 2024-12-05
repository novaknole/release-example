const {publish} = require("@changesets/release-utils");

module.exports = ({ github, context }) => {
    publish('changeset publish')
}