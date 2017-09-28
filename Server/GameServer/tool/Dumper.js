module.exports = function mydump(arr,level) {
    let dumped_text = "";
    if(!level) level = 0;

    let level_padding = "";
    for(let j=0;j<level+1;j++) level_padding += "    ";

    if(typeof(arr) == 'object') {  
        for(let item in arr) {
            let value = arr[item];

            if(typeof(value) == 'object') { 
                dumped_text += level_padding + "'" + item + "' ...\n";
                dumped_text += mydump(value,level+1);
            } 
            else {
                if (typeof(value) != 'function')
                    dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
                else
                    dumped_text += level_padding + "[func] '" + item + "' => \"" + value + "\"\n";
            }
        }
    } else { 
        dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
    }
    return dumped_text;
};