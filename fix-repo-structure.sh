#!/bin/bash
# Run this from the ROOT of your Cat-Game repo, on the `main` branch,
# with a clean working tree (commit or stash anything in progress first).
set -e

echo "Checking out main..."
git checkout main
git pull

echo "Making sure target folders exist..."
mkdir -p client/src/components client/src/pages client/src/lib
mkdir -p server/src/routes server/src/controllers server/src/middleware server/src/utils

echo "Moving client files into client/src/ (overwriting the old stub files)..."
mv -f App.jsx client/src/App.jsx
mv -f App.css client/src/App.css
mv -f index.css client/src/index.css
mv -f main.jsx client/src/main.jsx
mv -f index.html client/index.html
mv -f Nav.jsx client/src/components/Nav.jsx
mv -f SpecimenPlate.jsx client/src/components/SpecimenPlate.jsx
mv -f Home.jsx client/src/pages/Home.jsx
mv -f CatGuide.jsx client/src/pages/CatGuide.jsx
mv -f CatDetail.jsx client/src/pages/CatDetail.jsx
mv -f Quiz.jsx client/src/pages/Quiz.jsx
mv -f Leaderboard.jsx client/src/pages/Leaderboard.jsx
mv -f api.js client/src/lib/api.js

echo "Moving server files into their route/controller/middleware/utils folders..."
mv -f server/src/asyncHandler.js server/src/utils/asyncHandler.js
mv -f server/src/token.js server/src/utils/token.js
mv -f server/src/auth.js server/src/middleware/auth.js
mv -f server/src/authController.js server/src/controllers/authController.js
mv -f server/src/catController.js server/src/controllers/catController.js
mv -f server/src/questionController.js server/src/controllers/questionController.js
mv -f server/src/scoreController.js server/src/controllers/scoreController.js
mv -f server/src/authRoutes.js server/src/routes/authRoutes.js
mv -f server/src/catRoutes.js server/src/routes/catRoutes.js
mv -f server/src/questionRoutes.js server/src/routes/questionRoutes.js
mv -f server/src/scoreRoutes.js server/src/routes/scoreRoutes.js

echo "Removing stray duplicate files at repo root..."
rm -f package.json   # duplicate of server/package.json
rm -f seed.js         # duplicate of server/src/seed.js (and stale/placeholder besides)

echo "Done reorganizing. Now review before committing:"
echo ""
git status
echo ""
echo "If that looks right, run:"
echo "  git add -A"
echo "  git commit -m \"Fix file structure: move client/server files into correct folders\""
echo "  git push"
