# Git Workflow - Campus Recreation Website

## Our Development Workflow

```
                Campus Recreation Website Git Workflow
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  Local Development                GitHub Repository      │
│  ┌──────────┐     git push     ┌──────────────┐        │
│  │  Your    │─────────────────→│   truamn     │        │
│  │ Changes  │                  │  Repository   │        │
│  └────┬─────┘  ←───────────────└──────┬───────┘        │
│       │         git pull              │                 │
│       │                               │                 │
│  ┌────▼─────┐                   ┌────▼─────┐          │
│  │  Local   │    Beautiful      │  Remote  │          │
│  │ Commits  │    git lg view    │ Master   │          │
│  └────┬─────┘                   └──────────┘          │
│       │                                               │
│  ┌────▼───────────────┐                              │
│  │  Commit Template   │      Project Structure       │
│  │ ┌───────────────┐ │      ┌──────────────┐        │
│  │ │ feat: Subject │ │      │ rec-website/ │        │
│  │ │ Why: Reason   │ │      │ ├── Frontend │        │
│  │ │ How: Details  │ │      │ ├── Backend  │        │
│  │ └───────────────┘ │      │ └── AI      │        │
│  └──────────────────┘       └──────────────┘        │
│                                                      │
└──────────────────────────────────────────────────────┘
```

## Key Components

1. **Local Development**
   - Make changes in your local environment
   - Stage changes using `git add`
   - Create structured commits using our template

2. **Commit Structure**
   ```
   feat/fix/docs/style/refactor/test/chore: Subject line

   Why:
   - Business value
   - User impact

   How:
   - Implementation details
   - Technical approach

   Refs: #issue-number
   ```

3. **GitHub Integration**
   - Push changes to GitHub repository
   - Pull updates from remote
   - View beautiful commit history using `git lg`

4. **Project Organization**
   - Frontend: HTML, CSS, JavaScript
   - Backend: Node.js, Python
   - AI Integration: Claude API
   - Documentation: Markdown files

## Best Practices
1. Always pull before starting new work
2. Use meaningful commit messages
3. Keep commits focused and atomic
4. Push regularly to backup your work
5. Maintain clean git history

## Useful Commands
```bash
# View beautiful commit history
git lg

# Create a new commit using template
git commit

# Push changes to GitHub
git push origin master

# Get latest changes
git pull --rebase
```
