process.env.NODE_ENV = "test";
const app = require("../src/app.js");
const models = require("../src/models/index");
const { QueryTypes, Op } = require("sequelize");
const tasks = models.tasks;
const sequelizeInstance = models.sequelizeInstance;

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("---------------------- Testing Task APIs -------------------------", () => {
	describe("/GET server test response", () => {
		it("it SHOULD return the test message", (done) => {
			chai.request(app)
				.get("/test")
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("message");
					res.body.message.should.equal("Server is running!");
					done();
				});
		});
	});

	describe("/POST task", () => {
		it("it SHOULD NOT POST a task without title field", (done) => {
			let taskPayload = {
				description: "J.R.R. Tolkien",
				created_by: "test@test.com",
			};
			chai.request(app)
				.post("/create_task")
				.send(taskPayload)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a("object");
					res.body.should.have.property("errors");
					res.body.should.have.property("errorMessage");
					res.body.errors.should.be.a("array");
					res.body.errors.should.contain("title is required");
					done();
				});
		});

		it("it SHOULD NOT POST a task with multiple missing fields", (done) => {
			let taskPayload = {};
			chai.request(app)
				.post("/create_task")
				.send(taskPayload)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a("object");
					res.body.should.have.property("errors");
					res.body.should.have.property("errorMessage");
					res.body.errors.should.be.a("array");
					res.body.errors.should.contain("title is required");
					res.body.errors.should.contain("description is required");
					done();
				});
		});

		// create a task
		it("it SHOULD POST a task", (done) => {
			// prettier-ignore
			let taskPayload = {
				title: "Test task",
				description: "J.R.R. Tolkien",
				created_by: "test@test.com"
			};
			chai.request(app)
				.post("/create_task")
				.send(taskPayload)
				.end((err, res) => {
					res.should.have.status(201);
					res.body.should.be.a("object");
					res.body.should.have.property("message");
					res.body.message.should.equal("Task created!");
					done();
				});
		});

		// delete the task
		after(async () => {});
	});
	/*
	 * Test the /GET route
	 */
	describe("/GET all tasks", () => {
		it("it SHOULD GET all the tasks", (done) => {
			chai.request(app)
				.get("/get_all_tasks")
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("data");
					done();
				});
		});
	});

	describe("/GET task by an invalid id", () => {
		it("it SHOULD NOT GET a task with an invalid id", (done) => {
			chai.request(app)
				.get("/get_task/abd")
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.have.property("errorMessage");
					res.body.errorMessage.should.equal("Invalid id provided!");
					done();
				});
		});
	});

	describe("/GET task by id", () => {
		let taskCreated = {};
		// create a task
		before(async () => {
			console.log("Creating a task...");
			const currentDate = new Date().toISOString();
			try {
				taskCreated = await sequelizeInstance.query(
					`INSERT INTO TASKS(ID, TITLE, DESCRIPTION, CREATED_BY, DATE_CREATED, DATE_UPDATED) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
					{
						bind: [
							Math.floor(1000 + Math.random() * 9000),
							"test task title",
							"task.description",
							"test@test.com",
							currentDate,
							currentDate,
						],
						type: QueryTypes.INSERT,
					}
				);
			} catch (err) {
				console.error(err);
			}
		});

		// check for valid id
		it("it SHOULD GET a task with provided id", (done) => {
			console.log("Checking for id validity...");
			chai.request(app)
				.get(`/get_task/${taskCreated[0][0].id}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("message");
					res.body.message.should.equal("Task fetched!");
					res.body.should.have.property("data");
					res.body.data.should.have.property("id");
					res.body.data.id.should.equal(taskCreated[0][0].id);
					done();
				});
		});

		// delete the task
		after(async () => {
			console.log("Cleaning up...");
			try {
				await sequelizeInstance.query(`DELETE FROM TASKS WHERE ID=$1`, {
					bind: [taskCreated[0][0].id],
					type: QueryTypes.DELETE,
				});
			} catch (err) {
				console.error(err);
			}
		});
	});

	describe("/PUT task", () => {
		let taskToBeUpdated = {};

		before(async () => {
			console.log("fetching a task to get id...");
			try {
				taskToBeUpdated = await sequelizeInstance.query(`select * from tasks limit 1;`);
			} catch (err) {
				console.error(err);
			}
		});

		it("it SHOULD NOT modify a task with an invalid id", (done) => {
			chai.request(app)
				.put("/update_task/12ab")
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.have.property("errorMessage");
					res.body.errorMessage.should.equal("Invalid id provided!");
					done();
				});
		});

		it("it should modify a task by its id", (done) => {
			// prettier-ignore
			taskToBeUpdated[0][0]["description"] = taskToBeUpdated[0][0]["description"] + " updated!";
			chai.request(app)
				.put(`/update_task/${taskToBeUpdated[0][0]["id"]}`)
				.send(taskToBeUpdated[0][0])
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a("object");
					res.body.should.have.property("message");
					res.body.message.should.equal("Task updated!");
					done();
				});
		});
	});

	describe("/DELETE task", () => {
		let taskToBeDeleted = {};

		before(async () => {
			console.log("fetching a task to get id...");
			try {
				taskToBeDeleted = await sequelizeInstance.query(`select * from tasks limit 1;`);
			} catch (err) {
				console.error(err);
			}
		});

		it("it SHOULD NOT delete a task with an invalid id", (done) => {
			chai.request(app)
				.delete("/delete_task/1kjha")
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.have.property("errorMessage");
					res.body.errorMessage.should.equal("Invalid id provided!");
					done();
				});
		});

		it("it should delete a task by its id", (done) => {
			// prettier-ignore
			chai.request(app)
				.delete(`/delete_task/${taskToBeDeleted[0][0]["id"]}`)
				.send(taskToBeDeleted[0][0])
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a("object");
					res.body.should.have.property("message");
					res.body.message.should.equal("Task deleted!");
					done();
				});
		});
	});
});
