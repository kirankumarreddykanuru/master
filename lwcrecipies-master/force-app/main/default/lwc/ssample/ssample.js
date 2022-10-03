const simpleInt = (principal, rate, interest) =>{
    if(principal && rate && interest){
        const si = (principal * rate * interest)/100;
        return si;
    }
    return 0;
}
export { simpleInt }