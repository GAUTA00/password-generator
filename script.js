const inputSlider=document.querySelector("[data-lengthslider]");
console.log(inputSlider); 
const lengthDisplay=document.querySelector("[data-lengthNumber]"); 
console.log(lengthDisplay);

const passwordDisplay=document.querySelector("[data-passwordDisplay]");
console.log(passwordDisplay);

const copyBtn=document.querySelector("[data-copy]");
console.log(copyBtn);

const copyMsg=document.querySelector("[data-copyMsg]");
console.log(copyMsg);

const upperCase=document.querySelector("#uppercase");
console.log(upperCase);

const lowerCase=document.querySelector("#lowercase");
console.log(lowerCase);

const numberCheck=document.querySelector("#numbers");
console.log(numberCheck);

const symbolCheck=document.querySelector("#symbols");
console.log(symbolCheck);

const indicator=document.querySelector("[data-indicator]");
console.log(indicator);

const generateBtn=document.querySelector(".generateButton");
console.log(generateBtn);

const allCheckboxes=document.querySelectorAll("input[type=checkbox]");
console.log(allCheckboxes);  


let password="";
let passwordLength=10;
let checkCount=1;
handleSliderChange();
// Set strength color to grey.
 setIndicatorColor("#ccc")
function handleSliderChange(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;

    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"% 100%"


    
}

function setIndicatorColor(color){
        indicator.style.backgroundColor=color;
        //shadow
        indicator.style.boxShadow=`0 0 10px ${color}`;

}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,122));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,90));
}

function generateSymbol(){
    const symbols="!@#$%^&*(){}[]=<>/,.";
    return symbols[getRndInteger(0,symbols.length)];
}

function  calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;

    if(upperCase.checked){
        hasUpper=true;
    }
    if(lowerCase.checked){
        hasLower=true;
    }
    if(numberCheck.checked){
        hasNum=true;
    }
    if(symbolCheck.checked){
        hasSym=true;
    }
    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength>=8){
        setIndicatorColor("#0f0");
    }else if((hasUpper || hasLower)&& (hasNum || hasSym) && passwordLength>=6){
        setIndicatorColor("#ff0");
   }else{
        setIndicatorColor("#f00");
    }
}

async function copyContent(){  
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="Copied!";
    }catch(e){
        copyMsg.innerText="Error!";
    }
    // to make the message disappear after 2 seconds.
    copyMsg.classList.add("active");
    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);
}
function handleCheckboxChange(){
        checkCount=0;
        allCheckboxes.forEach((checkbox)=>{
                if(checkbox.checked)
                    checkCount++;
        });

        //special case of check box
        if(passwordLength<checkCount){
            passwordLength=checkCount;
            handleSliderChange();
        }

}

allCheckboxes.forEach((checkbox)=>{
    checkbox.addEventListener("change",handleCheckboxChange);
});


inputSlider.addEventListener("input",(e)=>{
        passwordLength=e.target.value;
        handleSliderChange();
});

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent();
    }
});

function shufflepassword(array){
    //fisher yets method
    for (let i = array.length-1; i >0 ; i--) {
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((ele)=>(str+=ele));
        return str;
}
generateBtn.addEventListener("click",()=>{
      if(checkCount<=0) return;
      if (passwordLength<checkCount) {
        passwordLength=checkCount;
        handleSliderChange();
      }

    password="";
    // if(upperCase.checked){
    //     password+=generateUpperCase();
    // }
    // if(lowerCase.checked){
    //     password+=generateLowerCase();
    // }
    // if(symbolCheck.checked){
    //     password+=generateSymbol();
    // }
    // if(numberCheck.checked){
    //     password+=generateRandomNumber();
    // }

    let funArray=[];
    if (upperCase.checked) 
        funArray.push(generateUpperCase);
    if (lowerCase.checked) 
        funArray.push(generateLowerCase);
    if (numberCheck.checked) 
        funArray.push(generateRandomNumber);
    if (symbolCheck.checked) 
        funArray.push(generateSymbol);

    // Compulsory addition

    for (let i = 0; i < funArray.length; i++) {
            password+=funArray[i]();
    }
    
    // Remaining Addition

    for (let i = 0; i < passwordLength-funArray.length; i++) {
        let randomIndex=getRndInteger(0,funArray.length);
        password+=funArray[randomIndex]();
    }


    //shuffle password 
    password=shufflepassword(Array.from(password));

    //shoow in display
    passwordDisplay.value=password;

    // calc strength

    calcStrength();
});

