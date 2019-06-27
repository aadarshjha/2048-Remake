let toEnglish = new Map([
                         ["00", "zeroZero"],["01", "zeroOne"],["02", "zeroTwo"],["03", "zeroThree"],
                         ["10","oneZero"],["11", "oneOne"],["12", "oneTwo"],["13", "oneThree"],
                         ["20", "twoZero"],["21", "twoOne"],["22", "twoTwo"],["23", "twoThree"],
                         ["30", "threeZero"],["31", "threeOne"],["32", "threeTwo"],["33", "threeThree"]
                       ]);

let colors = new Map([
  [2, "inserted2"],[4, "inserted4"],[8, "inserted8"],[16, "inserted16"],[32, "inserted32"],[64, "inserted64"],[128, "inserted128"],[256, "inserted256"],[512, "inserted512"], [1024, "inserted1024"], [2048, "inserted2048"]
]);

//Tile class.
class Tile {
  constructor(num, x, y){

    this.num = num;
    this.x = x;
    this.y = y;
  }
  setNum(num){
    this.num = num;
  }
  setX(x){
    this.x = x;
  }
  setY(y){
    this.y = y;
  }
  getX(){
    return this.x;
  }
  getY(){
    return this.y;
  }
  getNum(){
    return this.num;
  }
}

//organizes animates and tile on the board.
class Board {

  constructor(height, width){
    this.board = [];
    this.height = height;
    this.width = width;
    this.score = 0;
  }

  getScore(){
    return this.score;
  }

  setBoard(){
    if(this.height == this.width && this.width == 4){

      //filling the array.
      for(let i = 0; i < this.height; ++i){

        let fillArray = [];
        for(let j = 0; j < this.width; ++j){
          //undefined indicates an empty tile reigion.
          fillArray.push(new Tile);
        }
        this.board.push(fillArray);
      }
    } else {

      //for now, only supports the initial 4x4 grid.
      throw new Error("error in argument");
    }
  }
  getHeight(){
    return this.height;
  }
  getWidth(){
    return this.width;
  }
  setHeight(height){
    this.height = height;
  }
  setWidth(width){
    this.width = width;
  }
  //only for testing.
  clearBoard(){
    let clearAll = document.querySelectorAll('.main');
    for(let i = 0; i < clearAll.length; ++i){
      clearAll[i].innerHTML = '';
    }
  }
  deleteTileDisplay(tileObject, i, j){

    let x = i;
    let y = j;
    let lookUpString = x + "" + y;
    let div = document.querySelector(`.${toEnglish.get(lookUpString)}`);
    div.innerHTML = ``
  }
  spawnTile(argumentArray){
    //animation and displaying the rand spawned tiles

    for(let i = 0; i < argumentArray.length; ++i){
      this.board[argumentArray[i].getX()][argumentArray[i].getY()] = argumentArray[i];
      let x = argumentArray[i].getX();
      let y = argumentArray[i].getY();
      let lookUpString = x + "" + y;
      let div = document.querySelector(`.${toEnglish.get(lookUpString)}`);
      let num = this.board[x][y].getNum();
      div.innerHTML = `<div class = "text animated zoomIn fastish"> <span>${num}</span></div>`
      let innerText = div.querySelector("span");
      let innerNum = Number(innerText);
      let addList = div.querySelector("div");
      if(num > 2048){
        addList.classList.add("insertedBIG");
      } else {
        addList.classList.add(colors.get(num));
      }

    }
  }
  slide(direction){
    //if(direction == "right"){
    //everything currently on the board must slide if it can
    for(let i = 0; i < this.height; ++i){
      for(let j = 0; j < this.width; ++j){
        if(this.board[i][j].getNum() != undefined){

        }
      }
    }
}
  displayMoveTile(animate, direction){

    this.clearBoard();

      for(let i = 0; i < this.height; ++i){

          for(let j = 0; j < this.width; ++j){

            if(this.board[i][j].getNum() === undefined){

            } else {
                let x = i;
                let y = j;
                let lookUpString = i + "" + j;
                let div = document.querySelector(`.${toEnglish.get(lookUpString)}`);
                let num = this.board[i][j].getNum();

                if(animate){
                  let arr = false;

                  for(let i = 0; i < animate.length; ++i){
                    if(animate[i][0] == x && animate[i][1] == y){
                      arr = true;
                      break;
                    }
                  }
                  if(arr){
                    div.innerHTML = `<div class = " text animated pulse fastish"> <span>${num}</span></div>`;
                  } else {

                      div.innerHTML = `<div class = "text"> <span>${num}</span></div>`;

                    }

                } else {
                  div.innerHTML = `<div class = " text "> <span>${num}</span></div>`;
                }



                let innerText = div.querySelector("span");
                let innerNum = Number(innerText);
                let addList = div.querySelector("div");
                if(num > 2048){
                  addList.classList.add("insertedBIG");
                } else {
                  addList.classList.add(colors.get(num));

                }
            }
          }
        }
  }

