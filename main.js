const $btn = document.getElementById('btn-kick');
const $btn2 = document.getElementById('btn-kick-2');
const $logs = document.querySelector('#logs');

const logs = [
    '[ПЕРСОНАЖ №1] вспомнил что-то важное, но неожиданно [ПЕРСОНАЖ №2], не помня себя от испуга, ударил в предплечье врага.',
    '[ПЕРСОНАЖ №1] поперхнулся, и за это [ПЕРСОНАЖ №2] с испугу приложил прямой удар коленом в лоб врага.',
    '[ПЕРСОНАЖ №1] забылся, но в это время наглый [ПЕРСОНАЖ №2], приняв волевое решение, неслышно подойдя сзади, ударил.',
    '[ПЕРСОНАЖ №1] пришел в себя, но неожиданно [ПЕРСОНАЖ №2] случайно нанес мощнейший удар.',
    '[ПЕРСОНАЖ №1] поперхнулся, но в это время [ПЕРСОНАЖ №2] нехотя раздробил кулаком <вырезанно цензурой> противника.',
    '[ПЕРСОНАЖ №1] удивился, а [ПЕРСОНАЖ №2] пошатнувшись влепил подлый удар.',
    '[ПЕРСОНАЖ №1] высморкался, но неожиданно [ПЕРСОНАЖ №2] провел дробящий удар.',
    '[ПЕРСОНАЖ №1] пошатнулся, и внезапно наглый [ПЕРСОНАЖ №2] беспричинно ударил в ногу противника',
    '[ПЕРСОНАЖ №1] расстроился, как вдруг, неожиданно [ПЕРСОНАЖ №2] случайно влепил стопой в живот соперника.',
    '[ПЕРСОНАЖ №1] пытался что-то сказать, but вдруг, неожиданно [ПЕРСОНАЖ №2] со скуки, разбил бровь сопернику.'
];


function renderHP() {
    this.renderHPLife();
    this.renderProgressbarHP();
}

function renderHPLife() {
    const { damageHP, defaultHP, elHP } = this;
    elHP.innerText = `${damageHP} / ${defaultHP}`;
}

function renderProgressbarHP() {
    const { damageHP, defaultHP, elProgressbar } = this;
    const percent = (damageHP / defaultHP) * 100;
    elProgressbar.style.width = percent + '%';

    if (percent < 60 && percent > 20) {
        elProgressbar.classList.add('low');
        elProgressbar.classList.remove('critical');
    } else if (percent <= 20) {
        elProgressbar.classList.add('critical');
        elProgressbar.classList.remove('low');
    } else {
        elProgressbar.classList.remove('low', 'critical');
    }
}

function changeHP(count, cb) {
    this.damageHP -= count;

    if (this.damageHP <= 0) {
        this.damageHP = 0;
        alert(`Бідний ${this.name} програв бій!`);
        $btn.disabled = true;
        if ($btn2) $btn2.disabled = true;
    }

    this.renderHP();

    if (typeof cb === 'function') {
        cb.call(this, count);
    }
}


const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    renderHP,
    renderHPLife,
    renderProgressbarHP,
    changeHP,
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    renderHP,
    renderHPLife,
    renderProgressbarHP,
    changeHP,
};

const init = () => {
    console.log('Start Game!');
    character.renderHP();
    enemy.renderHP();
};

const random = (num) => Math.ceil(Math.random() * num);

const generateLog = (firstPerson, secondPerson, damage) => {
    const { name: firstName } = firstPerson;
    const { name: secondName } = secondPerson;
    
    const randomLogs = logs[random(logs.length) - 1];
    const log = randomLogs
        .replace('[ПЕРСОНАЖ №1]', firstName)
        .replace('[ПЕРСОНАЖ №2]', secondName);
    
    const damageInfo = `-${damage} [${secondPerson.damageHP}/${secondPerson.defaultHP}]`;
    const fullLogText = `${log} ${damageInfo}`;

    const $p = document.createElement('p');
    $p.innerText = fullLogText;
    $logs.insertBefore($p, $logs.children[0]);
};

const countClicks = (maxCount = 6, element) => {
    let clicks = maxCount; 

    const baseText = element.innerText;
    element.innerText = `${baseText} (${clicks})`;

    return () => {
        if (clicks > 0) {
            clicks--;
            console.log(`Кількість кліків, що залишилася для кнопки "${baseText}": ${clicks}`);
            
            if (clicks > 0) {
                element.innerText = `${baseText} (${clicks})`;
            } else {
                element.innerText = `${baseText} (0)`;
                element.disabled = true;
                console.log(`Кнопка "${baseText}" вичерпала ліміт натискань!`);
            }
        }
    };
};

const countBtnKick = countClicks(6, $btn);
const countBtnKick2 = countClicks(6, $btn2);

$btn.addEventListener('click', () => {
    console.log('Kick!');
    countBtnKick(); 
    
    const damagePikachu = random(20);
    const damageCharmander = random(20);

    character.changeHP(damageCharmander, function(count) {
        generateLog(this, enemy, count);
    });
    
    enemy.changeHP(damagePikachu, function(count) {
        generateLog(this, character, count);
    });
});

if ($btn2) {
    $btn2.addEventListener('click', () => {
        console.log('Heavy Punch!');
        countBtnKick2();
        
        const damagePikachu = random(35);
        const damageCharmander = random(35);

        character.changeHP(damageCharmander, function(count) {
            generateLog(this, enemy, count);
        });
        
        enemy.changeHP(damagePikachu, function(count) {
            generateLog(this, character, count);
        });
    });
}

init();