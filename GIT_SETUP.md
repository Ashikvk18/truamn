# Git Setup and Customizations

## Custom Git Aliases
We've set up the following custom Git aliases:
```bash
# Beautiful git log with graph and colors
git lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
```
Usage: Type `git lg` to see a beautiful commit history

## Commit Message Template
Location: `.gitmessage` in the root directory
- Format includes sections for:
  - Type of change (feat/fix/docs/style/refactor/test/chore)
  - Why the change is needed
  - How it addresses the issue
  - References to relevant resources

## Git Configurations
We've set the following Git configurations:
```bash
# Use commit template
git config --global commit.template .gitmessage

# Use rebase instead of merge on pull
git config --global pull.rebase true
```

## How to Use These Features
1. **For beautiful git logs:**
   ```bash
   git lg
   ```

2. **For structured commit messages:**
   - Just use `git commit` and the template will appear in your editor
   - Fill in the sections as needed

3. **When pulling changes:**
   - Use `git pull` as normal, it will automatically rebase instead of merge

## Additional Resources
- Gitmoji guide: https://gitmoji.dev/
- Git LFS: https://git-lfs.github.com/
- GitHub CLI: https://cli.github.com/
