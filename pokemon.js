class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor({ name, hp, type, selectors }) {
        super(selectors);
        this.name = name;
        this.hp = {
            current: hp,
            total: hp,
        };
        this.type = type;
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
            document.getElementById('btn-kick').disabled = true;
            const $btn2 = document.getElementById('btn-kick-2');
            if ($btn2) $btn2.disabled = true;
        }

        this.renderHP();

        if (typeof cb === 'function') {
            cb.call(this, count);
        }
    };
}

export default Pokemon;