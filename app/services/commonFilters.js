/**
 * ucfirst filter function
 *
 * @method ucfirst
 * @param {string} input
 * @param {string} arg
 * @return {string} toUpperCase value.
 */
app.filter('ucfirst', function () {
    return function (input, arg) {
        return input.replace(/(?:^|\s)\S/g, function (a) {
            return a.toUpperCase();
        });
    };
});

/**
 * ucfirst filter function
 *
 * @method UTCToNow
 * @param {string} moment
 * @return {string} Formate
 */
app.filter('UTCToNow', ['moment', function (moment) {
        return function (input, format) {
            if (format)
            {
                return moment.utc(input).local().format(format);
            } else
            {
                return moment.utc(input).local();
            }
        };
    }]
        );
