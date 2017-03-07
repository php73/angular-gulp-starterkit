function versionCompare(v1, v2, options) {
    var v1parts = v1.split(/[.-]/);
    var v2parts = v2.split(/[.-]/);

    function compareParts(v1parts, v2parts, options) {
        var zeroExtend = options && options.zeroExtend;

        if (zeroExtend) {
            while (v1parts.length < v2parts.length) v1parts.push("0");
            while (v2parts.length < v1parts.length) v2parts.push("0");
        }

        for (var i = 0; i < v1parts.length; ++i) {
            if (v2parts.length == i) {
                return 1;
            }

            var v1part = parseInt(v1parts[i]);
            var v2part = parseInt(v2parts[i]);
            // (NaN == NaN) -> false
            var v1part_is_string = !(v1part == v1part);
            var v2part_is_string = !(v2part == v2part);
            v1part = v1part_is_string ? v1parts[i] : v1part;
            v2part = v2part_is_string ? v2parts[i] : v2part;

            if (v1part_is_string == v2part_is_string) {
                if (v1part_is_string == false) {
                    // integer compare
                    if (v1part == v2part) {
                        continue;
                    } else if (v1part > v2part) {
                        return 1;
                    } else {
                        return -1;
                    }
                } else {
                    // letters and numbers in string
                    // split letters and numbers
                    var v1subparts = v1part.match(/[a-zA-Z]+|[0-9]+/g);
                    var v2subparts = v2part.match(/[a-zA-Z]+|[0-9]+/g);
                    if ( (v1subparts.length == 1) && (v2subparts.length == 1) ) {
                        // only letters in string
                        v1part = v1subparts[0];
                        v2part = v2subparts[0];
                        if (v1part == v2part) {
                            continue;
                        } else if (v1part > v2part) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                    var result = compareParts(v1subparts, v2subparts);
                    if (result == 0) {
                        continue;
                    } else {
                        return result;
                    }
                }
            } else {
                return v2part_is_string ? 1 : -1;
            }
        }

        if (v1parts.length != v2parts.length) {
            return -1;
        }

        return 0;
    }

    return compareParts(v1parts, v2parts, options);
}

module.exports = versionCompare;