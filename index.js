const { v4: uuidv4 } = require("uuid");
const prompt = require("prompt-sync")();

const unique_id = uuidv4();

const workers = [];

function addWorker(id, name, position, hourPaid) {
  let worker = {
    id: id,
    name: name,
    position: position,
    hourPaid: hourPaid,
    hoursWorked: [],
  };

  workers.push(worker);
}

function registerHours(id_, numHours) {
  workers.map((worker) => {
    if (worker.id === id_) {
      worker.hoursWorked.push(numHours);
    }
  });
}

function monthSalary(worker) {
  let totalHours = 0;
  worker.hoursWorked.map((hour) => (totalHours += hour));

  return totalHours * worker.hourPaid;
}

function calculateInss(worker) {
  let totalSalary = monthSalary(worker);
  let inss = 0;

  if (totalSalary >= 4000.04) {
    inss = totalSalary * (14 / 100);
  } else if (totalSalary >= 2666.69) {
    inss = totalSalary * (12 / 100);
  } else if (totalSalary >= 1412.01) {
    inss = totalSalary * (9 / 100);
  } else {
    inss = totalSalary * (7.5 / 100);
  }

  if (inss > 908.85) {
    inss = 908.85;
  }

  return inss;
}

function labourReport() {
  console.log("\n------- REPORT OF WORKER ------- \n");

  workers.map((worker) => {
    let totalHours = 0;
    worker.hoursWorked.map((hour) => {
      totalHours += hour;
    });

    let totalSalary = monthSalary(worker);
    let inss = calculateInss(worker);

    console.log(`ID: ${worker.id}`);
    console.log(`Name: ${worker.name}`);
    console.log(`Position: ${worker.position}`);
    console.log(`Total hours worked: ${totalHours}`);
    console.log(`Total INSS: R$${inss.toFixed(2)}`);
    console.log(`Gross salary: ${totalSalary.toFixed(2)}`);
    console.log(`Net alary : ${(totalSalary - inss).toFixed(2)}`);
    console.log("------------- \n");
  });
}

function managementReport() {
  function menu() {
    console.log("--- Payroll System ---\n");
    console.log("1 - Add worker");
    console.log("2 - Register worked hours");
    console.log("3 - Show payroll report");
    console.log("4 - Exit");
  }

  let option;

  do {
    menu();
    option = Number(prompt("Which option would you like ? "));

    switch (option) {
      case 1:
        let id = unique_id;
        let name = prompt("What's your name: ");
        let position = prompt("What's your position: ");
        let hourPaid = Number(prompt("What your hour paid: "));

        addWorker(id, name, position, hourPaid);
        break;

      case 2:
        let id_ = unique_id;
        let numHours = Number(prompt("How many hours did you work: "));

        registerHours(id_, numHours);
        break;

      case 3:
        labourReport();
        break;

      default:
        console.log("Invalid option.");
    }
  } while (option != 4);
}

managementReport();
