


const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherCard = document.querySelector('.weather-card');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

/* -- Glow effect -- */

const blob = document.getElementById("blob");

window.onpointermove = event => { 
  const { clientX, clientY } = event;
  
  blob.animate({
    left: `${clientX}px`,
    top: `${clientY}px`
  }, { duration: 3000, fill: "forwards" });
}


search.addEventListener('click', () => {

    const APIKey = '886705b4c1182eb1c69f28eb8c520e2 0';
    const city = document.querySelector('.search-box input').value;
 
    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherCard.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-card img');
            const temperature = document.querySelector('.weather-card .temperature');
            const description = document.querySelector('.weather-card .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const windy = document.querySelector('.weather-details .windy span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    
                    document.body.style.backgroundImage = "linear-gradient(295deg,#ffffff ,#fffffd)";
                    document.getElementById("blob").style.backgroundImage = "linear-gradient(to right, yellow 10% , #e1c45e 90%)";

                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    
                    document.body.style.backgroundImage = "linear-gradient(-45deg, #154277 ,#576e71 ,#e1c45e  )";
                    $(document).ready(function() {
                        var canvas = $('#canvas')[0];
                        canvas.width = window.innerWidth;
                        canvas.height = window.innerHeight;
                        
                        if(canvas.getContext) {
                          var ctx = canvas.getContext('2d');
                          var w = canvas.width;
                          var h = canvas.height;
                          ctx.strokeStyle = 'rgba(174,194,224,0.5)';
                          ctx.lineWidth = 1;
                          ctx.lineCap = 'round';
                          
                          
                          var init = [];
                          var maxParts = 1000;
                          for(var a = 0; a < maxParts; a++) {
                            init.push({
                              x: Math.random() * w,
                              y: Math.random() * h,
                              l: Math.random() * 1,
                              xs: -4 + Math.random() * 4 + 2,
                              ys: Math.random() * 10 + 10
                            })
                          }
                          
                          var particles = [];
                          for(var b = 0; b < maxParts; b++) {
                            particles[b] = init[b];
                          }
                          
                          function draw() {
                            ctx.clearRect(0, 0, w, h);
                            for(var c = 0; c < particles.length; c++) {
                              var p = particles[c];
                              ctx.beginPath();
                              ctx.moveTo(p.x, p.y);
                              ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
                              ctx.stroke();
                            }
                            move();
                          }
                          
                          function move() {
                            for(var b = 0; b < particles.length; b++) {
                              var p = particles[b];
                              p.x += p.xs;
                              p.y += p.ys;
                              if(p.x > w || p.y > h) {
                                p.x = Math.random() * w;
                                p.y = -20;
                              }
                            }
                          }
                          
                          setInterval(draw, 30);
                          
                        }
                      });
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    document.getElementById("blob").style.backgroundImage = "linear-gradient(to right, grey 10% , white 90%)";
                    document.body.style.backgroundImage = "linear-gradient(45deg, #9be2fe, #67d1fb )";                    
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    document.getElementById("blob").style.backgroundImage = "linear-gradient(to right, grey 10% , white 90%)";
                    document.body.style.backgroundImage = "linear-gradient(45deg, #9be2fe, #67d1fb )";
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    document.getElementById("blob").style.backgroundImage = "linear-gradient(to right, #b7eaff , #6297A1)";
                    document.body.style.backgroundImage = "linear-gradient(45deg, white, grey, black  )";
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            windy.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherCard.style.display = '';
            weatherDetails.style.display = '';
            weatherCard.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '500px';


        });


});