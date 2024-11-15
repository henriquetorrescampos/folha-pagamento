const { v4: uuidv4 } = require("uuid");
const prompt = require("prompt-sync");

const unique_id = uuidv4();

const workers = [];

function addWorker(id, name, position, hourPaid) {
  let worker = {
    id: unique_id,
    name: name,
    position: position,
    hourPaid: hourPaid,
    hoursWorked: [],
  };

  workers.push(worker);
}

function registerHours(id, numHours) {
  workers.map((worker) => {
    if (worker.id === id) {
      worker.hoursWorked.push(numHours);
    }
  });
}

function monthSalary(worker) {
  let totalHours = 0;
  worker.hoursWorked.map((hour) => (totalHours += hour));

  return totalHours * worker.hourPaid;
}

function inss(worker) {
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
