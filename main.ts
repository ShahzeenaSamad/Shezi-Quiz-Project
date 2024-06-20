#! /usr/bin/env node
//SHABANG


import inquirer from "inquirer"
import chalk from "chalk"

console.log(chalk.green.underline("=").repeat(60))
console.log(chalk.bold.underline.italic.bgBlueBright.black("\t\t***** QUIZ PROJECT *****"))
console.log(chalk.green.underline("=").repeat(60))

const apiLink : string = "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple"

let fetchData = async (data:string) => {
    let fetchQuiz : any = await fetch (data)
    let res = await fetchQuiz.json()
    return res.results;
}

let data = await fetchData(apiLink);

let startQuiz = async () => {
    let score : number = 0;

    //for user name
    let name = await inquirer.prompt({
        name : "fname",
        type : "input",
        message : chalk.blueBright("\nwhat is your Name?\n")
    })

    for (let i=0; i<5; i++){
        let answers = [...data[i].incorrect_answers,data[i].correct_answer]

        let ans = await inquirer.prompt({
            name : "quiz",
            type : "list",
            message : data[i].question,
            choices : answers.map((val:any) => val),
        })

        if(ans.quiz == data[i].correct_answer) {
            ++score
            console.log(chalk.bold.italic.blueBright("Correct"))
        }else {
        console.log(`Correct answer is ${chalk.bold.red.italic(data[i].correct_answer)}`)
    }
    }

    console.log(`\nDear ${chalk.magentaBright.bold(name.fname)},your score is ${chalk.red.bold(score)} out of ${chalk.red.bold("5")}`)
}  

startQuiz()
