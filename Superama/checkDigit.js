upc = "0750105590932";
// console.log(upc.length);
for (var i = 0; i < upc.length; i++) {
    if (upc.charAt(i) != '0') {
        upc_format = upc.substring(i);
        break;
    }
}
// console.log(upc_format);
if (upc_format.substring(0,3) == "750") {
  if (upc_format.length == 12) {

    var sumar = 0;
    var sumar2 = 0;
    for (var i = 0; i < upc_format.length; i=i+2 ) {

          nones = upc_format[i];
          sumar = parseInt(nones) + sumar;
          // console.log(nones);
    }
    // console.log("sumar: "+sumar);
    for (var j =1; j < upc_format.length; j=j+2) {
      pares = upc_format[j];
      multi = pares*3;
      sumar2 = parseInt(multi) + sumar2;
      // console.log(pares);
    }
    // console.log("sumar2: "+sumar2);

    total = sumar+sumar2;
    round = (total+10)-(total%10);
    digit = round-total;
    // console.log(digit);
    if (digit == 0) {
      console.log(upc)
    }else{
      console.log(upc_format+digit);
    }
  }
  else{
    console.log(upc_format);
  }
}else{
  console.log(upc_format);
}
