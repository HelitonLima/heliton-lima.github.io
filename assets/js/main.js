class Timeline {
    _timeline;

    constructor() {
        this._timeline = document.querySelector('#timeline');
    }

    _createTimeline() {
        fetch('assets/js/data.json')
            .then(response => response.json())
            .then(data => {
                data.forEach((item, index) => {
                    const li = this._createTimelineItem(item.year, item.description, index);

                    this._timeline.querySelector('ul').appendChild(li);
                });

            })
            .catch(error => console.error('Error to load JSON:', error));
    }

    _createTimelineItem(year, description, index) {
        const li = document.createElement('li');
        li.classList.add('timeline-item');

        if (index % 2 !== 0) {
            li.classList.add('left');
        } else {
            li.classList.add('right');
        }

        const circle = document.createElement('div');
        circle.classList.add('circle');
        const content = document.createElement('div');
        content.classList.add('content');
        const h3 = document.createElement('h3');
        h3.innerText = year;
        const p = document.createElement('p');
        p.innerText = description;

        content.appendChild(h3);
        content.appendChild(p);
        li.appendChild(circle);
        li.appendChild(content);
        
        return li;
    }

    _checkScroll() {
        const rect = this._timeline.getBoundingClientRect();
        const line = this._timeline.querySelector('.line');
        const circles = this._timeline.querySelectorAll('.circle');
        const content = this._timeline.querySelectorAll('.content');
        const timeLineItems = this._timeline.querySelectorAll('.timeline-item');
        const title = this._timeline.querySelector('h2');

        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            title.classList.add('animate-fade-in');
            line.classList.add('animate-height-percentage');

            circles.forEach(circle => circle.classList.add(`animate-scale`));
            
            content.forEach((item, index) => {
                const position = timeLineItems[index].classList.contains('left') ? 'right-left' : 'left-right';
                
                item.classList.add('animate-fade-in');
                item.querySelector('h3').classList.add(`animate-${position}`);
                item.querySelector('p').classList.add(`animate-${position}`);
            });
        }
        
        if (rect.top > window.innerHeight || rect.bottom - 200 < 0) {
            title.classList.remove('animate-fade-in');
            line.classList.remove('animate-height-percentage');
            circles.forEach(circle => circle.classList.remove(`animate-scale`));

            content.forEach(item => {
                item.classList.remove('animate-fade-in');
                item.querySelector('h3').classList.remove('animate-right-left', 'animate-left-right');
                item.querySelector('p').classList.remove('animate-right-left', 'animate-left-right');
            });
        }
    }
}

class Projects {
    _projects;

    constructor() {
        this._projects = document.querySelector('#projects');
    }

    _checkScroll() {
        const rect = this._projects.getBoundingClientRect();
        const title = this._projects.querySelector('h2');

        title.style.animationDelay = '1.5s';
        title.style.transitionDelay = '1.5s';
        
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            title.classList.add('animate-fade-in');

            this._projects.classList.add('animate-background-move-down');
            this._projects.querySelector('.slides').classList.add('animate-scale');
            this._projects.querySelector('.pagination').classList.add('animate-fade-in');
            this._projects.querySelector('.buttons').classList.add('animate-fade-in');
        }

        if (rect.top > window.innerHeight || rect.bottom - 200 < 0) {
            title.classList.remove('animate-fade-in');

            this._projects.classList.remove('animate-background-move-down');
            this._projects.querySelector('.slides').classList.remove('animate-scale');
            this._projects.querySelector('.pagination').classList.remove('animate-fade-in');
            this._projects.querySelector('.buttons').classList.remove('animate-fade-in');
        }
    }
}

class Player {
    _page = 0;
    _pages = 0;

    constructor() {
        this._pages = projectsBanner.getElementsByClassName('slide').length;
    }

    _nextPage() {
        this._page == this._pages - 1 ? this._page = 0 : this._page++;

        this._setPage();
        this._changeSlide();
    }
    
    _prevPage() {
        this._page == 0 ? this._page = this._pages - 1 : this._page--;


        this._setPage();
        this._changeSlide();
    }

    _setPage() {
        const pages = projectsBanner.getElementsByClassName('page');

        this._removeAllActivesClasses(pages);

        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];

            if (i == this._page) {
                page.classList.add('active');
            }
        }
    }

    _removeAllActivesClasses(elements) {
        for (let el of elements) {
            el.classList.remove('active');
        }
    }

    _goToPage(index) {
        this._page = index;

        this._setPage();
        this._changeSlide();
    }

    _changeSlide() {
        const slides = projectsBanner.getElementsByClassName('slide');

        for (let slide of slides) {
            slide.style.transform = ` translateX(-${this._page}00%)`;
        }
    }
}

const player = new Player;
const timeline = new Timeline();
const projects = new Projects();

timeline._createTimeline();

function nextPage() { 
    player._nextPage();
}

function prevPage() { 
    player._prevPage();
}

function goToPage(index) {
    player._goToPage(index);
}

const pages = projectsBanner.getElementsByClassName('page');

for (let i = 0; i < pages.length; i++) {
    const page = pages[i];

    page.onclick = () => goToPage(i);
}

document.addEventListener('DOMContentLoaded', function() {
    const checkScroll = () => {
        timeline._checkScroll();
        projects._checkScroll();
    };

    window.addEventListener('scroll', checkScroll);

    checkScroll();
});