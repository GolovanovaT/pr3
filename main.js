const $btn = document.getElementById('btn-kick');
const $btn2 = document.getElementById('btn-kick-2');

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),

    renderHP: function() {
        this.renderHPLife();
        this.renderProgressbarHP();
    },
    
    renderHPLife: function() {
        this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
    },
    
    renderProgressbarHP: function() {
        const percent = (this.damageHP / this.defaultHP) * 100;
        this.elProgressbar.style.width = percent + '%';

        if (percent < 60 && percent > 20) {
            this.elProgressbar.classList.add('low');
            this.elProgressbar.classList.remove('critical');
        } else if (percent <= 20) {
            this.elProgressbar.classList.add('critical');
            this.elProgressbar.classList.remove('low');
        } else {
            this.elProgressbar.classList.remove('low', 'critical');
        }
    },

    changeHP: function(count) {
        if (this.damageHP < count) {
            this.damageHP = 0;
            alert('Бідний ' + this.name + ' проиграл бой!');
            $btn.disabled = true;
            if ($btn2) $btn2.disabled = true;
        } else {
            this.damageHP -= count;
        }
        this.renderHP();
    }
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    
    renderHP: function() {
        this.renderHPLife();
        this.renderProgressbarHP();
    },
    
    renderHPLife: function() {
        this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
    },
    
    renderProgressbarHP: function() {
        const percent = (this.damageHP / this.defaultHP) * 100;
        this.elProgressbar.style.width = percent + '%';

        if (percent < 60 && percent > 20) {
            this.elProgressbar.classList.add('low');
            this.elProgressbar.classList.remove('critical');
        } else if (percent <= 20) {
            this.elProgressbar.classList.add('critical');
            this.elProgressbar.classList.remove('low');
        } else {
            this.elProgressbar.classList.remove('low', 'critical');
        }
    },

    changeHP: function(count) {
        if (this.damageHP < count) {
            this.damageHP = 0;
            alert('Бідний ' + this.name + ' проиграл бой!');
            $btn.disabled = true;
            if ($btn2) $btn2.disabled = true;
        } else {
            this.damageHP -= count;
        }
        this.renderHP();
    }
};

function init() {
    console.log('Start Game!');
    character.renderHP();
    enemy.renderHP();
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

$btn.addEventListener('click', function () {
    console.log('Kick!');
    character.changeHP(random(20));
    enemy.changeHP(random(20));
});

if ($btn2) {
    $btn2.addEventListener('click', function () {
        console.log('Heavy Kick!');
        character.changeHP(random(35));
        enemy.changeHP(random(35));
    });
}

init();