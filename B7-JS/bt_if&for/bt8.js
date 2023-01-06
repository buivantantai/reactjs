let n = 1234;
let count=0;
while(n>0) {
    if((n%10)%2 == 0)  {
        count++;
        break;
    }
    n = parseInt(n/10);
}

if(count==0) {
    console.log("YES");
} else {
    console.log("NO");
}