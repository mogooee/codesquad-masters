function mkdir(){
for n in {1..16}
do
	if [ ! -d "day"$n ]; then
	mkdir "day"$n
	fi
done
}


function mkcs(){

	for n in `seq 1 3 16`
	do
		if [ ! -f "day"$n".cs" ]; then
		touch day$n/day$n.cs
		fi
	done
}

mkdir
mkcs
