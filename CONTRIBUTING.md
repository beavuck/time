# ⏲️ Beavuck Time

Thank you for considering contributing to Beavuck Time!

## 🈸 Opening issues

When you open an issue (be it a bug, a suggestion, or other), please follow the relevant guidelines, so that we can
help you as quickly as possible.

Any open issues that do not follow the guidelines may be closed immediately.

### 🐞 Bug reports

Please just follow this link where we set it all up for you: [🐞 Create a bug report](https://gitlab.com/beavuck-services/time/-/issues/new?issuable_template=bug)

Or, to do it by hand : please choose the `bug` issue template when creating the issue, and follow it.

### 💡 Suggestions, feature requests, etc.

Please just follow this link where we set it all up for you: [💡 Create a feature request](https://gitlab.com/beavuck-services/time/-/issues/new?issuable_template=feature)

Or, to do it by hand : please choose the `feature` issue template when creating the issue, and follow it.

## 🔀 Preparing for merge requests

If you have something against TDD, now is probably the time to turn back.

You're still there! Thank you.

When you open a merge request, please make sure to follow the relevant steps, so that it can be reviewed and merged as
quickly as possible.

Any open merge requests that do not follow the guidelines may be closed immediately.

**All merge requests**

- **Commits**: 
  - Your MR will need to be separated into digestible, _logical commits_, with a clear message for each. To fit 
      with this project's conventions, a _commit message's style_ should be short, in the imperative, start with a relevant emoji,
      have its first word be capitalized, and not end with a period. For example: `✏️ Fix typo in README`.
  - Your MR will need to follow TDD principles:
    - _First, commit failing tests_ targeting the bug or feature in question.
    - Then, commit the code that does the thing -- the previously failing tests should now pass. (The pre-existing tests
        should also still pass, obviously.)
- **Title**: Should be treated like a very important commit message, since it will appear as a commit message on the
    `main` branch. See sub-parts below for specific guidelines.
- **Description (Template)**: Choose the relevant template. See sub-parts below.
- **Description (Body)**: Please follow the relevant template.

### 🐛 Bug fixes

- **Title**: Should follow the convention `🐛 Fix #{{issue_number}}: {{very_short_description_in_the_imperative}}`
- **Description (Template)**: Please choose the `bug_fix` MR template when creating the MR.

### ✨ New features, improvements, etc.

- **Title**: `✨ Add #{{issue_number}}: {{very_short_description_in_the_imperative}}`
- **Description (Template)**: Please choose the `feature` MR template when creating the MR.
