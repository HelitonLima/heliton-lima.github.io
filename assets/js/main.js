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
        document.querySelectorAll('section').forEach(section => {
            const rect = section.getBoundingClientRect();
        
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                section.classList.add('animate');
            }

            if (rect.top > window.innerHeight - 200 || rect.bottom - 200 < 0) {
                section.classList.remove('animate');
            }
        })
    };

    window.addEventListener('scroll', checkScroll);

    checkScroll();
});