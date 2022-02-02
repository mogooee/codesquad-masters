#!/bin/bash

function backup(){

	day=$(find day* -type d) 
        check=0;
	today=$(date "+%Y%m%d")

	for file in $day/*; do
		
		if [[ -n $(find $file -name "*.cs") ]]; then
			check=$((check+1))
		fi

		if [[ ${check} -eq "0" ]]; then
			echo $file "is empty"
		fi

		check=0;

	done

	CS=$(find . -name "*.cs")
	
	zip "./backup_$today.zip" $CS

	scp -P 1234 "backup_$today.zip" mogooee@127.0.0.1:~/backup
}

backup
