const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 20;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

const ATTACK_MODE = "ATTACK";
const ATTACK_STRONG_MODE = "STRONG_ATTACK";

const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

let log = [];

function getMaxLife() {
  const enteredValue = prompt(
    "Choose the maximum life for you and the monster",
    "100"
  );
  let parsedValue = parseInt(enteredValue); 

  try{
  if (parsedValue <= 0 || isNaN(parsedValue)) 
    throw "INVALID INPUT";
  }catch(error) {
    console.log(error);
    parsedValue = 100;
    alert("You have entered an invalid input, so 100 is you maximum health..");
  } finally {
    
  }

  return parsedValue;
}

maxLife = getMaxLife();

adjustHealthBars(maxLife);

let count = 0;
let hasBonusLife = true;
let currentMonsterHealth = maxLife;
let currentPlayerHealth = maxLife;

function reset() {
  currentMonsterHealth = maxLife;
  currentPlayerHealth = maxLife;
  resetGame(maxLife);
}

function endGame() {
  const playerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();

    currentPlayerHealth = playerHealth;
    setPlayerHealth(playerHealth);
    alert("You have used a bonus life");
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You Won!!");
    reset();
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("Monster Won!!");
    reset();
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("It's a draw");
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage;
  let event;

  if (mode === ATTACK_MODE) {
    maxDamage = ATTACK_VALUE;
    event = "ATTACK MODE";
  } else if (mode === ATTACK_STRONG_MODE) {
    maxDamage = STRONG_ATTACK_VALUE;
    event = "STRONG ATTACK MODE";
  }

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(event, damage, currentMonsterHealth, currentPlayerHealth);
  endGame();
}

function attackHandler() {
  attackMonster(ATTACK_MODE);
}

function strongAttackHandler() {
  attackMonster(ATTACK_STRONG_MODE);
}

function healPlayerHandler() {
  let healValue;

  count++;
  if (count <= 5) {
    if (currentPlayerHealth >= maxLife - HEAL_VALUE)
      healValue = maxLife - currentPlayerHealth;
    else healValue = HEAL_VALUE;

    currentPlayerHealth += healValue;
    increasePlayerHealth(healValue);
    writeToLog("HEAL", healValue, currentMonsterHealth, currentPlayerHealth);
    endGame();
  }
}

function writeToLog(evt, val, monsterHealth, playerHealth) {
  let logEntry = {
    event: evt,
    value: val,
    monsterHealth: monsterHealth,
    playerHealth: playerHealth,
  };

  if (evt === LOG_EVENT_PLAYER_ATTACK) {
    logEntry.target = "MONSTER";
  } else if (evt === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    logEntry.target = "MONSTER";
  } else if (evt === LOG_EVENT_MONSTER_ATTACK) {
    logEntry.target = "PLAYER";
  } else if (evt === LOG_EVENT_PLAYER_HEAL) {
    logEntry.target = "PLAYER";
  }

  log.push(logEntry);
}

function printLogHandler() {
  // for(let i=0; i<3; i++)  {
  //   console.log("------------------");
  // }
  let i = 0;
  // while (i < 0) {
  //   i++;
  //   console.log(i);
  // } 

  // // for lop
  // for(let i=0; i<log.length; i++)
  //   console.log(log[i]);

  // for of
  for (const logEntry of log) {
    console.log(logEntry);
    // for in
    for (const key in logEntry) {
      console.log(logEntry[key]);
    }
  }
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
