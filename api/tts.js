export default async function handler(req,res){

if(req.method !== "POST"){
res.status(405).json({error:"Method not allowed"})
return
}

const {text} = req.body

const response = await fetch(
"https://api-inference.huggingface.co/models/microsoft/speecht5_tts",
{
method:"POST",
headers:{
Authorization:`Bearer ${process.env.HF_TOKEN}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
inputs:text
})
}
)

const buffer = await response.arrayBuffer()

const base64 = Buffer.from(buffer).toString("base64")

res.status(200).json({
audio:`data:audio/wav;base64,${base64}`
})

}