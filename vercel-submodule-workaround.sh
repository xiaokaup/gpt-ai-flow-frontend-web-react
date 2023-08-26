# github submodule repo address without https:// prefix
SUBMODULE_GITHUB=github.com/GPT-AI-Flow/gpt-ai-flow-common.git

# .gitmodules submodule path
SUBMODULE_PATH=src/gpt-ai-flow-common

branch=master

echo "yang"
echo $APP_ENV

# github access token is necessary
# add it to Environment Variables on Vercel
if [ "$GITHUB_ACCESS_TOKEN" == "" ]; then
  echo "Error: GITHUB_ACCESS_TOKEN is empty"
  exit 1
fi

# stop execution on error - don't let it build if something goes wrong
set -e

# get submodule commit
output=`git submodule status --recursive` # get submodule info
COMMIT=${output:1:41} # submodule commit id

# set up submoduyle path directory
rm -rf $SUBMODULE_PATH || true # remove the tmp folder if exists
mkdir $SUBMODULE_PATH

# set up an empty temporary work directory
rm -rf tmp || true # remove the tmp folder if exists
mkdir tmp # create the tmp folder
cd tmp # go into the tmp folder

# checkout the current submodule commit
git init # initialise empty repo
git remote add origin https://$GITHUB_ACCESS_TOKEN@$SUBMODULE_GITHUB # add origin of the submodule
# git fetch --depth=1 origin $branch # fetch only the required version
git fetch
echo "checkout $COMMIT"
git checkout $COMMIT # checkout on the right commit
pwd
ls -la

# move the submodule from tmp to the submodule path
cd .. # go folder up
rm -rf tmp/.git # remove .git 
mv tmp/* $SUBMODULE_PATH/ # move the submodule to the submodule path
ls $SUBMODULE_PATH

# clean up
rm -rf tmp # remove the tmp folder