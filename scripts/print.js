const cvFiles = {
    standard: 'structures/standard.html',
    short: 'structures/short.html',
    europass: 'structures/europass.html'
};

async function printCV(type) {
    document.body.classList.remove('print-standard', 'print-short', 'print-europass');
    document.body.classList.add(`print-${type}`);

    const response = await fetch(cvFiles[type]);
    const html = await response.text();

    let temp = document.getElementById('print-temp');
    if (!temp) {
        temp = document.createElement('div');
        temp.id = 'print-temp';
        document.body.appendChild(temp);
    }

    temp.innerHTML = html;

    window.print();
}

window.printCV = printCV;

// Sticky section titles
const observerOptions = {
    root: null,
    rootMargin: '-10px 0px 0px 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const title = entry.target.querySelector('.web-section-title');
        if (title && !entry.isIntersecting) {
            title.classList.add('sticky');
        } else if (title) {
            title.classList.remove('sticky');
        }
    });
}, observerOptions);

document.querySelectorAll('.web-section').forEach(section => {
    observer.observe(section);
});