const inquirer = require("inquirer");
const db = require("./db/dbQueries");
 
const init = () => {
  console.log("Welcome to the Employee Tracker!");
  menu();
};
menu = () => {
  console.log("\n");
  // The questions that are prompted to the user
  inquirer
    .prompt(menuQs)
    .then((answers) => {
      if (answers.menu == "View All Departments") {
        viewDepartments();
      } else if (answers.menu == "View All Roles") {
        viewRoles();
        menu();
      } else if (answers.menu == "View All Employees") {
        viewEmployees();
      } else if (answers.menu == "Add a Department") {
        inquirer
          .prompt({
            type: "input",
            message:
              "What is the name of the department you would like to add?",
            name: "dept"
          })
          .then((answer) => {
            addDepartment(answer.dept);
          });
      } else if (answers.menu == "Add a Role") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is the name of the role you would like to add?",
              name: "role"
            },
            {
              type: "input",
              message: "What is the salary for this role?",
              name: "salary"
            },
            {
              type: "input",
              message:
                "What is the department id of the role you would like to add?",
              name: "dept",
              default: "1001"
            }
          ])
          .then((answer) => {
            let roleInfo = [answer.role, answer.salary, answer.dept];
            addRole(roleInfo);
          });
          
      } else if (answers.menu == "Add an Employee") {
        inquirer
          .prompt([
            {
              type: "input",
              message:
                "What is the first name of the employee you would like to add?",
              name: "firstName"
            },
            {
              type: "input",
              message:
                "What is the last name of the employee you would like to add?",
              name: "lastName"
            },
            {
              type: "input",
              message: "What is the employee's role id?",
              name: "role"
            },
            {
              type: "input",
              message: "What is the employee's manager's id?",
              name: "manager"
            }
          ])
          .then((answer) => {
            let employeeInfo = [
              answer.firstName,
              answer.lastName,
              answer.role,
              answer.manager
            ];
            addEmployee(employeeInfo);
          });
      } else if (answers.menu == "Update Employee Role") {
        updateEmployee();
      } else if (answers.menu == "Delete an Employee") {
        deleteEmp();
      } else if (answers.menu == "Delete a Department") {
        deleteDept();
      } else if (answers.menu == "Delete a Role") {
        deleteRole();
      } else {
        process.exit();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
// menu prompt questions for inquirer
const menuQs = [
  {
    type: "list",
    name: "menu",
    message: "What would you like to do next?",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update Employee Role",
      "Delete an Employee",
      "Delete a Department",
      "Delete a Role",
      "Exit"
    ]
  }
];

// Runs the program
init();
// The data base function is called to return all employee related data
async function viewEmployees() {
  let employees = await db.findAllEmployees();
  console.log("\n");
  console.table(employees);
  menu();
}
// The data base function is called to return all department data
async function viewDepartments() {
  let departments = await db.findAllDepartments();
  console.log("\n");
  console.table(departments);
  menu();
}
// The data base function is called to return all role related to the data
async function viewRoles() {
  let roles = await db.findAllRoles();
  console.log("\n");
  console.table(roles);
  menu();
}
// The data base function is called in order to add a new department, passing in the data from the user
async function addDepartment(newDept) {
  await db.addNewDepartment(newDept);
}
// the data base function is called in order to add a role, passing in the data from the user
async function addRole(newRole, salary, deptId) {
  await db.addNewRole(newRole, salary, deptId);
}
// the data base function is called in order to add a new employee, passing in the data from the user
async function addEmployee(employeeInfo) {
  await db.addNewEmployee(employeeInfo);
}
// the data base function is called in order to add an update to employee info
async function updateEmployee() {
  let employeeArr = await createEmployeeList();
  // asks the user which employee to update from the list
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee would you like to update?",
        name: "employee",
        choices: employeeArr
      },
      {
        type: "input",
        message: "What is their new role id?",
        name: "role"
      }
    ])
    //Takes the answer and split it into [first, last], Then value can compare against db for updates
    .then((answer) => {
      let empName = answer.employee.split(" ");
      let first_name = empName[0];
      let last_name = empName[1];
      let updateInfo = [answer.role, first_name, last_name];
      writeUpdate(updateInfo);
    });
}
// the data base function is called to write the updated info for the employee
async function writeUpdate(updateInfo) {
  await db.updateRole(updateInfo);
}
// The data base function is called to delete the employee
async function deleteEmp(name) {
  let employeeArr = await createEmployeeList();
  // ask the user which employee to update from the list
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee would you like to delete?",
        name: "employee",
        choices: employeeArr
      }
    ])
    //Takes the answer and split it into [first, last], Then value can compare against db for updates
    .then((answer) => {
      let empName = answer.employee.split(" ");
      let first_name = empName[0];
      let last_name = empName[1];
      let deletedEmp = [first_name, last_name];
      db.deleteEmployee(deletedEmp);
    });
}

// The data base function is called to delete the dept
async function deleteDept() {
  let departments = await createDeptList();
  // Allows the user to delete a dept from the list
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which department would you like to delete?",
        name: "dept",
        choices: departments
      }
    ])
    ///Takes the answer and split it into [first, last], Then value can compare against db for updates
    .then((answer) => {
      db.deleteDepartment(answer.dept);
    });
}
// The data base function is called to delete the role
async function deleteRole() {
  let roles = await createRoleList();
  // Allows the user to delete a dept from the list
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which role would you like to delete?",
        name: "role",
        choices: roles
      }
    ])
    //Takes the answer and split it into [first, last], Then value can compare against db for updates
    .then((answer) => {
      db.deleteRoleDb(answer.role);
    });
}

async function createEmployeeList() {
  //  An array is created for all employees to create an options list for inquirer
  let employeeArr = [];
  // The data base function is called to get the employee names and concat {first last, first last and so on}
  let employees = await db.employeeNames();
  // object are turn into an array by looping over the object and pushing each name to the array,
  Object.keys(employees).forEach(function (key) {
    let row = employees[key];
    employeeArr.push(row.employee_name);
  });
  return employeeArr;
}

async function createDeptList() {
  // object are turn into an array of all employees to create an options list for inquirer
  let deptArr = [];
  // The data base function is called to get the employee names and concat {first last, first last and so on}
  let depts = await db.departmentNames();
  // objects are turn into an array by looping over the object and pushing each name to the array,
  Object.keys(depts).forEach(function (key) {
    let row = depts[key];
    deptArr.push(row.departments);
  });
  return deptArr;
}
async function createRoleList() {
  //  Makes an array for all the employees to create an options list for inquirer
  let roleArr = [];
  // call the data base function to get the employee names and concat {first last, first last and so on}
  let roles = await db.roleNames();
  // object are turn into an array by looping over the object and pushing each name to the array,
  Object.keys(roles).forEach(function (key) {
    let row = roles[key];
    roleArr.push(row.roles);
  });
  return roleArr;
}
