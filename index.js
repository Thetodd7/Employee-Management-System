const inquirer = require('inquirer');
const Choice = require('inquirer/lib/objects/choice');
const db = require('./db/dbQueriers');
start = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Remove Employee', 'View All Roles', 'Add Role', 'Remove Role', 'Quit']
        }
    ]).then(answers => {
        switch (answers.menu) {
            case 'View All Employees':
                console.log('Viewing all employees');
                viewEmployees();
                break;
            case 'Add Employee':
                console.log();
                break;
            case 'Remove Employee':
                console.log();
                break;
            case 'View All Roles':
                console.log();
                break;
            case 'Add Role':
                console.log();
                break;
            case 'Remove Role':
                console.log();
                break;
            case 'Quit':
                process.end();
                break;
            default:
                break;
        }
    })
}
start()
viewEmployees = () => {
    db.findAllEmployees().then((rows) => {
        console.table(rows);
    })
}