(function() {
    'use strict';

    window.addEventListener('load', init);

    function init() {
        let yesButton = id("yes");
        let noButton = id("no");

        yesButton.addEventListener('click', yes);
        noButton.addEventListener('click', no);
    }

    function clearStuff() {
        
    }

    function yes() {
        let body = qs('body');
        body.classList.add('yes');
        let title = id('title');
        title.textContent = 'ACCESS DENIED!!';
    }

    function no() {
        alert('Welcome.')
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