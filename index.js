const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const follower = document.getElementById('follower');


const canvasOffsetX = canvas.offsetLeft; 
const canvasOffsetY = canvas.offsetTop; 

var rect = canvas.getBoundingClientRect();
var distanceToRight = window.innerWidth - rect.right;

// canvas.width = canvas.clientWidth;
// canvas.height = canvas.clientHeight;
canvas.width = window.innerWidth - rect.right;
canvas.height = window.innerHeight - rect.bottom;


let isPainting = false;
let lineWidth = 5; //can be changed via input field for lineWidth

//STARTING COORD OF THE USER'S DRAWING/STROKE
let strokeColor;
let startX;
let startY; //let is for changing variables, const is for fixed!

ctx.strokeStyle = "#873512";

//if toolbar is clicked & the corr id is engaged with in a <param1> manner...
toolbar.addEventListener('click', e => {
    if(e.target.id === 'clear'){
        ctx.clearRect(0,0,canvas.width, canvas.height);
    }
});

toolbar.addEventListener('change', e => {
    if(e.target.id === 'stroke'){
        strokeColor = e.target.value;
        ctx.strokeStyle = strokeColor;
        
    }

    else if(e.target.id === 'lineWidth'){
        lineWidth = e.target.value;
    }
});

//DRAWING FUNCS
const draw = e => {
     if (!isPainting) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
}

document.addEventListener('DOMContentLoaded', () => {
        const follower = document.getElementById('follower');

        canvas.addEventListener('mousemove', (event) => {
            
            const x = event.clientX;
            const y = event.clientY;

            follower.style.opacity = 1;
            follower.style.left = `${x}px`;
            follower.style.top = `${y}px`;
            // follower.style.backgroundColor = strokeColor;
        });
    });


canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
    isPainting = true;

    ctx.beginPath(); // ensure path starts here
    ctx.moveTo(startX, startY);

});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke(); // colors the line drawn
    ctx.beginPath(); //starts a new path/resets start? for the next stroke : ) otherwise, would be chained
});

canvas.addEventListener('mousemove', draw); 

canvas.addEventListener('mouseleave', () => {
    follower.style.opacity = 0;
});







