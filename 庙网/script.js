

var images = ['images/1.jpg', 'images/2.jpg', 'images/3.jpg', 'images/4.jpg'];
var hoverImages = ['images/1-hover.jpg', 'images/2-hover.jpg', 'images/3-hover.jpg', 'images/4-hover.jpg'];
var currentIndex = 0;
var finished = false;
var clickSound1 = new Audio('sounds/click-sound-1.mp3');
var clickSound2 = new Audio('sounds/click-sound-2.mp3');
var clicksound3 = new Audio('sounds/click-sound-3.mp3');
var clickSound4 = new Audio('sounds/click-sound-4.mp3');
var clickSound5 = new Audio('sounds/click-sound-5.mp3');
var clickSound6 = new Audio('sounds/click-sound-6.mp3');
var isClickDisabled = false;
var backgroundMusic = document.getElementById('background-music');
var isbackgroundMusicPlaying = false;
var isClickSound1Playing = false;
var isUpdating = false;

// 当鼠标悬停时更换图片
function changeImage(element, newSrc) {
element.src = newSrc;
}

// 当鼠标移开时重置为原始图片
function resetImage(element, originalSrc) { 
    element.src = originalSrc;
}

function incrementAndDisplayCount() {
    
    if (isUpdating) {
        return;
    }
    
    isUpdating = true;

    var countElement = document.getElementById('b2-count');
    var clickCount = (parseInt(localStorage.getItem('b2ClickCount')) || 0) + 1;

    setInterval(function() {
    localStorage.setItem('b2ClickCount',clickCount);


    countElement.style.opacity = 0; // 初始化透明度为0

    setTimeout(function () {

        countElement.innerHTML ='第' + clickCount + ' 个人';
        countElement.style.display = 'block';
        setTimeout(function () {
            countElement.style.opacity = 1; // 渐变显示
            
            setTimeout(function () {

            },1000);
        }, 50); // 延迟确保显示元素后才开始渐变
    }, 100); // 透明度变化延迟
},1500);
}

    

function hideB2Countainer() {
    var b2Container = document.getElementById('b2-container');
    b2Container.classList,remove('active');
}

function handleClick() {
    if (isClickDisabled || isClickSound1Playing) return;

    isClickDisabled = true;
    isClickSound1Playing = true;

    playClickSound('click-sound-1');

    clickSound1.onended = function () {
        isClickSound1Playing = false;
        isClickDisabled = false;
    };

    if (!isbackgroundMusicPlaying) {
        playbackgroundMusic();
    }

    clickSound1.play().catch(function(error) {
        console.error('音效播放失败',error);
        isClickDisabled = false;
        isClickSound1Playing = false;
    });


    setTimeout(function () {
        var imgElement = document.querySelectorAll('.button-img');
        var countElement = document.getElementById('count');
        var clickCount = (parseInt(localStorage.getItem('clickCount')) || 0) + 1;

        var clickedImgSrc = event.target.src;
        var imgFileName = clickedImgSrc.split('/').pop();



        if ((imgFileName === '1.jpg'  || imgFileName === '1-hover.jpg')&& !isbackgroundMusicPlaying) {
            playbackgroundMusic();
        }
        
        clickSound1.play();
        
        if (currentIndex < images.length - 1) {
            currentIndex++;
            imgElement.forEach(imgElement => imgElement.src = images[currentIndex]);

            if (currentIndex === 1) {
                document.querySelector('.button-container').style.display = 'flex';
            }

            countElement.style.display = 'none';
        } else {
            finished = true;
            localStorage.setItem('clickCount', clickCount);
            gradualCountDisplay(clickCount);
        }

        isClickDisabled = false;
    }, 1500);
}

function playbackgroundMusic() {
    var backgroundMusic = document.getElementById('background-music')
    if (isbackgroundMusicPlaying) return;

    backgroundMusic.play().then(function() {
        isbackgroundMusicPlaying = true;
    }).catch(function(error) {
        console.log('播放背景音乐', error);
    });
    
}

function playClickSound(type) {
    if (type === 'click-sound-3') {
       clicksound3.play();
        }
        } 

