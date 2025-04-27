document.getElementById('btn').addEventListener('click', () => {
    let searchDate = document.getElementById('date').value;
    let showModel = document.getElementById('showModel');

    fetch("https://api.rootnet.in/covid19-in/stats/history")
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            let singleRec = res.data.find((rec) => rec.day === searchDate);
            if (!singleRec) {
                alert('No data available for the selected date. Please select a valid date.');
                showModel.innerHTML = '';
                return;
            }

            showModel.innerHTML = '';
            singleRec.regional.forEach(rec => {
                let card = document.createElement('div');
                card.className = 'card';

                let randomColor = getRandomColor();
                card.style.background = `linear-gradient(to bottom, ${randomColor.light}, ${randomColor.dark})`;
                card.style.borderTop = `5px solid ${randomColor.dark}`;

                card.innerHTML = `
                    <h3>${rec.loc}</h3>
                    <p><strong>Confirmed Cases:</strong> ${rec.totalConfirmed}</p>
                    <p><strong>Deaths:</strong> ${rec.deaths}</p>
                    <p><strong>Recovered:</strong> ${rec.discharged}</p>
                `;
                showModel.appendChild(card);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error fetching data. Please try again later.');
        });
});

function getRandomColor() {
    const colors = [
        { light: '#96e686', dark: '#3ebd25' },
        { light: '#ec7f7f', dark: '#b91e1e' },
        { light: '#7462db', dark: '#220e96' },
        { light: '#dba35f', dark: '#854c07' },
        { light: '#6d9be5', dark: '#355993' },
        { light: '#d078d0', dark: '#630963' },
        { light: '#e5e97b', dark: '#afb418' },
        { light: '#68adb4', dark: '#097682' },
        { light: '#b2537f', dark: '#860c45' },
        { light: '#a4e28f', dark: '#5ac934' },
        { light: '#7c89d2', dark: '#0a1d8a' }
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}


