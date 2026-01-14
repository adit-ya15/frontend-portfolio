// No require needed for Node 18+
async function check() {
    try {
        const res = await fetch('http://localhost:3000/api/technologies');
        const data = await res.json();
        data.forEach(group => {
            console.log(`Title: "${group.title}"`);
            console.log('Codes:', group.title.split('').map(c => c.charCodeAt(0)));
        });
    } catch (e) {
        console.error(e);
    }
}

check();
