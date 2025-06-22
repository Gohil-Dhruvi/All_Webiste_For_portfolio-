function add(m, n) {
    try {
        if (typeof m == "number" && typeof n == "number") {
            console.log(m + n);
        }
        else {
            throw new Error('Argument type is not number'); //manully
        }
    }catch(err){
        closed.log("Error is: ",err.massage)
    }finally{
        console.log('Finnaly Statement is Runned');
    }
}


add(12,"11")