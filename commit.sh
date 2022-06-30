#!/bin/sh
# 수정된 파일을 모두 commit 후 push 합니다.
# commit message는 input으로 받습니다.

message=""
echo "data now : $(date +%Y)-$(date +%m)-$(date +%d) $(date +%H):$(date +%M):$(date +%S)"
NowDate=`date`
echo $NowDate

if [ "$1" = "" ]
then message=$NowDate
else message=$1
fi

git add --all
echo $message
git commit -m "$message"
git push -u origin master