  displayBoard(){
    //this.clearBoard();

    for(let i = 0; i < this.height; ++i){
        let temp = "";
        for(let j = 0; j < this.width; ++j){

          if(this.board[i][j].getNum() === undefined){
            temp += "0 ";
          } else {
              temp += this.board[i][j].getNum() + " ";
          }
        }
       }
  }
  isMovable(direction){
      if(direction == "right"){
        for(let i = 0; i < this.height; ++i){
          //grab the array, filter out zeros, put them to the front.
          //if the filtered version of the array looks the same as the oriigal, nothing moved.
          let updatedArray = this.board[i].filter(item => item.getNum() !== undefined);
          while(updatedArray.length != 4){
            updatedArray.unshift(new Tile());
          }
          for(let k = 0; k < this.width; ++k){
            if(updatedArray[k].getNum() !== this.board[i][k].getNum()){

              return true;
            }
          }
        }
      }

      if(direction == "left"){
        //similar alg as above
        for(let i = 0; i < this.height; ++i){
          //grab the array, filter out zeros, put them to the front.
          //if the filtered version of the array looks the same as the oriigal, nothing moved.
          let updatedArray = this.board[i].filter(item => item.getNum() !== undefined);
          while(updatedArray.length != 4){
            updatedArray.push(new Tile());
          }
          for(let k = 0; k < this.width; ++k){
            if(updatedArray[k].getNum() !== this.board[i][k].getNum()){

              return true;
            }
          }
        }
      }

      //u[[p]] and down
      if(direction == "up"){
        for(let j = 0; j < this.width; ++j){
          let collection = [];
          for(let i = 0; i < this.height; ++i){
            collection.push(this.board[i][j]);
          }
          let arr = collection.filter(item => item.getNum() !== undefined);
          while(arr.length != 4){
            arr.push(new Tile());
          }
          //compare the collection that is the column with arr which is filtered collumn
          for(let k = 0; k < collection.length; ++k){
            if(collection[k].getNum() !== arr[k].getNum()){
              return true;
            }
          }
        }
      }

      if(direction == "down"){
        for(let j = 0; j < this.width; ++j){
          let collection = [];
          for(let i = 0; i < this.height; ++i){
            collection.push(this.board[i][j]);
          }
          let arr = collection.filter(item => item.getNum() !== undefined);
          while(arr.length != 4){
            arr.unshift(new Tile());
          }
          //compare the collection that is the column with arr which is filtered collumn
          for(let k = 0; k < collection.length; ++k){
            if(collection[k].getNum() !== arr[k].getNum()){
              return true;
            }
          }
        }
      }
      return false;
  }
  move(direction){


    //this.slide(direction);
    //takes an array of arrays, i, j, distance.
    let animatedArray = [];

    //returns a bool indicating wheter or not anything moved.
    if(direction === "right" || direction === "left"){
      for(let i = 0; i < this.height; ++i){
        let updatedArray = this.board[i].filter(item => item.getNum() !== undefined);

        if(direction === 'right'){
          while(updatedArray.length != 4){
            updatedArray.unshift(new Tile());
          }

          this.board[i] = updatedArray;
        }
        if(direction === 'left'){
          while(updatedArray.length != 4){
            updatedArray.push(new Tile());
          }
          this.board[i] = updatedArray;
        }

      }
    }
    let columnCollection = [];

    if(direction === "down" || direction == "up"){
      //column major ordering.
      for(let j = 0; j < this.width; ++j){
        let collection = [];
        for(let i = 0; i < this.height; ++i){
          collection.push(this.board[i][j]);
        }
        let arr = collection.filter(item => item.getNum() !== undefined);

        if(direction == "down"){
            while(arr.length != 4){
              arr.unshift(new Tile());
            }
        }
        if(direction == "up"){
            while(arr.length != 4){
              arr.push(new Tile());
            }
        }

        //array column updated. need to push into the original 2d array.
        columnCollection.push(arr);
      }
      // columnCollection.forEach(item => console.log(item));
      //updating the initial 2d array
      for(let j = 0; j < this.width; ++j){
        for(let i = 0; i < this.height; ++i){
          this.board[j][i] = columnCollection[i][j];
        }
      }
    }

    this.displayMoveTile();
    this.join(direction, true);

  }

