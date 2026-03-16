javascript:(function(){
    const scriptUrl = 'https://isiguzoflorence521-gif.github.io';
    fetch(scriptUrl)
        .then(response => {
            if (!response.ok) throw new Error('File not found at ' + scriptUrl);
            return response.text();
        })
        .then(code => {
            eval(code);
            console.log('BloxdVR successfully injected from /scripts/ folder.');
        })
        .catch(err => {
            console.warn('BloxdVR Load failed: ', err);
            // Fallback to root folder if scripts/ fails
            fetch('https://isiguzoflorence521-gif.github.io')
                .then(r => r.text())
                .then(eval);
        });
})();
