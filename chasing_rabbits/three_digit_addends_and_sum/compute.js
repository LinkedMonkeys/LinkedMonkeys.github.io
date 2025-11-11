(function() {
    'use strict';

    window.addEventListener('load', init);

    var worker = new Worker('worker_helper.js');

    function init() {
        var compute = id('compute');
        compute.addEventListener('click', doComputation);
    }

    // Main code to kick off the function to listAll d-digit numbers that
    // satisfy the product property.
    function doComputation() {
        var baseInput = id('base');
        var base = parseInt(baseInput.value);
    
        // var button = id('compute');
        //listAll(base, numDigits, multiple);
        
        // Leaving this as a JSON in case of future additional parameters.
        worker.postMessage(JSON.stringify(base));
    }

    worker.onmessage = function(message) {
        // Put 'START:[base, numDigits, multiple]' on results.
        var [status, info] = message.data.split(':');
        switch (status) {
            case 'START':
                    var results = id('results');
                    var [base, addend1Length, addend2Length, sumLength] = JSON.parse(info);
                    
                    // Clear the progress window.
                    var progress = id('progress');
                    progress.textContent = '';
                    progress.textContent += `Looking for a(n) ${addend1Length} digit value + a(n) ${addend2Length} digit value = ${sumLength} digit value in base ${base}.\n`;

                    break;
        }
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