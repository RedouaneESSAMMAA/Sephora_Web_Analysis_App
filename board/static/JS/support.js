
document.addEventListener('DOMContentLoaded', function () {
    const supportBtn = document.getElementById('supportBtn');
    const supportPanel = document.getElementById('supportPanel');

    console.log('Support JS loaded:', !!supportBtn, !!supportPanel);

    if (!supportBtn || !supportPanel) {
        console.error('Support button or panel not found.');
        return;
    }

    supportBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        supportPanel.classList.toggle('active');
    });

    supportPanel.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    document.addEventListener('click', function () {
        supportPanel.classList.remove('active');
    });
});
