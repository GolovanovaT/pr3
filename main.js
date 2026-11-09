import Pokemon from './pokemon.js';
import { random, logs } from './logs.js';

const $btn = document.getElementById('btn-kick');
const $btn2 = document.getElementById('btn-kick-2');
const $logs = document.querySelector('#logs');

const player1 = new Pokemon({
    name: 'Pikachu',
    hp: 100,
    type: 'electric',
    selectors: 'character',
});

const player2 = new Pokemon({
    name: 'Charmander',
    hp: 100,
    type: 'fire',
    selectors: 'enemy',
});

const generateLog = (firstPerson, secondPerson, damage) => {
    const { name: firstName } = firstPerson;
    const { name: secondName } = secondPerson;
    
    const randomLogs = logs[random(logs.length) - 1];
    const log = randomLogs
        .replace('[ПЕРСОНАЖ №1]', firstName)
        .replace('[ПЕРСОНАЖ №2]', secondName);
    
    const damageInfo = `-${damage} [${secondPerson.hp.current}/${secondPerson.hp.total}]`;
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
            console.log(`Кількість кліків, що залишилася для "${baseText}": ${clicks}`);
            
            if (clicks > 0) {
                element.innerText = `${baseText} (${clicks})`;
            } else {
                element.innerText = `${baseText} (0)`;
                element.disabled = true;
            }
        }
    };
};

const countBtnKick = countClicks(6, $btn);
const countBtnKick2 = countClicks(6, $btn2);

$btn.addEventListener('click', () => {
    countBtnKick();
    
    const damagePikachu = random(20);
    const damageCharmander = random(20);

    player1.changeHP(damageCharmander, function(count) {
        generateLog(this, player2, count);
    });
    
    player2.changeHP(damagePikachu, function(count) {
        generateLog(this, player1, count);
    });
});

if ($btn2) {
    $btn2.addEventListener('click', () => {
        countBtnKick2();
        
        const damagePikachu = random(35);
        const damageCharmander = random(35);

        player1.changeHP(damageCharmander, function(count) {
            generateLog(this, player2, count);
        });
        
        player2.changeHP(damagePikachu, function(count) {
            generateLog(this, player1, count);
        });
    });
}