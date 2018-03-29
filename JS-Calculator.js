var clear = false;
var pureNumber = /^-?\d+(\.\d)?\d*/;
var calNumber = "";
var stepArr = [];
//根据冒泡机制，处理整个键盘
var keyboard = document.getElementById("keyboard");
keyboard.addEventListener("click", function(){confirm(event)});

function confirm(event) {
  var cal = "";
  var operate = event.target.innerHTML;
  var screen = document.getElementById("screen");
  //根据operate的取值不同，分情况讨论，先讨论必须只能是纯数字的情况
  if (screen.innerHTML === "Infinity") {
    screen.innerHTML = "0";
  }
  if (operate === "开平方" || operate === "平方" || operate === "倒数" || operate === "n!" || operate === "正/负") {
    //判断是否为纯数字
    if (pureNumber.test(screen.innerHTML))
      //判断纯数字的各种情况
      if ((screen.innerHTML === "0" || screen.innerHTML === "-0") && operate === "n!") {
        screen.innerHTML = "1";
      } else if (/\d/.test(screen.innerHTML[0])) {
        switch (operate) {
          case "开平方": calNumber = Math.sqrt(Number(screen.innerHTML));
            break;
          case "平方": calNumber = Math.pow(Number(screen.innerHTML), 2);
            break;
          case "倒数": calNumber = 1/Number(screen.innerHTML);
            break;
          case "n!": calNumber = fact(Number(screen.innerHTML));
            break;
          case "正/负": calNumber = "-" + screen.innerHTML;
            break;
        }
      } else {
        switch (operate) {
          case "开平方": calNumber = "ERROR";
            break;
          case "平方": calNumber = Math.pow(Number(screen.innerHTML), 2);
            break;
          case "倒数": calNumber = 1/Number(screen.innerHTML);
            break;
          case "n!": calNumber = "-" + fact(-Number(screen.innerHTML));
            break;
          case "正/负": calNumber = -Number(screen.innerHTML);
            break;
        }
      }
  }
  //当第一次输入数字时，将原本屏幕上的0替换成输入的数字，否则就直接添加新的数字
  if (event.target.className === "button number") {
    if (screen.innerHTML === "0") {
      calNumber = operate;
    } else {
      calNumber = screen.innerHTML + operate;
    }
  }
  //当点击AC时，清屏
  if (event.target.id === "clear") {
    calNumber = "0";
  }
  //当点击CE时，撤销上一步操作(该步骤实际未能完成，只能删除屏幕上显示的数字)
  if (event.target.id === "backspace") {
    console.log(stepArr);
    stepArr.pop();
    calNumber = (stepArr.pop() || 0);
  }
  //当输入一般计算符号或.时
  if (/str/.test(event.target.className)) {
    calNumber = screen.innerHTML + operate;
  }
  //当输入等号时，通过eval函数实现计算功能，有缺陷
  if (event.target.id === "equal") {
    calNumber = eval(calNumber);
  }
  //判断计算数字的位数，当总的位数超过屏幕显示上限，就将其转化为指数表示法
  if ((calNumber + "").length > 12){
    calNumber = Number(calNumber).toExponential(6);
  }
  screen.innerHTML = calNumber;
  stepArr.push(calNumber);
}

//计算阶层并返回
function fact(num) {
  var i, newNum = 1;
  for (i = 1; i <= num; i++) {
    newNum = newNum * i; 
  }
  return newNum;
}