function playClickSound(type) {
    if (type === 'click-sound-1') {
        if (isClickSound1Playing) return; // 如果sound-1正在播放，返回

        isClickSound1Playing = true;
        clickSound1.play().then(function() {
            isClickSound1.onended = function() {
            isClickSound1Playing = false;
            };
        }).catch(function(error) {
            isClickSound1Playing = false;
            console.log('播放click-sound-1', error);
        });
    } else if (type === 'click-sound-2') {
        if (!isClickSound1Playing) { // sound-1未播放时才播放其他音效
            clickSound2.play();
        }
    } else if (type === 'click-sound-3') {
        if (!isClickSound1Playing) { // sound-1未播放时才播放其他音效
            clicksound3.play(); 
        }
    } else if (type === 'click-sound-4') {
        clickSound4.play();
    } else if (type === 'click-sound-5') {
        clickSound5.play();
    } else if (type === 'click-sound-6') {
        clickSound6.play();
    }
}

function handleMouseOver(button) {
    var imgElement = button.querySelector('.button-img');
    if (!imgElement) return;

    var imageName = imgElement.getAttribute('src').split('/').pop();
    var index = images.map(image => image.split('/').pop()).indexOf(imageName);

    if (index !== -1) {
    imgElement.src = hoverImages[index];
}
}

function handleMouseOut(button) {
    var imgElement = button.querySelector('.button-img');
    if (!imgElement) return;

    var imageName = imgElement.getAttribute('src').split('/').pop();
    var index = hoverImages.map(image => image.split('/').pop()).indexOf(imageName);

    if (index !== -1) {
    imgElement.src = images[index];
}
}


/* -------- 隐藏所有页面 -------- */
function hideAllPages() {
    document.getElementById('page-a').classList.add('hidden');
    document.getElementById('page-b').classList.add('hidden');
    document.getElementById('page-c').classList.add('hidden');
    document.getElementById('page-d').classList.add('hidden');
    document.getElementById('page-e').classList.add('hidden');
    document.getElementById('page-f').classList.add('hidden');
    document.getElementById('page-g').classList.add('hidden');
    document.getElementById('page-h').classList.add('hidden');
    document.getElementById('b2-container').classList.add('hidden'); // 确保B2页面返回时隐藏s
    document.getElementById('page-i').classList.add('hidden');
}
    

/* -------- 显示页面 -------- */
function showPageA() {
hideAllPages();
document.getElementById('page-a').classList.remove('hidden');
document.body.style.overflow = 'auto';
}

function showPageB() {
hideAllPages();
document.getElementById('page-b').classList.remove('hidden');
document.body.style.overflow = 'hidden';
}

function showPageC() {
hideAllPages();
document.getElementById('page-c').classList.remove('hidden');
}

function showPageD() {
hideAllPages();
document.getElementById('page-d').classList.remove('hidden');
document.body.style.overflow = 'hidden';
}

function showPageE() {
hideAllPages();
document.getElementById('page-e').classList.remove('hidden');
}

function showPageF() {
hideAllPages();
document.getElementById('page-f').classList.remove('hidden');
document.body.style.overflow = 'hidden';
}

function showPageI() {
hideAllPages(); // 隐藏所有页面
document.getElementById('page-i').classList.remove('hidden'); // 显示新页面
}



function showPageG() {
hideAllPages();
document.getElementById('page-g').classList.remove('hidden');
document.querySelector('.my-form').style.display = 'flex'; // 显示表单
document.body.style.overflow = 'hidden'; 
// document.getElementById('g-img').src = 'images/5.jpg'; // 设置为5.jpg
}

function showPageH() {
hideAllPages();
document.getElementById('page-h').classList.remove('hidden');
document.body.style.overflow = 'hidden';

displayNames();// 显示名字
}


/* -------- 功德榜 -------- */
/* 提交表单函数 */
document.getElementById('name-form').addEventListener('submit', function(event) {
    event.preventDefault();  // 阻止表单默认提交行为
    const nameInput = document.getElementById('name-input').value.trim();
    if (nameInput.length === 0) {
        alert('请输入名称或者选择匿名');
    } else {
        saveName(nameInput);  // 保存名称
        showPageH();  // 跳转到H页
    }
});

