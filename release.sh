#!/bin/sh --noprofile

# Get the name of the current Git branch and then ensure that only
# the master Git branch is deployable to production by this script.
branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

# Only push this update to the server if the current branch is the Master branch
if [ "$branch" == "master" ]
then
  git branch -D gh-pages
  git checkout -b gh-pages
  git add build/bundle.css -f
  git add build/bundle.js -f
  git commit -m "deploy at `git log | head -c15`"
  git push origin gh-pages -f
  git checkout master
else
  echo "not currently on master, not checking in to github"
fi