  join(direction, bool){

      let indices = [];

      let joinable = false;
      if(direction == "right"){
        let animate = [];

        for(let i = 0; i < this.height; ++i){
          let newRow = [];
          for(let j = this.width - 1; j >= 0; --j){

            if((j - 1 >= 0) && (this.board[i][j].getNum() != undefined &&
                this.board[i][j].getNum() == this.board[i][j-1].getNum())){

                  if(bool){
                    animate.push([i,j]);
                    let replacement = new Tile((this.board[i][j].getNum() + this.board[i][j].getNum()), i, j);
                    let previous = this.board[i][j-1];
                    this.score += this.board[i][j].getNum() + this.board[i][j].getNum();
                    this.board[i].splice((j-1), 2, replacement);
                    while(this.board[i].length != 4){
                      this.board[i].unshift(new Tile());
                    }

                    } else {

                   return true;
                  }
                }
          }

        }
        if(animate.length != 0){
          this.displayMoveTile(animate, "right");
        }

      }  if(direction == "left"){
        let animate = [];

        for(let i = 0; i < this.height; ++i){
          let newRow = [];
          for(let j = 0; j < this.width; ++j){
              if((j + 1 < this.width) && (this.board[i][j].getNum() != undefined &&
                this.board[i][j].getNum() == this.board[i][j+1].getNum())){

                if(bool){
                  //shift the array.
                  //splice and replace. unshift until normal.
                  animate.push([i,j]);
                  let replacement = new Tile((this.board[i][j].getNum() + this.board[i][j].getNum()), i, j);
                  let previous = this.board[i][j + 1];
                  this.score += this.board[i][j].getNum() + this.board[i][j].getNum();
                  this.board[i].splice(j, 2, replacement);
                  while(this.board[i].length != 4){
                    this.board[i].push(new Tile());
                  }
                } else {
                  return true;
                }
              }
            }

          }
          if(animate.length != 0){
            this.displayMoveTile(animate);
          }

        }
        if(direction == "up"){
          let columnCollection = [];
          let animate = [];
          for(let j = 0; j < this.width; ++j){
              let collection = [];
              for(let i = 0; i < this.height; ++i){

                collection.push(this.board[i][j]);
              }

              for(let k = 0; k < collection.length; k++){
                if((k + 1 < collection.length) && (collection[k].getNum() != undefined) &&
                    collection[k].getNum() == collection[k + 1].getNum()){

                    if(bool){
                      var replacement = new Tile((collection[k].getNum() + collection[k].getNum()), k, j);
                      var previous = collection[k+1];
                      animate.push([k,j]);
                      this.score += collection[k].getNum() + collection[k].getNum();
                      collection.splice(k, 2, replacement);
                      while(collection.length != 4){
                        collection.push(new Tile());
                      }

                    } else {
                      return true;
                    }

                }
              }
              columnCollection.push(collection);
          }
            for(let j = 0; j < this.width; ++j){
              for(let i = 0; i < this.height; ++i){
                this.board[j][i] = columnCollection[i][j];
              }
          }
          if(animate.length != 0){
            this.displayMoveTile(animate);
          }
       }

       if(direction == "down"){
         let animate = [];
          let columnCollection = [];
          for(let j = 0; j < this.width; ++j){
              let collection = [];
              for(let i = 0; i < this.height; ++i){

                collection.push(this.board[i][j]);
              }

              for(let k = collection.length - 1; k >= 0; k--){
                if((k - 1 >= 0) && (collection[k].getNum() != undefined) &&
                    collection[k].getNum() == collection[k - 1].getNum()){

                    if(bool){
                      let replacement = new Tile((collection[k].getNum() + collection[k].getNum()), k, j);
                      let previous = collection[k-1];
                      animate.push([k,j]);
                      collection.splice(k-1, 2, replacement);
                      this.score += previous.getNum() * 2;
                      while(collection.length != 4){
                        collection.unshift(new Tile());
                      }

                    } else {
                      return true;
                    }
                  }
              }
              columnCollection.push(collection);
          }
            for(let j = 0; j < this.width; ++j){
              for(let i = 0; i < this.height; ++i){
                this.board[j][i] = columnCollection[i][j];
              }

        }
        //one column loaded .
        if(animate.length != 0){
          this.displayMoveTile(animate);
        }

       }
       if(!bool){
         return false;
       }
  }
  place(tileObject){

    this.board[tileObject.getX()][tileObject.getY()] = tileObject;
  }
  remove(tileObject){
    //replacing the element with undefined.
    this.board[tileObject.getX()][tileObject.getY()] = new Tile();
  }
  isSpace(){

    //update a count variable for this later one, rather than iterature thorugh the
    //dimensional array.
    for(let i = 0; i < this.width; ++i){
      for(let j = 0; j < this.height; ++j){
        if(this.board[i][j].getNum() === undefined){
          return true;
        }
      }
    }
    return false;
  }
  joinable(){
    return (this.join("right", false) && this.join("left", false) && this.join("up",false) &&
            this.join("down", false));
  }

