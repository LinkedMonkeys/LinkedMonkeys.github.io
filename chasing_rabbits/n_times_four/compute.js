(function() {
    'use strict';

    window.addEventListener('load', init);

    function init() {
        var compute = id('compute');
        compute.addEventListener('click', doComputation);
        
        
        // console.log(numberToString(multBy4([3, 5, 5, 5], 16), 40));
        // console.log(numberToString(multBy4([15, 15, 15, 15], 16), 16));
        // var test = [15, 15, 15, 15];
        // add1(test, 16);
        // console.log(numberToString(test, 16));
    }

    function doComputation() {
        var baseInput = id('base');
        var numDigitsInput = id('num-digits');
        var multipleInput = id('multiple');

        var base = parseInt(baseInput.value);
        var numDigits = parseInt(numDigitsInput.value);
        var multiple = parseInt(multipleInput.value);
        listAll(base, numDigits, multiple);
        console.log('Done');
    }

    // Find all four digit numbers with a radix of base where the 
    // reversed version is 4*the number.
    function listAll(base, numDigits, multiple) {
        var results = id('results');
        results.textContent += `Computing results for base ${base}, ${numDigits} digits, with a multiple of ${multiple}.\n`;
        var numberList = [];
        for (let i=0; i<numDigits-1; i++) {
            numberList.push(0);
        }
        numberList.push(1);
        
        while (numberList.length <= numDigits) {
            var numberBy4 = multBy4(numberList, base);
            if (check(numberList, numberBy4)) {
                console.log(numberToString(numberList, base));
                results.textContent += numberToString(numberList, base) + '\n';
            }
            add1(numberList, base);
        }
        results.textContent += 'Done.\n\n';
    }

    function check(numberList, numberBy4) {
        if (numberList.length != numberBy4.length) {
            return false;
        } else  {
            for (let i=0; i<numberList.length; i++) {
                if (numberList[i] != numberBy4[numberBy4.length-i-1]) {
                    return false;
                }
            }
        }

        return true;
    }

    // Compute the reversed version of the number in the given base.
    function reverse(number, base) {
        var reversed = 0;
        while (number > 0) {
            reversed = reversed*10 + number%10;
            number = Math.floor(number/10);

            // console.log(`${reversed}:${number}`)
        }

        return reversed;
    }

    // Modifies the current digitList!
    function add1(digitList, base) {
        var carry = 1; // Cheaty way to get it done.
        for (let i=0; i<digitList.length; i++) {
            let temp = digitList[i] + carry;
            digitList[i] = Math.floor(temp % base);
            carry = Math.floor(temp/base);
        }

        if (carry > 0) {
            digitList.push(carry);
        }
    }

    // Multiplies the digitList, representing a multidigit number in base, by 4.
    function multBy4(digitList, base) {
        let result = [];
        let carry = 0;
        for (var i=0; i<digitList.length; i++) {
            var temp = digitList[i]*4 + carry;
            result[i] = Math.floor(temp % base);
            carry = Math.floor(temp / base);
        }

        if (carry > 0) {
            result.push(carry);
        }

        return result;
    }

    function numberToString(digitList, base) {
        let stringResult = "";
        let digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i=digitList.length-1; i>=0; i--) {
            if (base <= 36) {
                stringResult += digits[digitList[i]];
            } else {
                stringResult += digitList[i] + ' ';
            }
        }

        return stringResult;
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