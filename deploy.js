import { execSync } from "child_process"

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  red: "\x1b[31m",
}

console.log(`${colors.blue}=== AmbroCast Deployment Helper ===${colors.reset}\n`)

try {
  // Check if git is installed
  console.log(`${colors.yellow}Checking if Git is installed...${colors.reset}`)
  execSync("git --version", { stdio: "ignore" })
  console.log(`${colors.green}✓ Git is installed${colors.reset}\n`)

  // Initialize git repository if not already initialized
  try {
    execSync("git status", { stdio: "ignore" })
    console.log(`${colors.green}✓ Git repository already initialized${colors.reset}\n`)
  } catch (error) {
    console.log(`${colors.yellow}Initializing Git repository...${colors.reset}`)
    execSync("git init", { stdio: "inherit" })
    console.log(`${colors.green}✓ Git repository initialized${colors.reset}\n`)
  }

  // Add all files to git
  console.log(`${colors.yellow}Adding files to Git...${colors.reset}`)
  execSync("git add .", { stdio: "inherit" })
  console.log(`${colors.green}✓ Files added to Git${colors.reset}\n`)

  // Commit changes
  console.log(`${colors.yellow}Committing changes...${colors.reset}`)
  try {
    execSync('git commit -m "Initial commit of AmbroCast app"', { stdio: "inherit" })
    console.log(`${colors.green}✓ Changes committed${colors.reset}\n`)
  } catch (error) {
    console.log(`${colors.red}No changes to commit or commit failed${colors.reset}\n`)
  }

  console.log(`${colors.blue}=== Next Steps ===${colors.reset}`)
  console.log(`
1. Create a repository on GitHub:
   ${colors.yellow}https://github.com/new${colors.reset}

2. Add the remote repository:
   ${colors.yellow}git remote add origin https://github.com/yourusername/ambrocast.git${colors.reset}

3. Push your code to GitHub:
   ${colors.yellow}git push -u origin main${colors.reset} (or ${colors.yellow}git push -u origin master${colors.reset} for older Git versions)

4. Deploy to Netlify:
   ${colors.yellow}https://app.netlify.com/start${colors.reset}
   - Select "Import from Git"
   - Connect to GitHub
   - Select your repository
   - Keep the default settings and click "Deploy site"
  `)
} catch (error) {
  console.error(`${colors.red}Error: ${error.message}${colors.reset}`)
  process.exit(1)
}
