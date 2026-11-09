import Pokemon from './pokemon.js';
import { random, logs } from './logs.js';
import { pokemons } from './pokemons.js';

const $logs = document.querySelector('#logs');
const $control = document.querySelector('.control');

let currentIndex = 0; 

let player1 = new Pokemon({
    ...pokemons[0], 
    selectors: 'character',
});

let player2;
let currentEnemyIndex = 1;

const initEnemy = (index) => {
    const enemyData = pokemons[index];
    
    player2 = new Pokemon({
        ...enemyData,
        selectors: 'enemy',
    });

    document.getElementById('name-enemy').innerText = player2.name;
    document.getElementById('img-enemy').src = player2.img;
};

initEnemy(currentEnemyIndex);

document.getElementById('name-character').innerText = player1.name;
document.getElementById('img-character').src = player1.img;

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

const renderButtons = () => {
    const allButtons = document.querySelectorAll('.control .button');
    allButtons.forEach($item => $item.remove());

    player1.attacks.forEach(item => {
        const $btn = document.createElement('button');
        $btn.classList.add('button');
        $btn.innerText = `${item.name} (${item.maxCount})`;
        
        let inner = item.maxCount;

        $btn.addEventListener('click', () => {
            inner--;
            if (inner === 0) {
                $btn.disabled = true;
            }
            $btn.innerText = `${item.name} (${inner})`;
            
            const damagePlayer1 = random(item.maxDamage - item.minDamage) + item.minDamage;
            const enemyAttack = player2.attacks[0];
            const damagePlayer2 = random(enemyAttack.maxDamage - enemyAttack.minDamage) + enemyAttack.minDamage;

            player1.changeHP(damagePlayer2, function(count) {
                generateLog(this, player2, count);
            });
            
            player2.changeHP(damagePlayer1, function(count) {
                generateLog(this, player1, count);

                if (player2.hp.current === 0) {
                    alert(`Ви перемогли ${player2.name}! Наступний бій!`);
                    
                    currentEnemyIndex++; 
                    
                    if (currentEnemyIndex >= pokemons.length) {
                        alert('Вітаю! Ви пройшли всіх покемонів!');
                        currentEnemyIndex = 0; 
                    }

                    initEnemy(currentEnemyIndex);
                    renderButtons();
                }
            });
        });

        $control.appendChild($btn);
    });
};

renderButtons();