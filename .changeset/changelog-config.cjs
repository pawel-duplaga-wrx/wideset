/** @type {import('@changesets/types').ChangelogFunctions} */
const { default: defaultChangelog } = require('@changesets/cli/changelog');

/** First non-empty line only — keeps CHANGELOG scannable in Storybook. */
const firstLine = (summary) =>
  summary
    .split('\n')
    .map((line) => line.trim())
    .find(Boolean) ?? summary.trim();

module.exports = {
  ...defaultChangelog,
  getReleaseLine: async (changeset, type, changelogOptions) =>
    defaultChangelog.getReleaseLine(
      { ...changeset, summary: firstLine(changeset.summary) },
      type,
      changelogOptions,
    ),
};
