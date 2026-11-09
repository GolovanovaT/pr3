class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
        this.elImg = document.getElementById(`img-${name}`); 
    }
}

class Pokemon extends Selectors {
    constructor({ name, hp, type, selectors, img, attacks = [] }) {
        super(selectors);
        this.name = name;
        this.hp = {
            current: hp,
            total: hp,
        };
        this.type = type;
        this.img = img;
        this.attacks = attacks;

        if (this.elImg) {
            this.elImg.src = this.img;
        }
        
        this.renderHP();
    }

    renderHP = () => {
        this.renderHPLife();
        this.renderProgressbarHP();
    };

    renderHPLife = () => {
        const { elHP, hp: { current, total } } = this;
        elHP.innerText = `${current} / ${total}`;
    };

    renderProgressbarHP = () => {
        const { hp: { current, total }, elProgressbar } = this;
        const percent = (current / total) * 100;
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
    };

    changeHP = (count, cb) => {
        this.hp.current -= count;

        if (this.hp.current <= 0) {
            this.hp.current = 0;
            alert(`Бідний ${this.name} програв бій!`);
            
            const allButtons = document.querySelectorAll('.control .button');
            allButtons.forEach($item => $item.remove());
        }

        this.renderHP();

        if (typeof cb === 'function') {
            cb.call(this, count);
        }
    };
}

export default Pokemon;