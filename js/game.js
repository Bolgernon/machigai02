let timer = null;
const MAX = 3;
let count = 0;
let flag = 0;
function init() {
  if (timer == null) {
    start = new Date();
    time();
    gameStart();
  }
}
const APPLICATION_KEY = "11f4a02a8e194fc981c6162d3d80b4140b40ccb7ef150dbffc53233e97a3e747";
const CLIENT_KEY = "c2f85148545b5a363992e828493da043378d7294bb9975be10cf7ef470688afd";
const ncmb = new NCMB(APPLICATION_KEY,CLIENT_KEY);
const DBName = "Score";

let Score = ncmb.DataStore(DBName);

function gameStart() {
  let size = 5;
  let qNum = Math.floor(Math.random()*q.length);

    for(let i=0; i<size*size; i++){
      let s = document.createElement("span");
      s.textContent = q[qNum][0];
      s.setAttribute("id","num"+i);
      s.addEventListener("click", function(){
        if(this.textContent == q[qNum][1]){
          //alert("正解");
          correct.play();
          count++;
          while(cells.firstChild){
            cells.removeChild(cells.firstChild);
          }
          gameStart();
          if(count == MAX){
            stop();
            while(cells.firstChild){
              cells.removeChild(cells.firstChild);
            }
            clearTimeout(timer);
          }
        }else{
          wrong.play();
        }
      });
      cells.appendChild(s);
      if(i % size == size - 1){
        const br = document.createElement("br");
        cells.appendChild(br);
      }
    }
    let p = Math.floor(Math.random()*size*size);
    let ans = document.getElementById("num" + p);
    ans.textContent = q[qNum][1];

  }

function stop(){
  //save
  let test = new Score();
  let key = "score";
  let value = (timer - 1);
  test.set(key, value);
  test.save()
  .then(function(){
    console.log("成功");
  })
  .catch(function(err){
    console.log("エラー発生:" + err);
  });
  //load
  Score
  .order("score")
  .fetchAll()
  .then(function(results){
    let listA = [];
    for(let i=0; i<results.length; i++){
      console.log(results[i].score);
      listA.push(results[i].score);
    }
    if(value < listA[0]){
        alert("HightScoreTime:" + value);
      }else{
        alert("ClearTime:" + value);
    }
  })
  .catch(function(err){
    console.log("エラー発生" + err);
  });

}

function time() {
  let now = new Date();
  let eTime = parseInt((now.getTime() - start.getTime())/1000);
  score.textContent = eTime;
  timer = setTimeout("time()", 1000);
}
