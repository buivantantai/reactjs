let index = '  nguyen tHac Tung';
let newStr = index.trim().toLowerCase();
let string = newStr[0].toUpperCase() + newStr.slice(1);
for(let i = 0;i<string.length;i++)
{
    if(string[i-1]===" ")
    {
        string = string.slice(0,i) + string.charAt(i).toUpperCase() + string.slice(i+1);
    }
}
console.log(string);
