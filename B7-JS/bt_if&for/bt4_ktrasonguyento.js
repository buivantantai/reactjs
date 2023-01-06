let n = 10;
for(let i=1;i<=n;i++)
{   
    let count = 0;
    if(i<2)
    {
        console.log(i + " là số nguyên tố");
    }
    else {
        for(let j=2; j <= Math.sqrt(i);j++)
        {
            if(i%j == 0)
            {
                count++;
            }
        }
        if(count==0)
        console.log(i+" là số nguyên tố");
    }
    
}