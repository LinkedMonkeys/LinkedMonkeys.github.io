(function() {
    'use strict';

    window.addEventListener('load', init);

    var worker = new Worker('worker_helper.js');

    function init() {
        var compute = id('compute');
        compute.addEventListener('click', doComputation);
        
        
        // console.log(numberToString(multBy4([3, 5, 5, 5], 16), 40));
        // console.log(numberToString(multBy4([15, 15, 15, 15], 16), 16));
        // var test = [15, 15, 15, 15];
        // add1(test, 16);
        // console.log(numberToString(test, 16));

        // console.log(numberToString(multBy([3, 5, 5, 5], 6, 4), 16));
        // console.log(numberToString(multBy([3, 5, 5, 5], 6, 5), 16));
    }

    // Main code to kick off the function to listAll d-digit numbers that
    // satisfy the product property.
    function doComputation() {
        var baseInput = id('base');
        var numDigitsInput = id('num-digits');
        var multipleInput = id('multiple');

        var base = parseInt(baseInput.value);
        var numDigits = parseInt(numDigitsInput.value);
        var multiple = parseInt(multipleInput.value);

        // var button = id('compute');
        //listAll(base, numDigits, multiple);
        worker.postMessage(JSON.stringify([base, numDigits, multiple]));
    }

    worker.onmessage = function(message) {
        // Put 'START:[base, numDigits, multiple]' on results.
        // Put 'FOUND:n' messages on results.
        // Put 'UPDATE:n' messages on progress.
        // Put 'DONE:' message on progress.
        var [status, info] = message.data.split(':');
        switch (status) {
            case 'START':
                var results = id('results');
                var [base, numDigits, multiple] = JSON.parse(info);
                results.textContent += `Searching ${numDigits} digit numbers in base ${base}, with a multiple of ${multiple}.\n`;

                // Clear the progress window.
                var progress = id('progress');
                progress.textContent = '';
                break;
            case 'FOUND':
                var results = id('results');
                results.textContent += `Found: ${info}\n`;
                break;
            case 'UPDATE':
                var progress = id('progress');
                progress.textContent = `Working on ${info}\n`;
                break;
            case 'DONE':
                var progress = id('progress');
                progress.textContent = `Done.  Stopped at ${info}.`;
                break;
        }

        // alert(`Response: ${message.data}`)
    }
    
    /////////////////////////////////////////////////////////////////////
    // Helper functions
    /**
    * Helper function to return the response's result text if successful, otherwise
    * returns the rejected Promise result with an error status and corresponding text
    * @param {object} res - response to check for success/error

    * @return {object} - valid response if response was successful, otherwise rejected
    *                    Promise result
    */
    async function statusCheck(res) {
        if (!res.ok) {
            throw new Error(await res.text());
        }
        return res;
    }

    function id(id) {
        return document.getElementById(id);
    }

    function qs(selector) {
        return document.querySelector(selector);
    }

    function qsa(selector) {
        return document.querySelectorAll(selector);
    }
})();