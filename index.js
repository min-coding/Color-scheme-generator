// Get element
let mode = document.getElementById('mode')
let modeValue = ''

let chosenColor = document.getElementById('color-picker')
let colorCode = ''

let getColorBtn = document.getElementById('actionBtn')

// Choose color mode
mode.addEventListener('change',function(){
  modeValue = mode.options[mode.selectedIndex].value;
})

// Choose color hex
chosenColor.addEventListener('change',function(){
  colorCode = chosenColor.value.slice(1)
  console.log(colorCode)
})

// Fetch the scheme
async function getScheme() {
  const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${colorCode}&mode=${modeValue}&count=4`);
  const data = await response.json();
  const colorScheme = data.colors
  const colortHtml = colorScheme.map((item,index) =>{
    return `
    <div class='container-color-scheme' id=${index+1} onclick='show()'>
    <div class='color-scheme' style="background-color:${item.hex.value}"></div>
    <div class='hexCode'> ${item.hex.value} </div>
    </div>
    `
  })
  document.querySelector('.scheme').innerHTML = colortHtml.join('')
}

getColorBtn.addEventListener('click',()=>{
  getScheme()
})





