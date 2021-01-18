export const textFormat = (str, maxLength = 0) => {
    if(!maxLength || str.length <= maxLength){
        return str;
    }
    return str.slice(0, maxLength)+'...';
    };
