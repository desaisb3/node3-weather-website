console.log('Client side java is loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// }) //Asyn IO operation


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2') //Selecting by id is done using # method

//messageOne.textContent = 'From JavaScript'


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value

    messageOne.textContent='Loading...'
    messageTwo.textContent=''

    fetch('http://localhost:3000/weather?address=' + encodeURI(location)).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
            //console.log(data.error)
        }
        else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
            // console.log(data.location)
            // console.log(data.forecast)
        }
    })
})

    console.log(location)
})