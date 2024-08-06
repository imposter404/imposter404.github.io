let string=''
let binary=[]
let hex=[]
let filex
let final=""
const x=121;
const y=121;


let c=document.getElementById("canvas");
let cx=c.getContext("2d");
let d=document.createElement("img")
let k=document.getElementById("canvas");
let ex=k.getContext("2d");



function toBinary()
{
    string=string.replace(/[\r\t\v\f]/gm, '');
    string=string.replace(/[\n]/gm, '/n');
    for(i=0;i<string.length;i++)
    {
        binary +=string.charCodeAt(i).toString(2);
        hex.push(string.charCodeAt(i).toString(16));
    }
}



function encode(){
let ptr=0
for(i=0;i<x;i++)
{
    for(j=0;j<y;j++)
    {
        if(ptr>=hex.length)
        {
            cx.fillStyle="#000000";
            cx.fillRect(i,j,1,1)
        }
        else{
            cx.fillStyle="#"+hex[ptr+0]+hex[ptr+1]+hex[ptr+2];
            cx.fillRect(i,j,1,1)
            ptr=ptr+3
        }
    }
}
document.getElementById("download").innerHTML=
'<button class="btn btn-light" onclick="download(\'img\')">Download</button>'
}




function download(e)
{
    if(e=="img")
    {
        let canvas =document.getElementById("canvas");
        let img = canvas.toDataURL("image/png");
        let down=document.createElement('a');
        down.download="a_img.png"
        down.href=img;
        down.click();
    }
    else if(e=='txt')
    {
        let kk="data:text/plain;charset=utf-8,"
        console.log(kk)
        var encodedUri = encodeURIComponent(final.toString());
        var link = document.createElement("a");
        link.setAttribute("href", kk+encodedUri);
        link.setAttribute("download","a.txt");
        document.body.appendChild(link);
        link.click();
    }
}

function decode(){
flag=0
for(i=0;i<x;i++)
{
    for(j=0;j<y;j++)
    {
        let gg=ex.getImageData(i,j,1,1);
        if((gg.data[0] & gg.data[0] & gg.data[0]) == 0)
        {
            flag++;
            break;

        }
        final+=String.fromCharCode(parseInt(gg.data[0],10));
        final+=String.fromCharCode(parseInt(gg.data[1],10));
        final+=String.fromCharCode(parseInt(gg.data[2],10));
    }
    if(flag!=0)
    {
        break;
    }
}
final=final.replaceAll("/n","\n");

console.log(final.toString())
document.getElementById("output").style.visibility="visible"
document.getElementById("output").innerHTML=final;
document.getElementById("download").innerHTML=
'<button class="btn btn-light" onclick="download(\'txt\')">Download</button>'

}






async function loadFile(file){
string = await file.text();
filex=file;
console.log(file.type)
if(file.type=='text/plain')
{
    toBinary();
    document.getElementById("button").innerHTML=
        '<button id="button" class="btn btn-light" onclick="encode()">Encode</button>'
}

else if(file.type=="image/png"){
    document.getElementById("button").innerHTML=
        '<button id="button" class="btn btn-light" onclick="decode()">Decode</button>'


    
    let reader= new FileReader();
    reader.readAsDataURL(file)
    reader.onload=(e)=>{
      d.src=reader.result;
      d.height=x;
      d.weight=y;
      ex.drawImage(d,0,0,x,y);
    }

}
else{
    alert("wrong file type")
}

}

