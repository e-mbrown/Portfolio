// Google sheet for projects
const url = 'https://spreadsheets.google.com/feeds/list/1L-41kQAND4wxOdAVPq1EVSBNMyOmeAmthOdraPwCpRs/od6/public/values?alt=json'
// Google sheet for contacts
const form = 'https://spreadsheets.google.com/feeds/list/1XPBFwhTM6bRryjSDFnR0tyxa9RPAH1CUh3eT2mGa2ZU/od6/public/values?alt=json' 
let i=0


fetch(url)
    .then(response=>response.json())
    .then(data => {
        const projects = data.feed.entry.map( entry => {
            return{
                title: entry.gsx$title.$t,
                image: entry.gsx$image.$t,
                description: entry.gsx$description.$t,
                url: entry.gsx$url.$t,
                skills: entry.gsx$skills.$t,
                url2: entry.gsx$urlb.$t,
                live: entry.gsx$livelink.$t
            }
        })
        app(projects)
    })
    const app = (data) =>{
        // Description gen
        const createPElement = (project) => {
            const $div = $('<div>')
            $div.append($('<h2>').text(project.title))
            $div.append($('<p>').text(project.description))
            if(project.live){
                $div.append($('<a>').attr('href', project.url).text('Frontend Repo '))
                $div.append($('<a>').attr('href', project.url2).text('Backend Repo '))
                $div.append($('<a>').attr('href', project.live).text('Live Site '))
            }
            else {
                $div.append($('<a>').attr('href', project.url).text('Live Site'))
            }
            return($div)
        }
        //project image    
        const  createProjectImage  = (project) => {
            let $a = $('<a>') 
            let $img =$('<img>').attr('src', project.image)
            $a.append($img)
            return($a)
        }
        //Makes descriptions show up! 
        const manualDis = function(x) {
            $('#temp').remove()
            $('#import').remove()
            $projectDiv = createPElement(data[x])
            $projectDiv.attr('id', 'temp')
            $('.description').prepend($projectDiv)
        }
            //creates images dynamically
            
        data.forEach((element, i) => {
            const $image = createProjectImage(element).on('click', () => manualDis(`${i}`))
            $('.grid').append($image)
    })
}

//------------------------------------------------------------------------
                            //Google Form Stuff

const formUrl ='https://docs.google.com/forms/d/e/1FAIpQLSfPAVCO56MAEQIJwd8JpY_NjagiqH5GTVWfZ739f_9WKaO2sw/formResponse'

const formSubmit = () => {
    
    //tags
    const nameTag = "entry.704183281"
    const emailTag = "entry.1354170679" 
    const phoneTag = "entry.800626546" 
    const messageTag = "entry.1625250508" 
    //user values
    let name = $('.name')
    let email = $('.email')
    let phone = $('.phone')
    let message = $('.message')

    //scary stuff!!
    fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `${nameTag}=${name.val()}&${emailTag}=${email.val()}&${phoneTag}=${phone.val()}&${messageTag}=${message.val()}`
    })
    .then(res => {
          // clear the fields and give the user feedback
          name.val('');
          email.val('');
          phone.val('');
          message.val('');
          $('.confirmation').text('Your message has been sent. Thanks!') 
          })
      .catch(err => console.log(err))
}
  $('button').on('click', () => formSubmit())