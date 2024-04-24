#! /usr/bin/env node
import chalk from "chalk";
import * as readline from "readline";
const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
//Define a class representing a player
class player {
    name;
    health;
    energy;
    constructor(name) {
        this.name = name;
        this.health = 100; //initial health
        this.energy = 100; // initial energy
    }
    //method to get player's name
    getName() {
        return this.name;
    }
    //method to get player's name
    getHealth() {
        return this.health;
    }
    //method to get player's name
    getEnergy() {
        return this.energy;
    }
    //Method to decrease player's health
    decreaseHealth(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            console.log(chalk.red(`${this.name} has been defeated! Game over.`));
            readLine.close();
        }
        else {
            console.log(chalk.magenta(`${this.name} has ${this.health} health remaining.`));
        }
    }
    //Method to decrease player's energy
    decreaseEnergy(amount) {
        this.energy -= amount;
        if (this.energy <= 0) {
            console.log(chalk.blue(`${this.name} has run out of energy! Game over.`));
            readLine.close();
        }
        else {
            console.log(chalk.green(`${this.name} has ${this.energy} energy remaining.`));
        }
    }
}
// Define a class representing a monster
class Monster {
    name;
    health;
    constructor(name) {
        this.name = name;
        this.health = 50; // initialize health
    }
    //Method to get monster's name
    getName() {
        return this.name;
    }
    //Method to get monster's health
    getHealth() {
        return this.health;
    }
    //Method representing a  monster's  attack
    attack(player) {
        const damage = Math.floor(Math.random() * 10) + 1; //Random damage between 1 and 10
        console.log(chalk.yellow(`${this.name} attacks ${player.getName()} for ${damage} damage.`));
        player.decreaseHealth(damage);
    }
}
//Create instance of player and monster
const Player = new player("Hero");
const monster = new Monster("Dragon");
//Simulate a battle
console.log(chalk.red(` A wild ${monster.getName()} appears!`));
function battle() {
    readLine.question("press enter to attack:", () => {
        const playerAttack = Math.floor(Math.random() * 20) + 1; //Random attack between 1 and 20
        const energyConsumption = Math.floor(Math.random() * 10) + 1; //Random energy consumption between 1 and 10
        Player.decreaseEnergy(energyConsumption);
        console.log(`${Player.getName()} attacks ${monster.getName()} for ${playerAttack} damage`);
        monster.attack(Player);
        if (Player.getHealth() > 0 && Player.getEnergy() > 0) {
            console.log(chalk.magenta("=============================="));
            console.log(chalk.gray("Next round:"));
            console.log(chalk.green(`player's health: ${Player.getHealth()}`));
            console.log(chalk.red(`player's energy: ${Player.getEnergy()}`));
            console.log(chalk.yellow(`Monster's Health: ${monster.getHealth()}`));
            console.log("==============================");
            readLine.close();
        }
    });
}
battle();