/* 匿名 */
function submitAnonymously() {
    saveName('匿名');
    showPageH();
}

//保存名字
function saveName(name) {
    let nameList = JSON.parse(localStorage.getItem('nameList')) || [];  // 从localStorage中获取已存储的名称数组
    nameList.push(name);  // 将新名称添加到数组
    localStorage.setItem('nameList', JSON.stringify(nameList));  // 更新localStorage中的数组
}


// 将存储的姓名列表显示在H页上
function displayNames() {
    const nameList = JSON.parse(localStorage.getItem('nameList')) || [];
    const nameListElement = document.getElementById('name-list');
    nameListElement.innerHTML = '';  // 清空列表

    nameList.forEach(function(name) {
        const li = document.createElement('li');
        li.textContent = '用户：' + name;
        nameListElement.appendChild(li);
    });
}

/* 
// 页面加载时，从localStorage中读取并显示H页的内容
window.addEventListener('load', function() {
    const nameList = JSON.parse(localStorage.getItem('nameList'));
    if (nameList && nameList.length > 0) {
        showPageH();  // 如果有存储的名称，直接显示H页
    }
});
 */


/* -------- 绘画页面 -------- */
function showPageB2() {
hideAllPages();
document.getElementById('b2-container').classList.remove('hidden');
document.body.style.overflow = 'hidden';
}

// 涂鸦功能代码
let canvas = document.getElementById('graffitiCanvas');
let ctx = canvas.getContext('2d');
let isDrawing = false;
let x = 0, y = 0;

// 初始化画布大小
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const savedDrawing = localStorage.getItem('graffitiDrawing');
    if (savedDrawing) {
        const img = new Image();
        img.src = savedDrawing;
        img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}

// 获取鼠标位置
function getMousePos(evt) {
    const rect = canvas.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
}

// 开始绘制
canvas.addEventListener('mousedown', (e) => {
    const pos = getMousePos(e);
    x = pos.x;
    y = pos.y;
    isDrawing = true;
});

// 绘制过程
canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        const pos = getMousePos(e);
        drawLine(x, y, pos.x, pos.y);
        x = pos.x;
        y = pos.y;
    }
});

// 停止绘制
canvas.addEventListener('mouseup', () => {
    if (isDrawing) {
        isDrawing = false;
        saveDrawing();
    }
});

// 画线函数
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2; //笔粗细
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

// 保存绘画内容到 localStorage
function saveDrawing() {
    const drawing = canvas.toDataURL();
    localStorage.setItem('graffitiDrawing', drawing);
}

// 清除画布内容
function clearGraffiti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    localStorage.removeItem('graffitiDrawing');
}

function clearGraffiti() {
const canvas = document.getElementById('graffitiCanvas');
const ctx = canvas.getContext('2d');

// 清除 localStorage 中的涂鸦数据
localStorage.removeItem('graffitiDrawing'); 

// 清除画布内容
ctx.clearRect(0, 0, canvas.width, canvas.height); 
}


// 页面加载完成后初始化
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);


function gradualCountDisplay(targetCount) {
    var countElement = document.getElementById('count');
    var currentCount = parseInt(localStorage.getItem('clickCount')) || 0;
    countElement.style.display = 'block';

    var interval = setInterval(function () {
        if (currentCount < targetCount) {
            currentCount += 1;
            countElement.innerHTML = currentCount + '次点击';
        } else {
            countElement.innerHTML = targetCount + '次点击';
            clearInterval(interval);
        }
        localStorage.setItem('clickCount', currentCount);
    }, 50);

    setTimeout(function () {
        countElement.classList.remove('animate');
    }, 1000);
}

window.onload = function() {
// 图片初始化
var imgElement = document.querySelectorAll('.button-img');
imgElement.forEach((imgElement, index) => {
imgElement.src = images[index];
});

// 点击次数的显示
if (localStorage.getItem('clickCount')) {
document.getElementById('count').innerHTML = localStorage.getItem('clickCount') + '次点击';
} else {
document.getElementById('count').style.display = 'none';
}

// 显示涂鸦
resizeCanvas();
const savedDrawing = localStorage.getItem('graffitiDrawing');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}




    