/**
 * 
 * 기본적으로 1부터 9까지 서로 다른 수로 이루어진 3자리의 수를 맞추는 게임이다.

같은 수가 같은 자리에 있으면 스트라이크, 다른 자리에 있으면 볼, 같은 수가 전혀 없으면 낫싱이란 힌트를 얻고, 그 힌트를 이용해서 먼저 상대방(컴퓨터)의 수를 맞추면 승리한다.
예) 상대방(컴퓨터)의 수가 425일 때
123을 제시한 경우 : 1스트라이크
456을 제시한 경우 : 1볼 1스트라이크
789를 제시한 경우 : 낫싱
위 숫자 야구 게임에서 상대방의 역할을 컴퓨터가 한다. 컴퓨터는 1에서 9까지 서로 다른 임의의 수 3개를 선택한다. 게임 플레이어는 컴퓨터가 생각하고 있는 서로 다른 3개의 숫자를 입력하고, 컴퓨터는 입력한 숫자에 대한 결과를 출력한다.
이 같은 과정을 반복해 컴퓨터가 선택한 3개의 숫자를 모두 맞히면 게임이 종료된다.
게임을 종료한 후 게임을 다시 시작하거나 완전히 종료할 수 있다.
사용자가 잘못된 값을 입력한 경우 throw문을 사용해 예외를 발생시킨후 애플리케이션은 종료되어야 한다.
 * 
 */

const MissionUtils = require("@woowacourse/mission-utils");

class App {

  constructor(){
    this.result = {}
  }

  getRandomNumbers() {
    this.result = {}
    while (Object.keys(this.result).length < 3) {
      const number = MissionUtils.Random.pickNumberInRange(1, 9);
      this.addRandomNumbersToResult(number)
    }
  }

  addRandomNumbersToResult(number){
    if (!this.result.hasOwnProperty(number)) {
      this.result[number] = Object.keys(this.result).length;
    }
  }

  checkResult(answers) {
    let strike = answers.filter((value, index, arr) => this.isStrike(value, index)).length
    let ball = answers.filter((value, index, arr) => this.isBall(value, index)).length
    return [strike, ball]
  }

  isStrike(target, i){
    return this.result.hasOwnProperty(target) && i == this.result[target]
  }

  isBall(target, i){
    return this.result.hasOwnProperty(target) && i != this.result[target]
  }

  resultToString(strike, ball) {
    let result = ""
    if(ball != 0) result += `${ball}볼`
    if(strike != 0) result += `${strike}스트라이크`
    if(strike ==0 && ball == 0) result += `낫싱`
    return result
  }

  checkAnswer(strike){
    if(strike == 3){
      MissionUtils.Console.print("3개의 숫자를 모두 맞히셨습니다! 게임 종료")
      this.isRestart()
    }else{
      this.startProgress()
    }
  }

  isRestart(){
    MissionUtils.Console.readLine('게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.', (answer) => {
      this.restart(answer)
    })
  }

  restart(answer){
    if(answer == 2) 
      throw Error()
    this.play()
  }

  startProgress(){
    MissionUtils.Console.readLine('숫자를 입력해주세요 : ', (answer) => {

      const answers = answer.split('');

      const [strike, ball] = this.checkResult(answers)

      const result = this.resultToString(strike, ball)

      MissionUtils.Console.print(result)

      this.checkAnswer(strike)

    });
  }

  play() {
    
    this.getRandomNumbers()

    console.log(this.result)

    MissionUtils.Console.print("숫자 야구 게임을 시작합니다.")

    this.startProgress()
  }
}

const app = new App()
app.play()

module.exports = App;
