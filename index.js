// Get element
let mode = document.getElementById('mode')
let modeValue = ''

let chosenColor = document.getElementById('color-picker')
let colorCode = ''

let getColorBtn = document.getElementById('actionBtn')
let colorScheme =[]

// Choose color mode
mode.addEventListener('change',function(){
  modeValue = mode.options[mode.selectedIndex].value;
})

// Choose color hex
chosenColor.addEventListener('change',function(){
  colorCode = chosenColor.value.slice(1)
})

// Fetch the scheme
async function getScheme() {
  const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${colorCode}&mode=${modeValue}&count=4`);
  const data = await response.json();
  console.log(data)
   colorScheme = data.colors

  //  Set id property to each color
   for(i=0; i< colorScheme.length;i++){
    colorScheme[i].id = i+1
   }
}

function render(){
  const colortHtml = colorScheme.map((item) =>{

    return `
    <div class='container-color-scheme' id=${item.id} onclick=getHex(${item.id})>
    <div class='container-color-scheme' >
      <img src=${item.image.bare} class='color-scheme'> 
      <p class='text-overlay'> Click to copy </p>
    </div>
      <div class='hexCode'> ${item.hex.value} </div>
    </div>
    </div>
    `
})
document.querySelector('.scheme').innerHTML = colortHtml.join('')
}

function getHex(id){
  colorScheme.map(item=>{
    if(item.id === id){
      navigator.clipboard.writeText(`${item.hex.value}`)
      console.log(item.hex.value)
    }
  })
}

getColorBtn.addEventListener('click',()=>{
  getScheme()
  render()
})





