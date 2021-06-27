 
 
 // convert hex to rgba
 export const hexToRgbA = (hex,opacity) => {
    let c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+`,${opacity})`;
    }
    return 'rgba(0,0,0,0.2)'
}


export const secondsToDhms = (seconds,dhms) => {
    seconds = Number(seconds);
    let d = Math.floor(seconds / (3600*24));
    let h = Math.floor(seconds % (3600*24) / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 60);
    let dDisplay = d>0 ? d + "d " : "";
    let hDisplay = h>0 ? h + "h ": "";
    let mDisplay = m>0 ? m + "min ": "";
    let sDisplay = s>0 ? s + "s": "";
    if(dhms==="dhms"){
    return dDisplay + hDisplay + mDisplay + sDisplay;
    } else if (dhms==="dhm"){
        return dDisplay + hDisplay + mDisplay;
    }
    }


    export const showMoreLessBtn = (refElement, extraClassName) => {
return (
    setTimeout(() => {
        if(refElement.current){
        if(refElement.current.firstElementChild.offsetHeight > "350"){
          refElement.current.firstElementChild.style.height = '250px';
          refElement.current.firstElementChild.style.overflow = 'hidden';
          refElement.current.firstElementChild.style.position = "relative";
          const showMoreBtn = document.createElement('button');
          showMoreBtn.className = extraClassName;
          showMoreBtn.textContent = "Show More";
          refElement.current.firstElementChild.lastElementChild.after(showMoreBtn);
      
          showMoreBtn.addEventListener('click', ()=>{
            showMoreBtn.style.display = "none";
            refElement.current.firstElementChild.style.height = '100%';
          });
        }
    }
      }, 100)
);
    }


    export const unKnownPng = "https://png.pngitem.com/pimgs/s/52-526033_unknown-person-icon-png-transparent-png.png";