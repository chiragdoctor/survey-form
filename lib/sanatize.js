function sanatize(data, matcher) {
    let info = [];
    const entries = data.toString().trim().split('\n');
    if (matcher) {
        const entry = entries.filter(e => e.indexOf(matcher) >= 0);
        info = entry[0].split(';');
        info = info.map(i => {
            const [label, field] = i.split(':');
            return `<p><label>${label}</label>: <b>${field}</b></p>`
        });
        return info.join('');
    } else {
        // info = entries.map(e => e.split(';'))
        // // console.log('info', info);
        info = entries.map(entry => {
            e = entry.split(';');
            e = e.map(i => {
                const [label, field] = i.split(':');
                return `<p><label>${label}</label>: <b>${field}</b></p>`
            });
            return e.join('');
        });
        console.log('info', info);
        return info.join('<hr />');
    }

}

module.exports = sanatize;