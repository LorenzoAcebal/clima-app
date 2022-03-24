const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'opt',
        message: 'What do you want to do?',
        choices: [
            {
                value: 1,
                name: `${"1.".green} Search city`
            },
            {
                value: 2,
                name: `${"2.".green} History`
            },
            {
                value: 0,
                name: `${"0.".green} Exit`
            }
        ]
    }
]

const inquirerMenu =  async() => {

    console.clear();
    console.log("======================".green);
    console.log("   Select an option".white);
    console.log("======================\n".green);

    const {opt} = await inquirer.prompt(questions);

    return opt;

}

const pause = async() =>{
    const p =[{
        type: 'input',
        name: 'pause',
        message: `\nPress ${"ENTER".green} to continue\n`
    }]

    console.log('\n')
    await inquirer.prompt(p)
    
}

const readInput = async(message) =>{
    const question =[
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const tasksListToDelete = async(tasks =[]) =>{

    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}.`.green;

        //?Esto es en lo que se transforma cada task
        return{
            value: task.id,
            name: `${idx} ${task.desc}`
        }
    });
    //?Agrega al principio del arreglo un elemento
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Go back'
    })

    const questions =[{
        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices
    }]

    const {id} = await inquirer.prompt(questions)
    return id;

}

const confirmation = async (message) =>{

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);
    return ok;
}

const showCheckList = async(tasks =[]) =>{

    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}.`.green;

        //?Esto es en lo que se transforma cada task
        return{
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: (task.completedIn) ? true : false
        }
    });

    const question =[{
        type: 'checkbox',
        name: 'ids',
        message: 'Selections',
        choices
    }]

    const {ids} = await inquirer.prompt(question)
    return ids;

}


module.exports={
    inquirerMenu,
    pause,
    readInput,
    tasksListToDelete,
    confirmation,
    showCheckList
}