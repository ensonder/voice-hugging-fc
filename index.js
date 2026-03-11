export default async function handler(req, res) {

if(req.method === POST){

let body = 

for await (const chunk of req){
body += chunk
}

const {text} = JSON.parse(body)

const response = await fetch(
httpsapi-inference.huggingface.comodelsmicrosoftspeecht5_tts,
{
methodPOST,
headers{
Authorization`Bearer ${process.env.HF_TOKEN}`,
Content-Typeapplicationjson
},
bodyJSON.stringify({
inputstext
})
}
)

const buffer = await response.arrayBuffer()

const base64 = Buffer.from(buffer).toString(base64)

res.setHeader(Content-Type,applicationjson)

res.end(JSON.stringify({
audio`dataaudiowav;base64,${base64}`
}))

return
}


res.setHeader(Content-Type,texthtml)

res.end(`

!DOCTYPE html

html

head

titleGwen Voice Generatortitle

style

body{
font-familyComic Sans MS;
background#F7F9FF;
displayflex;
justify-contentcenter;
align-itemscenter;
height100vh;
}

.container{
backgroundwhite;
padding40px;
border-radius20px;
width500px;
text-aligncenter;
box-shadow0 10px 25px rgba(0,0,0,0.1);
}

textarea{
width100%;
height150px;
padding15px;
border-radius12px;
border2px solid #ddd;
font-size16px;
margin-bottom20px;
}

button{
background#6C8CFF;
colorwhite;
bordernone;
padding15px 25px;
border-radius12px;
font-size18px;
cursorpointer;
}

buttonhover{
transformscale(1.05);
}

.download{
margin-top10px;
background#FFB86B;
}

style

head

body

div class=container

h1🎤 Gwen Voice Generatorh1

textarea id=text placeholder=Enter script...textarea

br

button onclick=generate()Generate Voicebutton

div id=audioAreadiv

div

script

async function generate(){

const text = document.getElementById(text).value

const audioArea = document.getElementById(audioArea)

audioArea.innerHTML=Generating...

const res = await fetch(,{
methodPOST,
headers{
Content-Typeapplicationjson
},
bodyJSON.stringify({text})
})

const data = await res.json()

audioArea.innerHTML = `

audio controls src=${data.audio}audio

br

a href=${data.audio} download=voice.wav
button class=downloadDownloadbutton
a

`

}

script

body

html

`)

}