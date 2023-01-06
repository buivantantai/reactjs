let num = 123321;
let number=num;
let numberDX = 0;
while (number>0) {
    var sc = number%10;
    numberDX = numberDX*10 +sc;
    number = Math.floor(number/10);
}
if(numberDX === num) console.log("YES");
else console.log("NO");