  isTaken(x, y){
    //takes an incoming tile object and determines if it can be placed on the Board
    if(this.board[x][y].getNum() !== undefined){
      return true;
    } else {
      return false;
    }
  }
  boardFilled(){

    //no space and non-joinable events.
    return (!this.isSpace() && !this.join("right", false) && !this.join("left", false) &&
            !this.join("up", false) && !this.join("down", false));
  }
}

class Game extends Board {
  //the game always starts off with two tiles on the board, of twos.
  constructor(){

    //anonymous board.
    super(4,4);
    this.setBoard();
    this.choiceArray = [2,4];
  }
  start(){
    //generate two random tiles 2-4;
    this.generateRandomTiles(2);
  }
  generateRandomTiles(numTiles){

    let tileCount = 0;
    let tileNum = 0;
    let displayArray = [];

    //generates n number of tiles in a place they havent been.
    while(tileCount != numTiles){
      //90 10 percent change of a 2 to 4; 2's are more often.
      let probability = (Math.floor(Math.random() * 10 + 1));
      if(probability == 10){
        tileNum = 4;
      } else {
        tileNum = 2;
      }
      let tempLocation = this.generateRandomLocation();
      let tempTile = new Tile(tileNum, tempLocation[0], tempLocation[1]);
      this.place(tempTile);
      displayArray.push(tempTile);
      tileCount++;
    }
    //displaying everything
    this.spawnTile(displayArray);
  }
  generateRandomLocation(){
    //generates a random location not yet occupied.
    let location = [];
    let x = 0;
    let y = 0;

    do {
      x = (Math.floor(Math.random() * Math.floor(4)));
      y = (Math.floor(Math.random() * Math.floor(4)));
    } while(this.isTaken(x, y));

    location.push(x);
    location.push(y);

    return location;
  }
}

let game = new Game();
game.start();
game.displayBoard();

function endGame(){
  //cover game area
  alert("Game Over");
}

document.addEventListener("keydown", (e) => {
      console.clear();

      /*special edge case, its movable or its joinable*/
      if(!game.boardFilled()){
        if(e.keyCode == 38){
          //game.clearBoard();

          if(game.isMovable("up") || game.join("up", false)){
              game.move("up");
              processGame();
            //toggle should take a location of every item that comes in its way. that way div is located.
           }
      }
        if(e.keyCode == 39){
          if(game.isMovable("right") || game.join("right", false)){
            //alert(game.isMovable("right"));
            game.move("right");
            processGame();
           }
        }
        if(e.keyCode == 40){
          if(game.isMovable("down") || game.join("down", false)){
            game.move("down");
            processGame();
          }
        }
        if(e.keyCode == 37){
          if(game.isMovable("left") || game.join("left", false)){
            game.move("left");
            processGame();
           }

        }
      } else {
        endGame();
      }

      let score = document.querySelector(".numscore");
      score.innerHTML = game.getScore();
      game.displayBoard();
    }
);

function processGame(){
  game.generateRandomTiles(1);
}
