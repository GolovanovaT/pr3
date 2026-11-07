const $btn = document.getElementById('btn-kick');
const $btn2 = document.getElementById('btn-kick-2');

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
};

function init() {
    console.log('Start Game!');
    renderHP(character);
    renderHP(enemy);
}

function renderHP(person) {
    renderHPLife(person);
    renderProgressbarHP(person);
}

function renderHPLife(person) {
    person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
}

function renderProgressbarHP(person) {
    const percent = (person.damageHP / person.defaultHP) * 100;
    person.elProgressbar.style.width = percent + '%';

    if (percent < 60 && percent > 20) {
        person.elProgressbar.style.backgroundColor = 'yellow';
    } else if (percent <= 20) {
        person.elProgressbar.style.backgroundColor = 'red';
    } else {
        person.elProgressbar.style.backgroundColor = 'green';
    }
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

function changeHP(count, person) {
    if (person.damageHP < count) {
        person.damageHP = 0;
        alert('Бідний ' + person.name + ' програв бій!');
        $btn.disabled = true;
        if ($btn2) $btn2.disabled = true;
    } else {
        person.damageHP -= count;
    }

    renderHP(person);
}

$btn.addEventListener('click', function () {
    console.log('Kick!');
    changeHP(random(20), character);
    changeHP(random(20), enemy);
});

if ($btn2) {
    $btn2.addEventListener('click', function () {
        console.log('Heavy Kick!');
        changeHP(random(35), character);
        changeHP(random(35), enemy);
    });
}

init();