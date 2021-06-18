# Git Feature Branches 
> Here are the basic steps to start using feature branches in your project. We will dive into the details next.
> -   Start on `master`
> -   Create a new feature branch
> -   Implement your changes on that branch
> -   Push the feature branch to your remote repo
> -   Create a pull request for your new changes

## Start on Master
When starting a new feature, I make sure to start with the latest and greatest of the codebase from the main development branch—this commonly referred to as `master`:

```shell
# switch to the master branch
git checkout master
# pull the latest changes from the remote git repository
git pull origin master
```

This reduces complications of dealing with out-of-date code, and reduces the chances of merge issues. Make sure you only `git pull` with a [clean working copy](https://www.git-tower.com/learn/git/faq/difference-between-git-fetch-git-pull/).

**TLDR: Before starting on a branch, make sure you have the latest master codebase.**

## Create a feature branch
```shell
git checkout -b branch_name
```
`-b` flag creates new branch if it doesn't already exist.

Check if you are on the new branch:
```shell
git status
```

## Implement changes per the usual
```shell
git status
git add <some-file>
git commit
```

## Push feature branch to repo
```shell
git push origin branch_name
```

Some guides may suggest adding the [[202103131657 - Git -u flag| -u flag]].

Footer
---
Source: https://bocoup.com/blog/git-workflow-walkthrough-feature-branches
Keywords: #programming #git 
Related: